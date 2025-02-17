const {
  Temp1601RetornoWms,
  Temp1602RetornoItensWms,
  Producao,
  LogItemOrdemProducao,
  Temp1602LoteItensWms,
  Temp1202NFItensWms,
  Historico1604,
  Propostas,
} = require("../models");
const { sqlServerSequelize, sqlServerKnex } = require("../config/sqlserver");
const { QueryTypes, where } = require("sequelize");
const jwt = require("jsonwebtoken");
const { now } = require("sequelize/lib/utils");
const moment = require("moment");

exports.getUserByToken = async (req) => {
  const token = req.headers["authorization"];
  const newToken = token.replace("Bearer ", "");
  const decoded = jwt.decode(newToken);
  const usuario = decoded.codigo;

  return usuario;
};

async function criarHistorico(proposta, descricao) {
  await Historico1604.create({
    documentoHISTORICO: proposta,
    entidadeHISTORICO: 1601,
    dataHISTORICO: moment().format("YYYY-MM-DD HH:mm:ss"), // Formato compatível com SQL Server
    usuarioHISTORICO: 428,
    descricaoHISTORICO: descricao,
    sistemaHISTORICO: 1,
  });
}

exports.webhookVendas = async (req, res) => {
  try {
    const {
      proposta,
      statuswms,
      usuario,
      itens,
      Volumes,
      PesoTotalPedido,
      quantidadeTotalSKU,
      quantidadeTotalItens,
    } = req.body;

    console.log("-----WEBHOOK VENDAS");
    console.log(req.body);

    if (statuswms == 5) {
      const statusAtualizado = await Propostas.update(
        { prop8PROPOSTA: statuswms },
        { where: { codigoPROPOSTA: proposta } }
      );
      return res.send({
        mensagem: "Proposta recebida e atualizada com o status 5",
        statusAtualizado,
      });
    }

    const createRetornoProposta = await Temp1601RetornoWms.create({
      codigoPROPOSTA: proposta,
      wmsPROPOSTA: statuswms,
      usuarioPROPOSTA: usuario,
      pesoPROPOSTA: PesoTotalPedido,
      volumePROPOSTA: Volumes,
    });

    if (!createRetornoProposta) {
      return res.status(500).json({ erro: "Erro ao criar a proposta." });
    }

    var totalItens = 0;

    for (const item of itens) {
      const { produtoItem, statusItem, lotes, codigoItem } = item;

      for (const lote of lotes) {
        const { lote: nomeLote, quantidadeItem: quantidadeLote } = lote;

        const totalQuantidadeLotes = lotes.reduce(
          (sum, lote) => sum + lote.quantidadeItem,
          0
        );

        totalItens += totalQuantidadeLotes;
        //TIRAR AUTO INCREMENT DA TA  BELA DE TEMP ITENS
        const createRetornoItem = await Temp1602RetornoItensWms.create({
          codigoITEMPROPOSTA: codigoItem,
          produtoITEMPROPOSTA: produtoItem,
          propostaITEMPROPOSTA: proposta,
          quantidadeITEMPROPOSTA: totalQuantidadeLotes, // Soma dos lotes
          statusITEMPROPOSTA: statusItem,
          locacaoITEMPROPOSTA: "BR",
          loteITEMPROPOSTA: nomeLote,
          nomeloteITEMPROPOSTA: nomeLote,
        });

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

    // if (quantidadeTotalSKU != itens.length) {
    //   await criarHistorico(proposta, "Quantidade total de SKU divergentes");
    //   return res
    //     .status(201)
    //     .json({ ok: "Proposta recebida com divergencia na quantidade de SKU" });
    // } else if (totalItens != quantidadeTotalItens) {
    //   await criarHistorico(proposta, "Quantidade total de itens divergentes.");
    //   return res.status(201).json({
    //     ok: "Proposta recebida com divergencia na quantidade total de itens",
    //   });
    // } else {
    //   return res.status(201).json({ ok: "Proposta recebida sem divergências" });
    // }

    return res.status(201).json({ ok: "Proposta recebida e processada!" });
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

const verificaOPFoiEncerrada = async (op) => {
  const buscaProducao = await Producao.findOne({
    where: {
      codigoPRODUCAO: op,
    },
  });

  const statusProducao = buscaProducao.dataValues.statusPRODUCAO;

  if (statusProducao == 3) {
    return true;
  } else {
    return false;
  }
};

exports.webhookOP = async (req, res) => {
  try {
    const { op, quantidadeColetada, wms } = req.body;
    console.log(op, quantidadeColetada, wms)

    const usuario = await this.getUserByToken(req);

    const quantidadeFinal = await Producao.findOne({
      attributes: ["quantidadePRODUCAO"],
      where: { codigoPRODUCAO: op },
    });

    const quantidadeRestante =
      parseFloat(quantidadeFinal.quantidadePRODUCAO) -
      parseFloat(quantidadeColetada);

    const data = new Date();

    // Adiciona 10 anos
    data.setFullYear(data.getFullYear() + 10);

    // Define hora, minuto, segundo e milissegundos específicos
    data.setHours(0, 1, 0, 0);

    // Formata a data no formato desejado: 'YYYY-MM-DD HH:MM:SS.SSS'
    const formatData =
      data.getFullYear() +
      "-" +
      String(data.getMonth() + 1).padStart(2, "0") +
      "-" +
      String(data.getDate()).padStart(2, "0") +
      " " +
      String(data.getHours()).padStart(2, "0") +
      ":" +
      String(data.getMinutes()).padStart(2, "0") +
      ":" +
      String(data.getSeconds()).padStart(2, "0") +
      "." +
      String(data.getMilliseconds()).padStart(3, "0");

    if (wms === 2) {
      try {
        const encerrarOP = await sqlServerSequelize.query(
          `EXEC sps1301_EncerrarProducao_wms @OP = :op, 
                                              @Usuario = 428, 
                                              @IdentificacaoLoteOP = 'LT-${op}', 
                                              @CertificadoLoteOP = "CQ-${op}", 
                                              @ValidadeLoteOP= :formatData, 
                                              @CustoProducao = 10, 
                                              @QuantidadeFinalOP = :quantidadeColetada, 
                                              @Resultado = '' `,
          {
            replacements: { op, formatData, quantidadeColetada },
            type: QueryTypes.SELECT,
            raw: true,
          }
        );

        const statusProducao = await verificaOPFoiEncerrada(op);

        if (statusProducao) {
          return res.status(200).json({ message: "OP encerrada com sucesso!" });
        } else {
          return res.status(403).json({ message: "A OP não foi encerrada" });
        }
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
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
          `EXEC sps1301_EncerrarProducao_wms  @OP = :op, 
                                              @Usuario = 428, 
                                              @IdentificacaoLoteOP = 'LT-${op}', 
                                              @CertificadoLoteOP = "CQ-${op}", 
                                              @ValidadeLoteOP= :formatData, 
                                              @CustoProducao = 10, 
                                              @QuantidadeFinalOP = :quantidadeColetada, 
                                              @Resultado = '' `,
          {
            replacements: { op, formatData, quantidadeColetada },
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
        return res.status(200).json(updatedRows);
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
            pastaPRODUCAO: 4675,
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



exports.webhookSEPARACAO = async (req, res) => {
  try {
    const { op, wms } = req.body;
    console.log(op, wms)

    const usuario = await this.getUserByToken(req);

    
      try {
        const updatedRows = await Producao.update(
          {
            wmsPRODUCAO: wms,
            pastaPRODUCAO: 2976,
          },
          { where: { codigoProducao: op } }
        );
        return res.status(201).json(updatedRows);
      } catch (error) {
        console.log(error);
        return res.status(500).send(error);
      }
    
  } catch (error) {
    console.error("Erro no webhook:", error);
    return res.status(500).json({ "Erro no webhook:": error.message });
  }
};

exports.webhookDivergencia = async (req, res) => {
  const { proposta, quantidadeSKUDivergente, quantidadeItensDivergente } =
    req.body;
  try {
    const body = {
      proposta,
      quantidadeSKUDivergente,
      quantidadeItensDivergente,
    };

    const resposta = body;

    return res.send(resposta);
  } catch (error) {
    return res.status(500).send(error);
  }
};
