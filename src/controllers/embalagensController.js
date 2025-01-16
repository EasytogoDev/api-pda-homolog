const { sqlServerKnex, sqlServerKnexSP } = require("../config/sqlserver");

exports.buscarEmbalagem = async (req, res) => {
  const { codigo } = req.params;

  try {
    const query = `

        SELECT codigoPRODUCAO, codigoPRODUTO, partnumberPRODUTO, codigobarrasEMBALAGEMPRODUTO, quantidadeEMBALAGEMPRODUTO, ean13PRODUTO, nomeEMBALAGEM 
        FROM tb1301_Producao
        INNER JOIN tb0501_Produtos ON codigoPRODUTO = produtoPRODUCAO
        INNER JOIN tb0504_Embalagens_Produtos ON produtoEMBALAGEMPRODUTO = codigoPRODUTO
        INNER JOIN tb0545_Embalagens ON codigoEMBALAGEM = embalagemEMBALAGEMPRODUTO
        WHERE codigoPRODUCAO = ? AND embalagemEMBALAGEMPRODUTO = 20

    `;

    const result = await sqlServerKnexSP.raw(query, [codigo]);

    if (!result) {
      return res.status(404).send({
        mensagem: `Nenhuma embalagem encontrada para a Ordem de Produção ${codigo}`,
      });
    }

    return res.send({ result });
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};

exports.atualizarEmbalagem = async (req, res) => {
  const { codigo } = req.params;
  const { quantidade } = req.body;

  console.log(codigo, quantidade)

  try {
    const query = `SELECT codigoPRODUTO FROM tb0501_Produtos WHERE partnumberPRODUTO = ?`;

    const codigoItatibaResult = await sqlServerKnex.raw(query, [codigo]);
    const codigoSPResult = await sqlServerKnexSP.raw(query, [codigo]);

    if (!codigoItatibaResult[0] || !codigoSPResult[0]) {
      return res.status(404).send({ mensagem: "Produto não encontrado." });
    }

    const codigoItatiba = codigoItatibaResult[0].codigoPRODUTO;
    const codigoSP = codigoSPResult[0].codigoPRODUTO;

    console.log("Código Itatiba:", codigoItatiba, "Código SP:", codigoSP);

    const updateQuery = `
        UPDATE tb0504_Embalagens_Produtos 
        SET quantidadeEMBALAGEMPRODUTO = ? 
        WHERE produtoEMBALAGEMPRODUTO = ? 
        AND embalagemEMBALAGEMPRODUTO = 20
      `;

    // Executar as atualizações
    const resultItatiba = await sqlServerKnex.raw(updateQuery, [
      quantidade,
      codigoItatiba,
    ]);

    const resultSP = await sqlServerKnexSP.raw(updateQuery, [
      quantidade,
      codigoSP,
    ]);

    // Validar os resultados das atualizações

    return res.status(200).send({
      mensagem: "Quantidade atualizada com sucesso.",
      resultItatiba,
      resultSP,
    });
  } catch (error) {
    console.error("Erro ao atualizar a embalagem:", error);
    return res
      .status(500)
      .send({ mensagem: "Erro interno do servidor.", error });
  }
};
