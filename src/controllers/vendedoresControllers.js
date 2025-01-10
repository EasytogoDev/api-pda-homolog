const { Vendedores } = require('../models');

/**
 * Obtém os vendedores associados ao usuário autenticado
 */
exports.getVendedores = async (req, res) => {
    try {
      const usuario = req.user.codigo; // Pega o código do usuário do JWT token

      if (!usuario) {
        return res.status(400).send({ error: 'Usuário não definido no token' });
      }
  
      const vendedores = await Vendedores.findAll({
        where: {
          usuarioassociadoVENDEDOR: usuario,
          ativoVENDEDOR: 1, // Considerando que você quer apenas os vendedores ativos
        },
        attributes: [
          'codigoVENDEDOR',
          'nomeVENDEDOR',
          'datacriacaoVENDEDOR',
          'observacaoVENDEDOR',
          'empresaVENDEDOR',
          'gerenteVENDEDOR',
          'irrfVENDEDOR',
        ],
      });
  
      const vendedoresSimplificados = vendedores.map((vendedor) => ({
        codigo: vendedor.codigoVENDEDOR,
        nome: vendedor.nomeVENDEDOR,
        dataCriacao: vendedor.datacriacaoVENDEDOR,
        observacao: vendedor.observacaoVENDEDOR,
        empresa: vendedor.empresaVENDEDOR,
        gerente: vendedor.gerenteVENDEDOR,
        irrf: vendedor.irrfVENDEDOR,
      }));
  
      return res.status(200).send(vendedoresSimplificados);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };




  async function getVendedoresRecursivo(codigoVendedor) {
    const vendedores = await Vendedores.findAll({
      where: {
        gerenteVENDEDOR: codigoVendedor,
        ativoVENDEDOR: 1,
      },
      attributes: [
        'codigoVENDEDOR',
        'nomeVENDEDOR',
        'datacriacaoVENDEDOR',
        'observacaoVENDEDOR',
        'empresaVENDEDOR',
        'gerenteVENDEDOR',
        'irrfVENDEDOR',
      ],
    });
  
    let resultados = vendedores.map((vendedor) => ({
      codigo: vendedor.codigoVENDEDOR,
      nome: vendedor.nomeVENDEDOR,
      dataCriacao: vendedor.datacriacaoVENDEDOR,
      observacao: vendedor.observacaoVENDEDOR,
      empresa: vendedor.empresaVENDEDOR,
      gerente: vendedor.gerenteVENDEDOR,
      irrf: vendedor.irrfVENDEDOR,
    }));
  
    // Recursivamente buscar todos os vendedores abaixo
    for (const vendedor of vendedores) {
      const vendedoresSubordinados = await getVendedoresRecursivo(vendedor.codigoVENDEDOR);
      resultados = resultados.concat(vendedoresSubordinados);
    }
  
    return resultados;
  }
  
  exports.getGerentes = async (req, res) => {
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
  
      if (!vendedorAssociado) {
        return res.status(404).send({ error: 'Vendedor associado não encontrado' });
      }
  
      const codigoVendedor = vendedorAssociado.codigoVENDEDOR;
  
      // Obter todos os vendedores recursivamente
      const todosVendedores = await getVendedoresRecursivo(codigoVendedor);
  
      return res.status(200).send(todosVendedores);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };