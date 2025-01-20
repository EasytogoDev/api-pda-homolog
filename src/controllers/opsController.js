const { sqlServerKnex } = require("../config/sqlserver");

const getProducaoData = async (req, res) => {
  try {
    const { limit = 10, offset = 0, status, wms } = req.query;

    const baseQuery = `
      SELECT 
        tb1301.codigoPRODUCAO AS OP,
        tb0501.partnumberPRODUTO AS SKU,
        tb1301.observacaoPRODUCAO AS Observacao,
        tb1301.quantidadePRODUCAO AS Quantidade, 
        tb1301.quantidadefinalPRODUCAO AS QuantidadeFinal,
        tb1301.datacriacaoPRODUCAO AS DataCriacao,
        tb1301.inicioproducaoPRODUCAO AS DataInicio,
        tb1301.fimproducaoPRODUCAO AS DataFinal,
        tb1301.statusPRODUCAO AS Status, -- (1 = Gerada, 2 = Produzindo, 3 = Encerrada),
        tb1301.wmsPRODUCAO AS WMS
      FROM tb1301_Producao tb1301
      INNER JOIN tb0501_Produtos tb0501 ON tb0501.codigoPRODUTO = tb1301.produtoPRODUCAO
      WHERE tb1301.lixeiraPRODUCAO = 0
    `;

    // Adicionar filtros condicionalmente
    let query = baseQuery;
    const queryParams = [];

    if (status) {
      query += ` AND tb1301.statusPRODUCAO = ?`;
      queryParams.push(Number(status));
    }

    if (wms) {
      query += ` AND tb1301.wmsPRODUCAO = ?`;
      queryParams.push(Number(wms));
    }

    query += ` ORDER BY tb1301.codigoPRODUCAO DESC OFFSET ? ROWS FETCH NEXT ? ROWS ONLY;`;
    queryParams.push(Number(offset), Number(limit));

    const result = await sqlServerKnex.raw(query, queryParams);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Erro ao buscar dados de produção:", error);
    return res.status(500).send(error);
  }
};

const alterarStatusWMSPara1 = async (req, res) => {
  const { codigo } = req.params;

  try {
    const busca = `
      SELECT wmsPRODUCAO
      FROM tb1301_Producao 
      WHERE codigoPRODUCAO = ?
    `;

    const resultadoBusca = await sqlServerKnex.raw(busca, [codigo]);

    const status = resultadoBusca[0]?.wmsPRODUCAO;

    if (status === 0 || status === null) {
      const update = `
        UPDATE tb1301_Producao 
        SET wmsPRODUCAO = 1
        WHERE codigoPRODUCAO = ?
      `;

      const resultadoUpdate = await sqlServerKnex.raw(update, [codigo]);
      return res.send({ status: true, resultadoUpdate });
    } else if (status === 2) {
      return res.send({
        status: false,
        mensagem: `OP ${codigo} processado no estoque!`,
      });
    } else if (status === 3) {
      return res.send({
        status: false,
        mensagem: `A OP ${codigo} está com divergência.`,
      });
    } else if (status === 4) {
      return res.send({
        status: false,
        mensagem: `A OP ${codigo} já está finalizada.`,
      });
    } else {
      return res.send({
        status: false,
        mensagem: `Status desconhecido para a OP ${codigo}.`,
      });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
};


module.exports = { getProducaoData, alterarStatusWMSPara1 };
