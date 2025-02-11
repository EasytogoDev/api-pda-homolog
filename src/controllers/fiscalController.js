const { sqlServerKnex } = require("../config/sqlserver");

exports.getPedidoData = async (req, res) => {
  try {
    const { limit = 10, offset = 0 } = req.query;

    const query = `
      SELECT 
        tb4401.codigoGERENCIADORNFE AS numeroGerenciador,
        statusGERENCIADORNFE,
        tb4402.serie_ideCABNFE AS SerieNF,
        tb4402.nNF_ideCABNFE AS numeroNF,
        tb4402.dhEmi_ideCABNFE AS DataEmissao,
        tb4402.dhSaiEnt_ideCABNFE AS DataCriacao, 
        tb4402.vinculoemitenteCABNFE AS CodigoEmitente,
        tb4402.CNPJ_emitCABNFE AS CnpjEmitente,
        tb4402.CPF_emitCABNFE AS CpfEmitente,
        tb4402.xNome_emitCABNFE AS RazaoSocialEmitente,
        tb4401.chaveGERENCIADORNFE AS chaveNF,
        tb4402.vinculodestinatarioCABNFE AS CodigoDestinatario,
        tb4402.CNPJ_destCABNFE AS CnpjDestinatario,
        tb4402.CPF_destCABNFE AS CpfDestinatario,
        tb4402.xNome_destCABNFE AS RazaoSocialDest,
        tb4402.vNF_ICMSTotCABNFE AS valorLiquidoNF,
        JSON_QUERY((
          SELECT 
              COALESCE(tb0501.partnumberPRODUTO, tb4405.cProd_prodITEMNFE) AS sku,
              tb4405.qCom_prodITEMNFE AS quantidade,
              --tb4405.vProd_prodITEMNFE AS valorUnitario,
              --COALESCE(tb0501.nomePRODUTO, tb4405.xProd_prodITEMNFE) AS sku, 
              COALESCE(codigoITEMNFE, 0) AS item,  
              nItem_detITEMNFE AS numeroItem
          FROM tb4405_Item_NFe tb4405
          LEFT JOIN tb0501_Produtos tb0501 ON tb0501.codigoPRODUTO = tb4405.produtovinculadoITEMNFE 
          LEFT JOIN tb1403_Itens_Pedidos ON codigoITEMPC = docvinculadoITEMNFE AND tipodocvinculadoITEMNFE = 1403
          WHERE tb4405.cabecalhoITEMNFE = tb4402.codigoCABNFE
          FOR JSON PATH
        )) AS Itens
      FROM tb4401_Gerenciador_NFe tb4401
      INNER JOIN tb4402_Cabecalho_NFe tb4402 ON tb4401.codigoGERENCIADORNFE = tb4402.gerenciadorCABNFE
      WHERE tb4401.lixeiraGERENCIADORNFE = 0 AND statusGERENCIADORNFE IS NOT NULL
      ORDER BY numeroGerenciador DESC
      OFFSET ? ROWS FETCH NEXT ? ROWS ONLY;
    `;

    const result = await sqlServerKnex.raw(query, [
      Number(offset),
      Number(limit),
    ]);

    const adjustedResult = result.map((row) => ({
      ...row,
      Itens: row.Itens ? JSON.parse(row.Itens) : [], // Verifica se `Itens` não é undefined antes do JSON.parse
    }));

    return res.status(200).json(adjustedResult);
  } catch (error) {
    console.error("Erro ao buscar dados do pedido:", error);
    return res.status(500).send(error);
  }
};

exports.buscarNotaFiscalPorCodProposta = async (req, res) => {
  try {
    const { codigo } = req.params;
    const query = `
    SELECT TOP 1 
      codigoNOTAFISCAL, 
      codigoPROPOSTA,
      chaveNFE, 
      transportadoraNOTAFISCAL as TRANSPORTADORA, 
      numeroNOTAFISCAL, 
      serieNOTAFISCAL, 
      exportacaoCFOP AS EXPORTACAO
    FROM 
      tb1501_Notas_Fiscais
    INNER JOIN 
      tb1602_Itens_Proposta ON numeroNOTAFISCAL = notafiscalITEMPROPOSTA
    INNER JOIN 
      tb1601_Propostas ON propostaITEMPROPOSTA = codigoPROPOSTA
    INNER JOIN 
      tb1522_NFe ON codigoNOTAFISCAL = nfNFE
    INNER JOIN 
      tb0511_Legislacoes ON codigoLEGISLACAO = legislacaoITEMPROPOSTA
    INNER JOIN 
      tb1503_CFOP ON cfopLEGISLACAO = codigoCFOP
      WHERE 
        codigoPROPOSTA = ?
      --GROUP BY codigoNOTAFISCAL, codigoPROPOSTA, chaveNFE, transportadoraNOTAFISCAL, numeroNOTAFISCAL, serieNOTAFISCAL, exportacaoCFOP 
    `;


    const result = await sqlServerKnex.raw(query, [codigo]);

    // const rows = result?.[0] ?? result; // Para alguns bancos como SQL Server
    // if (!rows || rows.length === 0) {
    //   return res
    //     .status(404)
    //     .json({ mensagem: "Nenhuma nota fiscal encontrada." });
    // }

    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send(error);
  }
};
