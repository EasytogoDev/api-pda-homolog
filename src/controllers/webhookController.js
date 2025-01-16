const {
  Temp1601RetornoWms,
  Temp1602RetornoItensWms,
  Producao,
  LogItemOrdemProducao,
  Temp1602LoteItensWms,
  Temp1202NFItensWms
} = require("../models");
const { sqlServerSequelize, sqlServerKnex } = require("../config/sqlserver");
const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");

exports.getUserByToken = async (req) => {
  const token = req.headers["authorization"];
  const newToken = token.replace("Bearer ", "");
  const decoded = jwt.decode(newToken);
  const usuario = decoded.codigo;

  return usuario;
};

exports.webhookVendas = async (req, res) => {
  try {
    const { proposta, statuswms, usuario, itens } = req.body;

    console.log("-----WEBHOOK VENDAS");
    console.log(req.body);

    // Criar entrada na tabela Temp1601RetornoWms
    const createRetornoProposta = await Temp1601RetornoWms.create({
      codigoPROPOSTA: proposta,
      wmsPROPOSTA: statuswms,
      usuarioPROPOSTA: usuario,
    });

    console.log({ createRetornoProposta });

    if (!createRetornoProposta) {
      return res.status(500).json({ erro: "Erro ao criar a proposta." });
    }

    // Processar os itens da proposta
    for (const item of itens) {
      const { codigoItem, produtoItem, statusItem, lotes } = item;

      // Calcular a soma de quantidade dos lotes
      const totalQuantidadeLotes = lotes.reduce(
        (sum, lote) => sum + lote.quantidadeItem,
        0
      );

      // Criar entrada na tabela Temp1602RetornoItensWms
      const createRetornoItem = await Temp1602RetornoItensWms.create({
        codigoITEMPROPOSTA: codigoItem,
        produtoITEMPROPOSTA: produtoItem,
        propostaITEMPROPOSTA: proposta,
        quantidadeITEMPROPOSTA: totalQuantidadeLotes, // Soma dos lotes
        statusITEMPROPOSTA: statusItem,
        locacaoITEMPROPOSTA: "BR",
      });

      console.log(createRetornoItem);

      if (!createRetornoItem) {
        return res
          .status(500)
          .json({ erro: "Erro ao criar os itens da proposta." });
      }

      // Processar e inserir os lotes na tabela Temp1602LoteItensWms
      for (const lote of lotes) {
        const { lote: nomeLote, quantidadeItem: quantidadeLote } = lote;

        const createLoteItem = await Temp1602LoteItensWms.create({
          loteLOTEITEM: nomeLote,
          produtoLOTEITEM: codigoItem,
          quantidadeLOTEITEM: quantidadeLote,
        });

        console.log(createLoteItem);

        if (!createLoteItem) {
          return res.status(500).json({
            erro: "Erro ao criar os lotes dos itens da proposta.",
          });
        }
      }
    }

    // Executar procedure no banco de dados
    const execProcedure = await sqlServerSequelize.query(
      "EXEC spr1601_Retorno_Wms @PROPOSTA = :proposta, @USUARIO = :usuario",
      {
        replacements: { proposta, usuario },
        type: QueryTypes.SELECT,
        raw: true,
      }
    );

    console.log("Procedure: ", execProcedure);

    return res.status(201).json({ ok: "OK" });
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ "Erro no webhook:": error.message });
  }
};

