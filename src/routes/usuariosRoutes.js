const express = require("express");
const router = express.Router();
const login = require("../middleware/login");
const usuariosController = require("../controllers/usuariosControllers");
/**
 * @swagger
 * components:
 *   schemas:
 *     Usuario:
 *       type: object
 *       properties:
 *         codigo:
 *           type: integer
 *           description: ID único do usuário
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         senha:
 *           type: string
 *           description: Senha do usuário (sem criptografia)
 *         nomeCompleto:
 *           type: string
 *           description: Nome completo do usuário
 *         observacao:
 *           type: string
 *           description: Observação sobre o usuário
 *         ativo:
 *           type: integer
 *           description: Status do usuário (ativo/inativo)
 *         imagemUrl:
 *           type: string
 *           description: URL da imagem do usuário
 *       example:
 *         codigo: 1
 *         nome: "João da Silva"
 *         senha: "12345678"
 *         nomeCompleto: "João da Silva Neto"
 *         observacao: "Usuário de teste"
 *         ativo: 1
 *         imagemUrl: "/path/to/image"
 */

/**
 * @swagger
 * /api/usuarios/login:
 *   post:
 *     summary: Realiza login de um usuário e retorna um token JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - senha
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário (sem criptografia)
 *             example:
 *               nome: "usuario"
 *               senha: "senha"
 *     responses:
 *       200:
 *         description: Autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: Autenticado com sucesso
 *                 token:
 *                   type: string
 *                   description: Token JWT para autenticação
 *                 status:
 *                   type: integer
 *                   example: 1
 *       401:
 *         description: Falha na autenticação, usuário ou senha inválidos
 *       500:
 *         description: Erro no servidor
 */
router.post("/login", login.optional, usuariosController.Login);

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Retorna uma lista de todos os usuários
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuários
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */
router.get("/", login.required, usuariosController.getUsuarios);

/**
 * @swagger
 * /api/usuarios/{codigo}:
 *   get:
 *     summary: Retorna todos os detalhes de um usuário específico pelo código
 *     tags: [Usuários]
 *     parameters:
 *       - in: path
 *         name: codigo
 *         schema:
 *           type: integer
 *         required: true
 *         description: Código do usuário
 *     responses:
 *       200:
 *         description: Detalhes do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: integer
 *                   description: ID único do usuário
 *                 nome:
 *                   type: string
 *                   description: Nome do usuário
 *                 nomeCompleto:
 *                   type: string
 *                   description: Nome completo do usuário
 *                 senha:
 *                   type: string
 *                   description: Senha do usuário (sem criptografia)
 *                 observacao:
 *                   type: string
 *                   description: Observação sobre o usuário
 *                 ativo:
 *                   type: integer
 *                   description: Status do usuário (ativo/inativo)
 *                 pasta:
 *                   type: integer
 *                   description: Pasta do usuário
 *                 lixeira:
 *                   type: integer
 *                   description: Lixeira do usuário
 *                 sistema:
 *                   type: integer
 *                   description: Sistema do usuário
 *                 usuarioInterno:
 *                   type: integer
 *                   description: Código interno do usuário
 *                 aplicacao:
 *                   type: integer
 *                   description: Aplicação do usuário
 *                 expira:
 *                   type: integer
 *                   description: Indica se a conta do usuário expira
 *                 dias:
 *                   type: integer
 *                   description: Dias restantes para expirar
 *                 inicio:
 *                   type: string
 *                   format: date-time
 *                   description: Data de início da conta do usuário
 *                 mudar:
 *                   type: integer
 *                   description: Indica se o usuário precisa mudar a senha
 *                 componenteInicial:
 *                   type: integer
 *                   description: Componente inicial do usuário
 *                 exibirMenuVertical:
 *                   type: integer
 *                   description: Indica se o menu vertical é exibido
 *                 exibirBarraFerramentas:
 *                   type: integer
 *                   description: Indica se a barra de ferramentas é exibida
 *                 iconelocal:
 *                   type: integer
 *                   description: Ícone local do usuário
 *                 caminhoIcone:
 *                   type: string
 *                   description: Caminho do ícone do usuário
 *                 googleCalendar:
 *                   type: integer
 *                   description: Indica se o Google Calendar está habilitado
 *                 corPadrao:
 *                   type: integer
 *                   description: Cor padrão do usuário
 *                 administradorTecware:
 *                   type: integer
 *                   description: Indica se o usuário é administrador do sistema Tecware
 *                 remetente:
 *                   type: integer
 *                   description: Indica se o usuário é remetente
 *                 assinaturaImg:
 *                   type: string
 *                   description: Assinatura em imagem do usuário
 *                 expediente:
 *                   type: integer
 *                   description: Expediente do usuário
 *                 imagemUrl:
 *                   type: string
 *                   description: URL da imagem do usuário
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get("/:codigo", login.required, usuariosController.getUsuarioByCodigo);

/**
 * @swagger
 * /api/usuarios/criar:
 *   post:
 *     summary: Cria um novo usuário
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               senha:
 *                 type: string
 *                 description: Senha do usuário (sem criptografia)
 *               nomeCompleto:
 *                 type: string
 *                 description: Nome completo do usuário
 *               observacao:
 *                 type: string
 *                 description: Observação sobre o usuário
 *               ativo:
 *                 type: integer
 *                 description: Status do usuário (ativo/inativo)
 *               imagemUrl:
 *                 type: string
 *                 description: URL da imagem do usuário
 *             example:
 *               nome: "João da Silva"
 *               senha: "12345678"
 *               nomeCompleto: "João da Silva Neto"
 *               observacao: "Usuário de teste"
 *               ativo: 1
 *               imagemUrl: "/path/to/image"
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       409:
 *         description: Conflito. Usuário já cadastrado.
 *       500:
 *         description: Erro no servidor
 */

