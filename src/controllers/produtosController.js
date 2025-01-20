const { sqlServerKnex, sqlServerKnexSP } = require("../config/sqlserver");

const getProdutoData = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  try {
    const query = `
      SELECT * 
      FROM (
          SELECT  
              codigoPRODUTO AS codigo,
              partnumberPRODUTO AS sku,
              nomePRODUTO AS Descricao,
              alturaPRODUTO AS Altura,
              larguraPRODUTO AS Largura,
              comprimentoPRODUTO AS Comprimento,
              pesobrutoPRODUTO AS Peso,
              CASE  
                  WHEN codigobarrasEMBALAGEMPRODUTO IS NULL THEN 
                      CASE WHEN ean13PRODUTO IS NULL THEN '' ELSE ean13PRODUTO END 
                  WHEN codigobarrasEMBALAGEMPRODUTO = '' THEN '' 
                  ELSE ean13PRODUTO 
              END AS Barras,
              nomeUNIDADEMEDIDA AS N,
              descontinuadoPRODUTO AS Descontinuado,
              nomePASTA AS PASTA,
              (
                  SELECT 
                      nomeEMBALAGEM AS EMBALAGEM,
                      codigobarrasEMBALAGEMPRODUTO AS GTIN,
                      quantidadeEMBALAGEMPRODUTO AS QUANTIDADE,
                      nomeUNIDADEMEDIDA AS UNIDADE,
                      padraoEMBALAGEMPRODUTO AS PADRAO
                  FROM tb0504_Embalagens_Produtos  
                  LEFT JOIN tb0545_Embalagens ON codigoEMBALAGEM = embalagemEMBALAGEMPRODUTO
                  INNER JOIN tb0505_Unidades_Medidas ON undprincipalPRODUTO = codigoUNIDADEMEDIDA
                  WHERE produtoEMBALAGEMPRODUTO = tb0501_Produtos.codigoPRODUTO
                  FOR JSON PATH
              ) AS GTINS,
              ROW_NUMBER() OVER (ORDER BY codigoPRODUTO) AS RowNum
          FROM tb0501_Produtos 
          INNER JOIN tb0505_Unidades_Medidas ON codigoUNIDADEMEDIDA = undprincipalPRODUTO
          INNER JOIN tb0001_Pastas ON codigoPASTA = pastaPRODUTO
          LEFT JOIN tb0504_Embalagens_Produtos ON codigoPRODUTO = produtoEMBALAGEMPRODUTO AND padraoEMBALAGEMPRODUTO = 1
          LEFT JOIN tb0545_Embalagens ON codigoEMBALAGEM = embalagemEMBALAGEMPRODUTO
          WHERE lixeiraPRODUTO = 0 
            -- AND descontinuadoPRODUTO = 0 
            AND obtencaoPRODUTO IN(1,2)
            AND tipoPRODUTO = 1
          GROUP BY 
              codigoPRODUTO, 
              partnumberPRODUTO, 
              nomePRODUTO, 
              alturaPRODUTO, 
              larguraPRODUTO, 
              comprimentoPRODUTO, 
              pesobrutoPRODUTO, 
              ean13PRODUTO, 
              nomeUNIDADEMEDIDA, 
              nomePASTA, 
              codigobarrasEMBALAGEMPRODUTO,
              undprincipalPRODUTO  -- Adicionado ao GROUP BY
      ) AS Result
      WHERE RowNum > ? AND RowNum <= (? + ?)
      ORDER BY RowNum;
    `;

    const result = await sqlServerKnex.raw(query, [offset, offset, limit]);

    // Parse GTINS column for each row
    const formattedResult = result.map((row) => {
      return {
        ...row,
        GTINS: JSON.parse(row.GTINS), // Parse GTINS into JSON
      };
    });

    return res.status(200).json(formattedResult);
  } catch (error) {
    console.error("Erro ao buscar dados do produto:", error);
    return res.sendStatus(500);
  }
};

