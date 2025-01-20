const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");
const login = require("../middleware/login");

/**
 * @swagger
 * tags:
 *   name: Webhook
 *   description: Endpoints para processamento de vendas, compras e OP
 */

/**
 * @swagger
 * /api/retorno/vendas:
 *   post:
 *     summary: Processa uma proposta de vendas e seus itens
 *     description: Recebe informações de uma proposta de vendas, seus itens e os lotes associados, e executa uma procedure no SQL Server.
 *     tags: [Webhook]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proposta
 *               - statuswms
 *               - usuario
 *               - itens
 *               - volume
 *               - peso
 *             properties:
 *               proposta:
 *                 type: integer
 *                 description: Código da proposta.
 *                 example: 12345
 *               statuswms:
 *                 type: integer
 *                 description: Status do WMS (2 para liberado).
 *                 example: 2
 *               usuario:
 *                 type: integer
 *                 description: Código do usuário responsável.
 *                 example: 101
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - produtoItem
 *                     - statusItem
 *                     - lotes
 *                   properties:
 *                     produtoItem:
 *                       type: integer
 *                       description: Código do produto associado ao item.
 *                       example: 222
 *                     statusItem:
 *                       type: integer
 *                       description: Status do item no WMS.
 *                       example: 1
 *                     lotes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         required:
 *                           - lote
 *                           - quantidadeItem
 *                         properties:
 *                           lote:
 *                             type: string
 *                             description: Identificação do lote.
 *                             example: "LT-000001"
 *                           quantidadeItem:
 *                             type: integer
 *                             description: Quantidade do item no lote.
 *                             example: 5
 *               Volumes:
 *                 type: number
 *                 description: Volume total da proposta.
 *                 example: 10
 *               PesoTotalPedido:
 *                 type: number
 *                 description: Peso total da proposta.
 *                 example: 20.3
 *     responses:
 *       201:
 *         description: Proposta processada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Proposta processada com sucesso"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro ao processar a proposta."
 */

router.post("/vendas", login.required, webhookController.webhookVendas);

/**
 * @swagger
 * /api/retorno/compras:
 *   post:
 *     summary: Processa um pedido de compras e seus itens
 *     description: Recebe informações de um pedido de compras e seus itens para processar no sistema, retornando mensagens baseadas no status WMS.
 *     tags: [Webhook]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - wms
 *               - chavenf
 *               - itens
 *             properties:
 *               chavenf:
 *                 type: string
 *                 description: Chave da nota fiscal.
 *                 example: "35190712345678901234550010000000011000000000"
 *               wms:
 *                 type: integer
 *                 description: Status do WMS (2 - compra encerrada, 3 - divergência).
 *                 example: 2
 *               itens:
 *                 type: array
 *                 description: Lista de itens da compra.
 *                 items:
 *                   type: object
 *                   required:
 *                     - item
 *                     - numeroItem
 *                     - sku
 *                     - quantidade
 *                     - wms
 *                   properties:
 *                     item:
 *                       type: integer
 *                       description: Código do item.
 *                       example: 101
 *                     numeroItem:
 *                       type: integer
 *                       description: Número do item na lista.
 *                       example: 1
 *                     sku:
 *                       type: string
 *                       description: SKU do produto associado ao item.
 *                       example: "SKU123456"
 *                     quantidade:
 *                       type: integer
 *                       description: Quantidade do item na compra.
 *                       example: 10
 *                     wms:
 *                       type: integer
 *                       description: Status do item no WMS.
 *                       example: 2
 *     responses:
 *       201:
 *         description: Pedido processado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: object
 *                   description: Resultado do processamento.
 *                   properties:
 *                     chaveNF:
 *                       type: string
 *                       example: "35190712345678901234550010000000011000000000"
 *                     wms:
 *                       type: integer
 *                       example: 2
 *                     itens:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           item:
 *                             type: integer
 *                             example: 101
 *                           numeroItem:
 *                             type: integer
 *                             example: 1
 *                           sku:
 *                             type: string
 *                             example: "SKU123456"
 *                           quantidade:
 *                             type: integer
 *                             example: 10
 *                           wms:
 *                             type: integer
 *                             example: 2
 *                 message:
 *                   type: string
 *                   example: "Compra encerrada está ok!"
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro ao processar a compra."
 */

router.post("/compras", login.required, webhookController.webhookCompras);

/**
 * @swagger
 * /api/retorno/op:
 *   post:
 *     summary: Processa uma Ordem de Produção (OP)
 *     description: Recebe informações sobre uma OP e atualiza seu status ou registra divergências no sistema.
 *     tags: [Webhook]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - op
 *               - quantidadeColetada
 *               - wms
 *             properties:
 *               op:
 *                 type: integer
 *                 description: Código da Ordem de Produção.
 *                 example: 325052
 *               quantidadeColetada:
 *                 type: integer
 *                 description: Quantidade coletada na produção.
 *                 example: 90
 *               wms:
 *                 type: integer
 *                 description: Status do WMS.
 *                 example: 3
 *     responses:
 *       200:
 *         description: OP processada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                   example: "Produção encerrada"
 *                 updatedRows:
 *                   type: integer
 *                   example: 1
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro ao processar a OP."
 */
router.post("/op", login.required, webhookController.webhookOP);

module.exports = router;