router.post("/criar", login.required, usuariosController.createUsuario);

/**
 * @swagger
 * /api/usuarios/alterar:
 *   patch:
 *     summary: Atualiza os detalhes de um usuário existente
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo:
 *                 type: integer
 *                 description: Código do usuário
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               senha:
 *                 type: string
 *                 description: Nova senha do usuário (sem criptografia)
 *               nomeCompleto:
 *                 type: string
 *                 description: Nome completo do usuário
 *               observacao:
 *                 type: string
 *                 description: Observação sobre o usuário
 *               ativo:
 *                 type: boolean
 *                 description: Status do usuário (ativo/inativo)
 *               imagemUrl:
 *                 type: string
 *                 description: URL da imagem do usuário
 *             example:
 *               codigo: 1
 *               nome: "João da Silva"
 *               senha: "novaSenha123"
 *               nomeCompleto: "João da Silva Neto"
 *               observacao: "Atualização do perfil"
 *               ativo: true
 *               imagemUrl: "/path/to/image"
 *     responses:
 *       202:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.patch("/alterar", login.required, usuariosController.updateUsuarios);

/**
 * @swagger
 * /api/usuarios/editar/{id}:
 *   put:
 *     summary: Atualiza os detalhes de um usuário existente
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do usuario para alterar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome do usuário
 *               senha:
 *                 type: string
 *                 description: Nova senha do usuário (sem criptografia)
 *               nomeCompleto:
 *                 type: string
 *                 description: Nome completo do usuário
 *               observacao:
 *                 type: string
 *                 description: Observação sobre o usuário
 *               ativo:
 *                 type: boolean
 *                 description: Status do usuário (ativo/inativo)
 *               imagemUrl:
 *                 type: string
 *                 description: URL da imagem do usuário
 *             example:
 *               nome: "João da Silva"
 *               senha: "novaSenha123"
 *               nomeCompleto: "João da Silva Neto"
 *               observacao: "Atualização do perfil"
 *               ativo: true
 *               imagemUrl: "/path/to/image"
 *     responses:
 *       202:
 *         description: Usuário atualizado com sucesso
 *       404:
 *         description: Usuário não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.put("/editar/:id", login.required, usuariosController.editUsuario);

module.exports = router;