const getProdutoDataById = async (req, res) => {
  const { produto } = req.params;

  if (!produto) {
    return res.status(500).send({ mensagem: "Error" });
  }

  try {
    const query = `
          SELECT  
              codigoPRODUTO AS codigo,
              partnumberPRODUTO AS sku,
              nomePRODUTO AS Descricao,
              alturaPRODUTO AS Altura,
              larguraPRODUTO AS Largura,
              comprimentoPRODUTO AS Comprimento,
              pesobrutoPRODUTO AS Peso,
              CASE  
                  WHEN codigobarrasEMBALAGEMPRODUTO IS NULL THEN 
                      CASE WHEN ean13PRODUTO IS NULL THEN '' ELSE ean13PRODUTO END 
                  WHEN codigobarrasEMBALAGEMPRODUTO = '' THEN '' 
                  ELSE ean13PRODUTO 
              END AS Barras,
              nomeUNIDADEMEDIDA AS N,
              descontinuadoPRODUTO AS Descontinuado,
              nomePASTA AS PASTA,
              (
                  SELECT 
                      nomeEMBALAGEM AS EMBALAGEM,
                      codigobarrasEMBALAGEMPRODUTO AS GTIN,
                      quantidadeEMBALAGEMPRODUTO AS QUANTIDADE,
                      nomeUNIDADEMEDIDA AS UNIDADE,
                      padraoEMBALAGEMPRODUTO AS PADRAO
                  FROM tb0504_Embalagens_Produtos  
                  LEFT JOIN tb0545_Embalagens ON codigoEMBALAGEM = embalagemEMBALAGEMPRODUTO
                  INNER JOIN tb0505_Unidades_Medidas ON undprincipalPRODUTO = codigoUNIDADEMEDIDA
                  WHERE produtoEMBALAGEMPRODUTO = tb0501_Produtos.codigoPRODUTO
                  FOR JSON PATH
              ) AS GTINS,
              ROW_NUMBER() OVER (ORDER BY codigoPRODUTO) AS RowNum
          FROM tb0501_Produtos 
          INNER JOIN tb0505_Unidades_Medidas ON codigoUNIDADEMEDIDA = undprincipalPRODUTO
          INNER JOIN tb0001_Pastas ON codigoPASTA = pastaPRODUTO
          LEFT JOIN tb0504_Embalagens_Produtos ON codigoPRODUTO = produtoEMBALAGEMPRODUTO AND padraoEMBALAGEMPRODUTO = 1
          LEFT JOIN tb0545_Embalagens ON codigoEMBALAGEM = embalagemEMBALAGEMPRODUTO
          WHERE lixeiraPRODUTO = 0 
            -- AND descontinuadoPRODUTO = 0 
            AND obtencaoPRODUTO IN(1,2)
            AND tipoPRODUTO = 1
            AND partnumberPRODUTO = ?  -- Adicionando a comparação com o parâmetro 'produto'
          GROUP BY 
              codigoPRODUTO, 
              partnumberPRODUTO, 
              nomePRODUTO, 
              alturaPRODUTO, 
              larguraPRODUTO, 
              comprimentoPRODUTO, 
              pesobrutoPRODUTO, 
              ean13PRODUTO, 
              nomeUNIDADEMEDIDA, 
              nomePASTA, 
              codigobarrasEMBALAGEMPRODUTO,
              undprincipalPRODUTO  -- Adicionado ao GROUP BY
    `;

    const result = await sqlServerKnex.raw(query, [produto]);

    // Parse GTINS column for each row
    const formattedResult = result.map((row) => {
      return {
        ...row,
        GTINS: JSON.parse(row.GTINS), // Parse GTINS into JSON
      };
    });

    return res.status(200).json(formattedResult);
  } catch (error) {
    console.error("Erro ao buscar dados do produto:", error);
    return res.sendStatus(500);
  }
};

const compararProdutos = async (req, res) => {
  try {
    // Query para buscar todos os produtos
    const query = `SELECT partnumberPRODUTO FROM tb0501_Produtos WHERE descontinuadoPRODUTO = 0 AND lixeiraPRODUTO = 0`;

    // Executar a query em ambas as bases
    const produtosItatiba = await sqlServerKnex.raw(query);
    const produtosSP = await sqlServerKnexSP.raw(query);

    // Garantir que codigosItatiba seja um Set
    const codigosItatiba = new Set(
      produtosItatiba.map((produto) => produto.partnumberPRODUTO.trim())
    );

    // Transformar os códigos da base SP em um array de strings
    const codigosSP = produtosSP.map((produto) => produto.partnumberPRODUTO.trim());

    // Arrays para os resultados
    const itens = [];
    const fora = [];

    // Comparar usando o Set para eficiência
    for (let codigoSP of codigosSP) {
      if (codigosItatiba.has(codigoSP)) {
        itens.push(codigoSP); // Está em ambas as bases
      } else {
        fora.push(codigoSP); // Está apenas na base SP
      }
    }

    return res.status(200).send({
      mensagem: "Comparação concluída.",
      itensEncontrados: itens.length,
      itensFora: fora.length,
      fora,
    });
  } catch (error) {
    console.error("Erro ao comparar produtos:", error);
    return res.status(500).send({
      mensagem: "Erro interno ao comparar produtos.",
      error,
    });
  }
};


module.exports = { getProdutoData, getProdutoDataById, compararProdutos };
