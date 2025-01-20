const {
  Temp1601RetornoWms,
  Temp1602RetornoItensWms,
  Producao,
  LogItemOrdemProducao,
  Temp1602LoteItensWms,
  Temp1202NFItensWms,
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
    const { proposta, statuswms, usuario, itens, Volumes, PesoTotalPedido } = req.body;

    console.log("-----WEBHOOK VENDAS");
    console.log(req.body);

    const createRetornoProposta = await Temp1601RetornoWms.create({
      codigoPROPOSTA: proposta,
      wmsPROPOSTA: statuswms,
      usuarioPROPOSTA: usuario,
      pesoPROPOSTA: PesoTotalPedido,
      volumePROPOSTA: Volumes,
    });

    console.log({ createRetornoProposta });

    if (!createRetornoProposta) {
      return res.status(500).json({ erro: "Erro ao criar a proposta." });
    }

    for (const item of itens) {
      const { produtoItem, statusItem, lotes } = item;

      for (const lote of lotes) {
        const { lote: nomeLote, quantidadeItem: quantidadeLote } = lote;

        const totalQuantidadeLotes = lotes.reduce(
          (sum, lote) => sum + lote.quantidadeItem,
          0
        );

        const createRetornoItem = await Temp1602RetornoItensWms.create({
          produtoITEMPROPOSTA: produtoItem,
          propostaITEMPROPOSTA: proposta,
          quantidadeITEMPROPOSTA: totalQuantidadeLotes, // Soma dos lotes
          statusITEMPROPOSTA: statusItem,
          locacaoITEMPROPOSTA: "BR",
          loteITEMPROPOSTA: nomeLote,
          nomeloteITEMPROPOSTA: nomeLote,
        });

        console.log(createRetornoItem);

        if (!createRetornoItem) {
          return res
            .status(500)
            .json({ erro: "Erro ao criar os itens da proposta." });
        }

        const createLoteItem = await Temp1602LoteItensWms.create({
          loteLOTEITEM: nomeLote,
          produtoLOTEITEM: produtoItem,
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

exports.webhookOP = async (req, res) => {
  try {
    const { op, quantidadeColetada, wms, volume, peso } = req.body;

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
    }

    if (wms === 4) {
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
