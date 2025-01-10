const express = require("express");
const router = express.Router();
const propostasControllers = require("../controllers/propostasControllers");
const login = require("../middleware/login"); // Presumindo que você tenha um middleware de autenticação

/**
 * @swagger
 * tags:
 *   name: Propostas
 *   description: API para gerenciamento de propostas
 */

/**
 * @swagger
 * /api/propostas/create:
 *   post:
 *     summary: Criar uma nova proposta
 *     tags: [Propostas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clienteId:
 *                 type: integer
 *                 description: ID do cliente
 *               valorTotal:
 *                 type: number
 *                 description: Valor total da proposta
 *               descricao:
 *                 type: string
 *                 description: Descrição da proposta
 *             example:
 *               clienteId: 1
 *               valorTotal: 5000.00
 *               descricao: "Proposta de serviços de TI"
 *     responses:
 *       201:
 *         description: Proposta criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Proposta criada com sucesso!
 *                 proposta:
 *                   type: object
 *       500:
 *         description: Erro ao criar proposta
 */
router.post("/create", login.required, propostasControllers.create);

/**
 * @swagger
 * /api/propostas/all:
 *   get:
 *     summary: Buscar todas as propostas
 *     tags: [Propostas]
 *     responses:
 *       200:
 *         description: Lista de propostas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Erro ao buscar propostas
 */
router.get("/all", login.required, propostasControllers.findAll);

/**
 * @swagger
 * /api/propostas/get/{id}:
 *   get:
 *     summary: Buscar uma proposta por ID
 *     tags: [Propostas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da proposta
 *     responses:
 *       200:
 *         description: Proposta encontrada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Proposta não encontrada
 */
router.get("/get/:id", login.required, propostasControllers.findOne);

/**
 * @swagger
 * /api/propostas/edit/{id}:
 *   put:
 *     summary: Atualizar uma proposta por ID
 *     tags: [Propostas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da proposta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valorTotal:
 *                 type: number
 *                 description: Valor total atualizado da proposta
 *               descricao:
 *                 type: string
 *                 description: Descrição da proposta
 *             example:
 *               valorTotal: 6000.00
 *               descricao: "Proposta de serviços de TI atualizada"
 *     responses:
 *       200:
 *         description: Proposta atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Proposta atualizada com sucesso!
 *                 proposta:
 *                   type: object
 *       404:
 *         description: Proposta não encontrada
 *       500:
 *         description: Erro ao atualizar proposta
 */
router.put("/edit/:id", login.required, propostasControllers.update);

/**
 * @swagger
 * /api/propostas/delete/{id}:
 *   delete:
 *     summary: Deletar uma proposta por ID
 *     tags: [Propostas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da proposta
 *     responses:
 *       200:
 *         description: Proposta deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Proposta deletada com sucesso!
 *       404:
 *         description: Proposta não encontrada
 *       500:
 *         description: Erro ao deletar proposta
 */
router.delete("/delete/:id", login.required, propostasControllers.delete);

/**
 * @swagger
 * /api/propostas/grouped:
 *   get:
 *     summary: Retorna as propostas agrupadas com valores agregados
 *     tags: [Propostas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso na busca das propostas agrupadas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigoPROPOSTA:
 *                     type: integer
 *                     description: Código da proposta ou proposta vinculada
 *                     example: 123
 *                   statusPROPOSTA:
 *                     type: integer
 *                     description: Status da proposta
 *                     example: 1
 *                   liquido:
 *                     type: number
 *                     format: float
 *                     description: Soma do valor líquido das propostas
 *                     example: 1000.50
 *                   ipi:
 *                     type: number
 *                     format: float
 *                     description: Soma do valor de IPI das propostas
 *                     example: 150.75
 *                   icmsst:
 *                     type: number
 *                     format: float
 *                     description: Soma do valor de ICMS-ST das propostas
 *                     example: 200.30
 *                   bruto:
 *                     type: number
 *                     format: float
 *                     description: Soma do valor bruto das propostas
 *                     example: 1200.80
 *                   datacriacao:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação da proposta
 *                     example: "2023-09-15T12:00:00Z"
 *                   cidadeEMPRESA:
 *                     type: string
 *                     description: Nome da cidade da empresa associada
 *                     example: "São Paulo"
 *                   estadoEMPRESA:
 *                     type: string
 *                     description: Estado da empresa associada
 *                     example: "SP"
 *       401:
 *         description: Acesso negado. Autenticação necessária
 *       500:
 *         description: Erro no servidor
 */

router.get(
  "/grouped",
  login.required,
  propostasControllers.getPropostasGrouped
);

module.exports = router;