exports.webhookCompras = async (req, res) => {
  try {
    const { wms, chavenf, itens } = req.body;

    console.log("-----WEBHOOK COMPRAS");
    console.log(req.body);

    for (const item of itens) {
      const {
        item: itemNFITEM,
        numeroItem: numeroitemNFITEM,
        sku: skuNFITEM,
        quantidade: quantidadeNFITEM,
      } = item;

      // Inserir dados na tabela temp1202_NF_Itens_Wms
      const createItem = await Temp1202NFItensWms.create({
        chaveNFITEM: chavenf,
        itemNFITEM,
        quantidadeNFITEM,
        numeroitemNFITEM,
        skuNFITEM,
      });

      console.log("Item criado:", createItem);

      if (!createItem) {
        return res
          .status(500)
          .json({ erro: "Erro ao inserir item na tabela." });
      }
    }

    // Verificar status e retornar mensagem correspondente
    if (wms === 2) {
      return res.status(201).json({ message: "Compra encerrada está ok!" });
    } else if (wms === 3) {
      return res.status(201).json({ message: "Compra com divergência!" });
    } else {
      return res.status(400).json({ erro: "Status WMS inválido." });
    }
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ "Erro no webhook:": error.message });
  }
};

/*
{
  "chaveNF": "35160608100049000128550010000007011030014867",
  "wms": 2, 
  "itens": [
    {
      "item": 211311564,
      "Numeroitem": 211311564,
      "sku": "7809 R",
      "quantidade": 10,
      "wms": 0
    }
  ]
}
*/

exports.webhookOP = async (req, res) => {
  try {
    const { op, quantidadeColetada, wms } = req.body;

    const usuario = await this.getUserByToken(req);

    const quantidadeFinal = await Producao.findOne({
      attributes: ["quantidadePRODUCAO"],
      where: { codigoPRODUCAO: op },
    });

    const quantidadeRestante =
      parseFloat(quantidadeFinal.quantidadePRODUCAO) -
      parseFloat(quantidadeColetada);

    if (wms === 2) {
      try {
        const encerrarOP = await sqlServerSequelize.query(
          "EXEC sps1301_EncerrarProducao_wms @OP = :op, @CustoProducao = 0, @QuantidadeFinalOP = :quantidadeColetada, @Resultado = '' ",
          {
            replacements: { op, quantidadeColetada },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      const updatedRows = await Producao.update(
        { wmsPRODUCAO: wms, statusPRODUCAO: 3 },
        { where: { codigoPRODUCAO: op } }
      );

      return res
        .status(201)
        .json({ updatedRows, message: "OP encerrada com sucesso!" });
    }

    if (wms === 3) {
      try {
        const quebrarOP = await sqlServerSequelize.query(
          "EXEC sps1301_QuebrarOP_wms @lngOP = :op, @numPRF = :quantidadeRestante, @Usuario = :usuario",
          {
            replacements: { op, quantidadeRestante, usuario },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      try {
        const encerrarOP = await sqlServerSequelize.query(
          "EXEC sps1301_EncerrarProducao_wms @OP = :op, @CustoProducao = 0, @QuantidadeFinalOP = :quantidadeColetada, @Resultado = '' ",
          {
            replacements: { op, quantidadeColetada },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      try {
        const updatedRows = await Producao.update(
          {
            wmsPRODUCAO: wms,
            statusPRODUCAO: 3,
          },
          { where: { codigoProducao: op } }
        );
        return res.status(201).json(updatedRows);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }

      //temos que criar uma op e mover a op criada para uma pasta  4592
    }

    if (wms === 4) {
      //4 Recusada || Vamos criar uma pasta 4593 de RECUSADAS move essa op pra pasta e não faz nada

      try {
        const criarHistorico = await LogItemOrdemProducao.create({
          codigoLOGITEMOP: op,
          sistemaLOGITEMOP: 1,
          itemLOGITEMOP: op,
          dataLOGITEMOP: Date(now()),
          logLOGITEMOP: "Inclusão de registro",
          usuarioLOGITEMOP: usuario,
          entidadeLOGITEMOP: 1301,
        });
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
      try {
        const updatedRows = await Producao.update(
          {
            wmsPRODUCAO: wms,
            pastaPRODUCAO: 4593,
          },
          { where: { codigoProducao: op } }
        );
        return res.status(201).json(updatedRows);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    }
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ "Erro no webhook:": error.message });
  }
};
