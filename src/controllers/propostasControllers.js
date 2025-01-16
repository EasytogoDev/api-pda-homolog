const { sqlServerKnex } = require("../config/sqlserver");
const { sqlServerSequelize, Vendedores, Propostas } = require("../models");
const jwt = require("jsonwebtoken");

async function userIsSeller(req) {
  const token = req.headers["authorization"];
  const newToken = token.replace("Bearer ", "");
  const decoded = jwt.decode(newToken);
  const usuario = decoded.codigo;

  const codigoVendedor = await Vendedores.findOne({
    where: {
      usuarioassociadoVENDEDOR: usuario,
    },
  });

  return codigoVendedor.codigoVENDEDOR;
}

exports.getPropostas = async (req, res) => {
  try {
    const usuario = req.user.codigo; // Pega o código do usuário do JWT token

    if (!usuario) {
      return res.status(400).send({ error: "Usuário não definido no token" });
    }

    const wms = req.params.wms;

    let andClause;

    if (wms) {
      andClause = `AND prop8PROPOSTA = ${wms}`;
    } else {
      andClause = "";
    }

    const vendedorAssociado = await Vendedores.findOne({
      where: {
        usuarioassociadoVENDEDOR: usuario,
      },
      attributes: ["codigoVENDEDOR"],
    });

    let whereClause;

    if (vendedorAssociado && vendedorAssociado.codigoVENDEDOR) {
      whereClause = `WHERE vendedorCARTEIRA = ${vendedorAssociado.codigoVENDEDOR} AND lixeiraPROPOSTA = 0 ${andClause}`;
    } else {
      whereClause = `WHERE lixeiraPROPOSTA = 0 ${andClause}`;
    }

    const propostas = await sqlServerSequelize.query(
      `
      SELECT TOP 50
        numeroPROPOSTA, 
        razaoEMPRESA, 
        datacriacaoPROPOSTA,
        statusPROPOSTA,
        liquidoPROPOSTA,
        ipiPROPOSTA,
        brutoPROPOSTA,
        pesoliquidoPROPOSTA
      FROM tb1601_Propostas
      INNER JOIN tb0301_Empresas ON codigoEMPRESA = clientePROPOSTA
      LEFT JOIN tb1616_Carteiras ON codigoEMPRESA = empresaCARTEIRA
      ${whereClause} 
      ORDER BY codigoPROPOSTA DESC
      `,
      {
        type: sqlServerSequelize.QueryTypes.SELECT,
      }
    );

    return res.status(200).json(propostas);
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: error.message });
  }
};

// Criar uma nova proposta
exports.create = async (req, res) => {
  try {
    const proposta = await Propostas.create(req.body);
    res.status(201).json({
      status: true,
      message: "Proposta criada com sucesso!",
      proposta,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao criar a proposta",
      error: error.message,
    });
  }
};

// Buscar todas as propostas
exports.findAll = async (req, res) => {
  const { wms, limit, offset } = req.query; // Obtendo os parâmetros de consulta

  try {
    const propostas = await Propostas.findAll({
      where: wms ? { wms: wms } : {},
      limit: limit ? parseInt(limit, 10) : undefined, // Limitando o número de registros
      offset: offset ? parseInt(offset, 10) : undefined, // Definindo o ponto de partida
    });

    const propostasAjustadas = propostas.map((proposta) => {
      const novaProposta = {};
      Object.keys(proposta.dataValues).forEach((key) => {
        const chaveAjustada = key.replace("PROPOSTA", "");
        novaProposta[chaveAjustada] = proposta[key];
      });

      novaProposta.wms = novaProposta.prop8;
      delete novaProposta.prop8;

      return novaProposta;
    });

    res.status(200).json({ status: true, propostas: propostasAjustadas });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao buscar propostas",
      error: error.message,
    });
  }
};


// Buscar uma proposta por ID
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const proposta = await Propostas.findByPk(id);
    if (!proposta) {
      return res
        .status(404)
        .json({ status: false, message: "Proposta não encontrada" });
    }
    res.status(200).json({ status: true, proposta });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao buscar a proposta",
      error: error.message,
    });
  }
};

// Atualizar uma proposta por ID
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const proposta = await Propostas.findByPk(id);
    if (!proposta) {
      return res
        .status(404)
        .json({ status: false, message: "Proposta não encontrada" });
    }

    await Propostas.update(req.body);
    res.status(200).json({
      status: true,
      message: "Proposta atualizada com sucesso",
      proposta,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao atualizar a proposta",
      error: error.message,
    });
  }
};

// Deletar uma proposta por ID
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const proposta = await Propostas.findByPk(id);
    if (!proposta) {
      return res
        .status(404)
        .json({ status: false, message: "Proposta não encontrada" });
    }

    await proposta.destroy();
    res
      .status(200)
      .json({ status: true, message: "Proposta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao deletar a proposta",
      error: error.message,
    });
  }
};

exports.getPropostasGrouped = async (req, res, next) => {
  try {
    const usuario = await userIsSeller(req);

    const propostas = await sqlServerKnex("tb1601_Propostas")
      .select(
        sqlServerKnex.raw(`
        (CASE
          WHEN MIN(propostavinculoPROPOSTA) IS NULL THEN MIN(codigoPROPOSTA)
          ELSE MIN(propostavinculoPROPOSTA)
        END) AS codigoPROPOSTA
      `),
        "statusPROPOSTA",
        sqlServerKnex.raw("SUM(liquidoPROPOSTA) AS liquido"),
        sqlServerKnex.raw("SUM(ipiPROPOSTA) AS ipi"),
        sqlServerKnex.raw("SUM(icmsstPROPOSTA) AS icmsst"),
        sqlServerKnex.raw("SUM(brutoPROPOSTA) AS bruto"),
        sqlServerKnex.raw("MIN(datacriacaoPROPOSTA) AS datacriacao"),
        "tb0703_Cidades.nomeCIDADE AS cidadeEMPRESA",
        "tb0302_Enderecos.estadoENDERECO AS estadoEMPRESA"
      )
      .innerJoin("tb0302_Enderecos", function () {
        this.on(
          "tb1601_Propostas.clientePROPOSTA",
          "=",
          "tb0302_Enderecos.empresaENDERECO"
        )
          .andOn("tb0302_Enderecos.padraoENDERECO", "=", sqlServerKnex.raw("1"))
          .andOn("tb0302_Enderecos.tipoENDERECO", "=", sqlServerKnex.raw("4"));
      })
      .innerJoin(
        "tb0703_Cidades",
        "tb0302_Enderecos.cidadeENDERECO",
        "tb0703_Cidades.codigoCIDADE"
      )
      .groupBy(
        "statusPROPOSTA",
        "propostavinculoPROPOSTA",
        "tb0703_Cidades.nomeCIDADE",
        "tb0302_Enderecos.estadoENDERECO"
      );
    // .where({ vendedorPROPOSTA: usuario });

    return res.status(200).json(propostas);
  } catch (error) {
    return res.status(500).send({ error });
  }
};
