const { sqlServerSequelize, Vendedores } = require('../models');

exports.getVendasEstado = async (req, res) => {
    try {
      const usuario = req.user.codigo; // Pega o código do usuário do JWT token
  
      if (!usuario) {
        return res.status(400).send({ error: 'Usuário não definido no token' });
      }
  
      // Primeira consulta: Obter o codigoVENDEDOR associado ao usuário
      const vendedorAssociado = await Vendedores.findOne({
        where: {
          usuarioassociadoVENDEDOR: usuario,
        },
        attributes: ['codigoVENDEDOR'],
      });
  
      let whereClause = '';
      let joinClause = '';
  
      if (vendedorAssociado && vendedorAssociado.codigoVENDEDOR) {
        whereClause = `AND vendedorCARTEIRA = ${vendedorAssociado.codigoVENDEDOR}`;
        joinClause = `INNER JOIN tb1616_Carteiras ON codigoEMPRESA = empresaCARTEIRA`;
      }
  
      // Pegar as datas enviadas ou usar o mês atual
      const dataInicial = req.query.dataInicial || new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10) + ' 00:00:00.000';
      const dataFinal = req.query.dataFinal || new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().slice(0, 10) + ' 23:59:59.000';
  
      // Pegar limit e offset para paginação
      const limit = req.query.limit ? parseInt(req.query.limit, 10) : 50; // Limitar a 50 por padrão
      const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  
      const propostas = await sqlServerSequelize.query(
        `WITH RankedData AS (
            SELECT 
              produtoITEMNOTAFISCAL AS produto,
              nomePRODUTO AS descricao,
              SUM(quantidadeITEMNOTAFISCAL) AS quantidade,
              unidadeITEMNOTAFISCAL AS unidade,
              estadoENDERECO AS estado,
              nomeLINHA AS linha,
              ROW_NUMBER() OVER (ORDER BY SUM(quantidadeITEMNOTAFISCAL) DESC) AS rank
            FROM tb1501_Notas_Fiscais 
            INNER JOIN tb1502_Itens_Nota_Fiscal 
              ON codigoNOTAFISCAL = notafiscalITEMNOTAFISCAL 
            INNER JOIN tb1503_CFOP 
              ON codigoCFOP = cfopITEMNOTAFISCAL 
            INNER JOIN tb0301_Empresas 
              ON codigoEMPRESA = destinatarioNOTAFISCAL
            INNER JOIN tb0302_Enderecos 
              ON codigoEMPRESA = empresaENDERECO 
              AND padraoENDERECO = 1 
              AND tipoENDERECO = 4
            INNER JOIN tb0501_Produtos 
              ON codigoPRODUTO = codigoprodutoITEMNOTAFISCAL
            INNER JOIN tb0553_Produtos_Linhas 
              ON codigoPRODUTO = produtoPRODUTOLINHA
            INNER JOIN tb0527_Linhas 
              ON codigoLINHA = linhaPRODUTOLINHA
              ${joinClause}
            WHERE  
              statusNOTAFISCAL = 1
              AND gerarreceitaCFOP = 1 
              AND operacaoNOTAFISCAL = 2 
              AND situacaonfeNOTAFISCAL IN (100, 204)
              AND cfopITEMNOTAFISCAL NOT IN (3101, 5911, 6911, 5910, 6910, 1410, 2410, 1201, 2201, 1202, 2202, 5949, 6949, 5901, 5413, 5916, 5554, 5413, 5556, 5924, 5921, 6921)
              AND datacriacaoNOTAFISCAL >= '${dataInicial}' 
              AND datacriacaoNOTAFISCAL <= '${dataFinal}' 
              AND pastaNOTAFISCAL NOT IN (3422, 256, 259, 1690, 3403, 232, 289)
              ${whereClause}
            GROUP BY 
              produtoITEMNOTAFISCAL, 
              nomePRODUTO, 
              unidadeITEMNOTAFISCAL, 
              estadoENDERECO, 
              nomeLINHA
          )
          SELECT * 
          FROM RankedData
          ORDER BY quantidade DESC
          OFFSET ${offset} ROWS FETCH NEXT ${limit} ROWS ONLY;
          `,
        {
          type: sqlServerSequelize.QueryTypes.SELECT
        }
      );
  
      return res.status(200).json(propostas);
    } catch (error) {
      console.error(error);
      return res.status(500).send({ error: error.message });
    }
  };
  