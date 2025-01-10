const jwt = require("jsonwebtoken");
const { Usuarios } = require("../models");

/**
 * Realiza login de um usuário e retorna um token JWT.
 */
exports.Login = async (req, res) => {
  try {
    const usuario = await Usuarios.findOne({
      where: {
        nomeUSUARIO: req.body.nome,
        senhaUSUARIO: req.body.senha,
        ativoUSUARIO: 1,
      },
    });

    if (!usuario) {
      return res.status(401).send({
        mensagem: "Falha na autenticação: Usuário ou senha inválidos",
        status: 0,
      });
    }

    const token = jwt.sign(
      {
        codigo: usuario.codigoUSUARIO, 
        nome: usuario.nomecompletoUSUARIO,
        componenteinicial: usuario.componenteinicialUSUARIO,
        exibirmenuvertical: usuario.exibirmenuverticalUSUARIO,
        exibirbarraferramentas: usuario.exibirbarraferramentasUSUARIO,
        admin: usuario.sistemaUSUARIO,
        cargo: usuario.observacaoUSUARIO,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "168h", // Token expira em 7 dias
      }
    );

    return res.status(200).send({
      mensagem: "Autenticado com sucesso",
      token: token,
      status: 1,
    });
  } catch (error) {
    return res.status(500).send({
      mensagem: "Falha na autenticação",
      status: 0,
      error: error.message,
    });
  }
};

/**
 * Retorna uma lista de todos os usuários.
 */
exports.getUsuarios = async (req, res) => {
    try {
      const usuarios = await Usuarios.findAll({
        attributes: [
          "codigoUSUARIO",
          "nomeUSUARIO",
          "nomecompletoUSUARIO",
          "observacaoUSUARIO",
          "ativoUSUARIO",
          "imagemurlUSUARIO",
        ],
        where: {
          ativoUSUARIO: 1,
        },
      });
  
      const usuariosSimplificados = usuarios.map((usuario) => ({
        codigo: usuario.codigoUSUARIO,
        nome: usuario.nomeUSUARIO,
        nomeCompleto: usuario.nomecompletoUSUARIO,
        observacao: usuario.observacaoUSUARIO,
        ativo: usuario.ativoUSUARIO,
        imagemUrl: usuario.imagemurlUSUARIO,
      }));
  
      return res.status(200).send(usuariosSimplificados);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

/**
 * Busca dados espeficos de usaurios
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

exports.getUsuarioByCodigo = async (req, res) => {
    try {
      const { codigo } = req.params;
      const usuario = await Usuarios.findOne({
        where: { codigoUSUARIO: codigo },
      });
  
      if (!usuario) {
        return res.status(404).send({ mensagem: "Usuário não encontrado" });
      }
  
      const usuarioDetalhado = {
        codigo: usuario.codigoUSUARIO,
        nome: usuario.nomeUSUARIO,
        nomeCompleto: usuario.nomecompletoUSUARIO,
        senha: "******",
        observacao: usuario.observacaoUSUARIO,
        ativo: usuario.ativoUSUARIO,
        pasta: usuario.pastaUSUARIO,
        lixeira: usuario.lixeiraUSUARIO,
        sistema: usuario.sistemaUSUARIO,
        usuarioInterno: usuario.usuarioUSUARIO,
        aplicacao: usuario.aplicacaoUSUARIO,
        expira: usuario.expiraUSUARIO,
        dias: usuario.diasUSUARIO,
        inicio: usuario.inicioUSUARIO,
        mudar: usuario.mudarUSUARIO,
        componenteInicial: usuario.componenteinicialUSUARIO,
        exibirMenuVertical: usuario.exibirmenuverticalUSUARIO,
        exibirBarraFerramentas: usuario.exibirbarraferramentasUSUARIO,
        iconelocal: usuario.iconelocalUSUARIO,
        caminhoIcone: usuario.caminhoiconeUSUARIO,
        googleCalendar: usuario.googlecalendarUSUARIO,
        corPadrao: usuario.corpadraoUSUARIO,
        administradorTecware: usuario.administradortecwareUSUARIO,
        remetente: usuario.remetenteUSUARIO,
        assinaturaImg: usuario.assinaturaimgUSUARIO,
        expediente: usuario.expedienteUSUARIO,
        imagemUrl: usuario.imagemurlUSUARIO,
      };
  
      return res.status(200).send(usuarioDetalhado);
    } catch (error) {
      return res.status(500).send({ error: error.message });
    }
  };

/**
 * Cria um novo usuário.
 */
exports.createUsuario = async (req, res) => {
  try {
    const usuarioExistente = await Usuarios.findOne({
      where: { nomeUSUARIO: req.body.nome },
    });

    if (usuarioExistente) {
      return res
        .status(409)
        .send({ mensagem: "Usuário já cadastrado", status: 0 });
    }

    const novoUsuario = await Usuarios.create({
      nomeUSUARIO: req.body.nome,
      senhaUSUARIO: req.body.senha, // Armazenando a senha sem criptografia
      nomecompletoUSUARIO: req.body.nomeCompleto,
      observacaoUSUARIO: req.body.observacao,
      ativoUSUARIO: req.body.ativo || 0,
      imagemurlUSUARIO: req.body.imagemUrl,
    });

    return res.status(201).send({
      mensagem: "Usuário criado com sucesso",
      usuario: {
        codigo: novoUsuario.codigoUSUARIO,
        nome: novoUsuario.nomeUSUARIO,
        ativo: novoUsuario.ativoUSUARIO,
      },
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Atualiza os detalhes de um usuário existente.
 */
exports.updateUsuarios = async (req, res) => {
  try {
    const fieldsToUpdate = {};

    if (req.body.nome) fieldsToUpdate.nomeUSUARIO = req.body.nome;
    if (req.body.senha) fieldsToUpdate.senhaUSUARIO = req.body.senha; // Atualizando a senha sem criptografia
    if (req.body.nomeCompleto) fieldsToUpdate.nomecompletoUSUARIO = req.body.nomeCompleto;
    if (req.body.observacao) fieldsToUpdate.observacaoUSUARIO = req.body.observacao;
    if (req.body.ativo !== undefined) fieldsToUpdate.ativoUSUARIO = req.body.ativo;
    if (req.body.imagemUrl) fieldsToUpdate.imagemurlUSUARIO = req.body.imagemUrl;

    const [updatedRows] = await Usuarios.update(fieldsToUpdate, {
      where: { codigoUSUARIO: req.body.codigo },
    });

    if (updatedRows === 0) {
      return res.status(404).send({ mensagem: "Usuário não encontrado" });
    }

    return res.status(202).send({ mensagem: "Usuário atualizado com sucesso" });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

/**
 * Atualiza os detalhes de um usuário existente pelo ID.
 */
exports.editUsuario = async (req, res) => {
  const { id } = req.params;
  const newInfo = {
    nomeUSUARIO: req.body.nome,
    senhaUSUARIO: req.body.senha,
    nomecompletoUSUARIO: req.body.nomeCompleto,
    observacaoUSUARIO: req.body.observacao,
    ativoUSUARIO: req.body.ativo,
    imagemurlUSUARIO: req.body.imagemUrl,
  };

  try {
    const [updatedRows] = await Usuarios.update(newInfo, {
      where: {
        codigoUSUARIO: id,
      },
    });

    if (updatedRows === 0) {
      return res.status(404).send({ mensagem: "Usuário não encontrado" });
    }

    return res
      .status(202)
      .send({ mensagem: `Usuário ${id} atualizado com sucesso` });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
