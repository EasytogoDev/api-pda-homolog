const PedidosCompra = require("../models/pedidos");

// Criar um novo pedido
exports.create = async (req, res) => {
  try {
    const pedido = await PedidosCompra.create(req.body);
    res
      .status(201)
      .json({ status: true, message: "Pedido criado com sucesso!", pedido });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao criar o pedido",
      error: error.message,
    });
  }
};

// Buscar todos os pedidos
exports.findAll = async (req, res) => {
  const wms = req.params.wms;

  try {
  const pedidos = await PedidosCompra.findAll({
    where: wms ? { wms: wms } : {}, 
  });

    // Mapeando para remover "PEDIDOCOMPRA" do final das chaves
    const pedidosAjustados = pedidos.map((pedido) => {
      const novoPedido = {};
      Object.keys(pedido.dataValues).forEach((key) => {
        // Remove "PEDIDOCOMPRA" do final de cada chave
        const chaveAjustada = key.replace("PEDIDOCOMPRA", "");
        novoPedido[chaveAjustada] = pedido[key];
      });

      // Atualiza o campo 'prop1PEDIDOCOMPRA' para 'wms'
      novoPedido.wms = novoPedido.prop1;
      delete novoPedido.prop1;

      return novoPedido;
    });

    res.status(200).json({ status: true, pedidos: pedidosAjustados });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao buscar pedidos",
      error: error.message,
    });
  }
};

// Buscar um pedido por ID
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await PedidosCompra.findByPk(id);
    if (!pedido) {
      return res
        .status(404)
        .json({ status: false, message: "Pedido não encontrado" });
    }
    res.status(200).json({ status: true, pedido });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao buscar o pedido",
      error: error.message,
    });
  }
};

// Atualizar um pedido por ID
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await PedidosCompra.findByPk(id);
    if (!pedido) {
      return res
        .status(404)
        .json({ status: false, message: "Pedido não encontrado" });
    }

    await pedido.update(req.body);
    res
      .status(200)
      .json({ status: true, message: "Pedido atualizado com sucesso", pedido });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao atualizar o pedido",
      error: error.message,
    });
  }
};

// Deletar um pedido por ID
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const pedido = await PedidosCompra.findByPk(id);
    if (!pedido) {
      return res
        .status(404)
        .json({ status: false, message: "Pedido não encontrado" });
    }

    await pedido.destroy();
    res
      .status(200)
      .json({ status: true, message: "Pedido deletado com sucesso" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao deletar o pedido",
      error: error.message,
    });
  }
};
