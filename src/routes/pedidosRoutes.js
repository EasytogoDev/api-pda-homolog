const express = require("express");
const router = express.Router();
const pedidosController = require("../controllers/pedidosController");
const login = require("../middleware/login"); // Presumindo que você tenha um middleware de autenticação

/**
 * @swagger
 * tags:
 *   name: Pedidos
 *   description: API para gerenciamento de pedidos
 */

/**
 * @swagger
 * /api/pedidos:
 *   post:
 *     summary: Criar um novo pedido
 *     tags: [Pedidos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pastaPEDIDOCOMPRA:
 *                 type: integer
 *                 description: Pasta associada ao pedido
 *               usuarioPEDIDOCOMPRA:
 *                 type: integer
 *                 description: Código do usuário responsável pelo pedido
 *               statusPEDIDOCOMPRA:
 *                 type: integer
 *                 description: Status atual do pedido
 *               dataPEDIDOCOMPRA:
 *                 type: string
 *                 format: date-time
 *                 description: Data do pedido
 *               fornecedorPEDIDOCOMPRA:
 *                 type: integer
 *                 description: Código do fornecedor
 *               solicitantePEDIDOCOMPRA:
 *                 type: integer
 *                 description: Código do solicitante do pedido
 *               origemPEDIDOCOMPRA:
 *                 type: integer
 *                 description: Origem do pedido
 *               taxanacionalizacaoPEDIDOCOMPRA:
 *                 type: number
 *                 format: decimal
 *                 description: Taxa de nacionalização
 *               transportadoraPEDIDOCOMPRA:
 *                 type: integer
 *                 description: Código da transportadora
 *               nometransportadoraPEDIDOCOMPRA:
 *                 type: string
 *                 description: Nome da transportadora
 *               compradorPEDIDOCOMPRA:
 *                 type: integer
 *                 description: Código do comprador
 *               liquidoPEDIDOCOMPRA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor líquido do pedido
 *             example:
 *               pastaPEDIDOCOMPRA: 101
 *               usuarioPEDIDOCOMPRA: 202
 *               statusPEDIDOCOMPRA: 1
 *               dataPEDIDOCOMPRA: "2024-12-20T12:00:00Z"
 *               fornecedorPEDIDOCOMPRA: 303
 *               solicitantePEDIDOCOMPRA: 404
 *               origemPEDIDOCOMPRA: 1
 *               taxanacionalizacaoPEDIDOCOMPRA: 12.5
 *               transportadoraPEDIDOCOMPRA: 505
 *               nometransportadoraPEDIDOCOMPRA: "Transportadora XYZ"
 *               compradorPEDIDOCOMPRA: 606
 *               liquidoPEDIDOCOMPRA: 1500.75
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
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
 *                   example: Pedido criado com sucesso!
 *                 pedido:
 *                   type: object
 *       500:
 *         description: Erro ao criar o pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar o pedido"
 */

/**
 * @swagger
 * /api/pedidos:
 *   get:
 *     summary: Buscar todos os pedidos
 *     tags: [Pedidos]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigoPEDIDOCOMPRA:
 *                     type: integer
 *                   pastaPEDIDOCOMPRA:
 *                     type: integer
 *                   usuarioPEDIDOCOMPRA:
 *                     type: integer
 *                   statusPEDIDOCOMPRA:
 *                     type: integer
 *                   dataPEDIDOCOMPRA:
 *                     type: string
 *                     format: date-time
 *                   fornecedorPEDIDOCOMPRA:
 *                     type: integer
 *       500:
 *         description: Erro ao buscar pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar pedidos"
 */

/**
 * @swagger
 * /api/pedidos/{id}:
 *   get:
 *     summary: Buscar um pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Dados do pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigoPEDIDOCOMPRA:
 *                   type: integer
 *                 usuarioPEDIDOCOMPRA:
 *                   type: integer
 *                 statusPEDIDOCOMPRA:
 *                   type: integer
 *                 dataPEDIDOCOMPRA:
 *                   type: string
 *                   format: date-time
 *                 fornecedorPEDIDOCOMPRA:
 *                   type: integer
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pedido não encontrado"
 *       500:
 *         description: Erro ao buscar pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar pedido"
 */

/**
 * @swagger
 * /api/pedidos/{id}:
 *   put:
 *     summary: Atualizar um pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statusPEDIDOCOMPRA:
 *                 type: integer
 *                 description: Status do pedido
 *               liquidoPEDIDOCOMPRA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor líquido do pedido
 *             example:
 *               statusPEDIDOCOMPRA: 2
 *               liquidoPEDIDOCOMPRA: 2000.00
 *     responses:
 *       200:
 *         description: Pedido atualizado com sucesso
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
 *                   example: Pedido atualizado com sucesso!
 *                 pedido:
 *                   type: object
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pedido não encontrado"
 *       500:
 *         description: Erro ao atualizar pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar pedido"
 */

/**
 * @swagger
 * /api/pedidos/{id}:
 *   delete:
 *     summary: Deletar um pedido por ID
 *     tags: [Pedidos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
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
 *                   example: Pedido deletado com sucesso!
 *       404:
 *         description: Pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Pedido não encontrado"
 *       500:
 *         description: Erro ao deletar pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao deletar pedido"
 */

// Criar um pedido
router.post("/", login.required, pedidosController.create);

// Buscar todos os pedidos
router.get("/", login.required, pedidosController.findAll);

// Buscar um pedido por ID
router.get("/:id", login.required, pedidosController.findOne);

// Atualizar um pedido
router.put("/:id", login.required, pedidosController.update);

// Deletar um pedido
router.delete("/:id", login.required, pedidosController.delete);

module.exports = router;
