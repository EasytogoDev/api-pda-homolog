const ItensProposta = require("../models/itenspropostas");

// Criar um novo item de proposta
exports.create = async (req, res) => {
  try {
    const itemProposta = await ItensProposta.create(req.body);
    res.status(201).json({
      status: true,
      message: "Item de proposta criado com sucesso!",
      itemProposta,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao criar item de proposta",
      error: error.message,
    });
  }
};



// Buscar um item de proposta por ID
exports.findOne = async (req, res) => {
  const { id } = req.params;
  try {
    const itemProposta = await ItensProposta.findAll({
      where: {
        propostaITEMPROPOSTA: id
      }
    });
    if (!itemProposta) {
      return res
        .status(404)
        .json({ status: false, message: "Item de proposta não encontrado" });
    }
    res.status(200).json({ status: true, itemProposta });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao buscar item de proposta",
      error: error.message,
    });
  }
};

// Atualizar um item de proposta por ID
exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    const itemProposta = await ItensProposta.findByPk(id);
    if (!itemProposta) {
      return res
        .status(404)
        .json({ status: false, message: "Item de proposta não encontrado" });
    }

    await itemProposta.update(req.body);
    res.status(200).json({
      status: true,
      message: "Item de proposta atualizado com sucesso",
      itemProposta,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao atualizar item de proposta",
      error: error.message,
    });
  }
};

// Deletar um item de proposta por ID
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const itemProposta = await ItensProposta.findByPk(id);
    if (!itemProposta) {
      return res
        .status(404)
        .json({ status: false, message: "Item de proposta não encontrado" });
    }

    await itemProposta.destroy();
    res
      .status(200)
      .json({ status: true, message: "Item de proposta deletado com sucesso" });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Erro ao deletar item de proposta",
      error: error.message,
    });
  }
};
