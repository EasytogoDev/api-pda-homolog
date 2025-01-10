const ItensPedidos = require("../models/itenspedidos");

// Criar um novo item de pedido
exports.create = async (req, res) => {
  try {
    const itemPedido = await ItensPedidos.create(req.body);
    res.status(201).json({
      status: true,
      message: "Item de pedido criado com sucesso!",
      itemPedido,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao criar item de pedido",
      error: error.message,
    });
  }
};

// Buscar todos os itens de pedidos
exports.findAll = async (req, res) => {
  const itensPedidos = await ItensPedidos.findAll();
  try {
    res.status(200).json({ status: true, itensPedidos });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao buscar itens de pedidos",
      error: error.message,
    });
  }
};

// Buscar um item de pedido por ID
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const itemPedido = await ItensPedidos.findByPk(id);
    if (!itemPedido) {
      return res
        .status(404)
        .json({ status: false, message: "Item de pedido não encontrado" });
    }
    res.status(200).json({ status: true, itemPedido });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao buscar item de pedido",
      error: error.message,
    });
  }
};

// Atualizar um item de pedido por ID
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const itemPedido = await ItensPedidos.findByPk(id);
    if (!itemPedido) {
      return res
        .status(404)
        .json({ status: false, message: "Item de pedido não encontrado" });
    }

    await itemPedido.update(req.body);
    res.status(200).json({
      status: true,
      message: "Item de pedido atualizado com sucesso",
      itemPedido,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao atualizar item de pedido",
      error: error.message,
    });
  }
};

// Deletar um item de pedido por ID
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const itemPedido = await ItensPedidos.findByPk(id);
    if (!itemPedido) {
      return res
        .status(404)
        .json({ status: false, message: "Item de pedido não encontrado" });
    }

    await itemPedido.destroy();
    res
      .status(200)
      .json({ status: true, message: "Item de pedido deletado com sucesso" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao deletar item de pedido",
      error: error.message,
    });
  }
};
