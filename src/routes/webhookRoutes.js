const express = require("express");
const router = express.Router();
const webhookController = require("../controllers/webhookController");
const login = require("../middleware/login");

/**
 * @swagger
 * tags:
 *   name: Webhook
 *   description: Endpoints para processamento de vendas, compras, OP e divergências.
 */

/**
 * @swagger
 * /api/retorno/vendas:
 *   post:
 *     summary: Processa uma proposta de vendas e seus itens
 *     description: Recebe informações de uma proposta de vendas, seus itens e os lotes associados, cria registros temporários no banco de dados e executa uma procedure no SQL Server. Retorna divergências, se houver.
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
 *               - Volumes
 *               - PesoTotalPedido
 *               - quantidadeTotalSKU
 *               - quantidadeTotalItens
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
 *                 description: Lista de itens associados à proposta.
 *                 items:
 *                   type: object
 *                   required:
 *                     - produtoItem
 *                     - statusItem
 *                     - lotes
 *                     - codigoItem
 *                   properties:
 *                     produtoItem:
 *                       type: integer
 *                       description: Código do produto associado ao item.
 *                       example: 222
 *                     statusItem:
 *                       type: integer
 *                       description: Status do item no WMS.
 *                       example: 1
 *                     codigoItem:
 *                       type: integer
 *                       description: Código do item.
 *                       example: 1
 *                     lotes:
 *                       type: array
 *                       description: Lotes associados ao item.
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
 *               quantidadeTotalSKU:
 *                 type: integer
 *                 description: Quantidade total de SKUs na proposta.
 *                 example: 5
 *               quantidadeTotalItens:
 *                 type: integer
 *                 description: Quantidade total de itens na proposta.
 *                 example: 10
 *     responses:
 *       201:
 *         description: Proposta processada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ok:
 *                   type: string
 *                   description: Mensagem de sucesso ou divergência.
 *                   example: "Proposta recebida sem divergências"
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
 *     responses:
 *       201:
 *         description: Pedido processado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso ou divergência.
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
 *       201:
 *         description: OP processada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensagem de sucesso.
 *                   example: "OP encerrada com sucesso!"
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

/**
 * @swagger
 * /api/retorno/divergencia:
 *   post:
 *     summary: Processa divergências em uma proposta
 *     description: Recebe informações sobre divergências em uma proposta e retorna os dados recebidos.
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
 *               - quantidadeSKUDivergente
 *               - quantidadeItensDivergente
 *             properties:
 *               proposta:
 *                 type: integer
 *                 description: Código da proposta.
 *                 example: 12345
 *               quantidadeSKUDivergente:
 *                 type: integer
 *                 description: Quantidade de SKUs divergentes.
 *                 example: 2
 *               quantidadeItensDivergente:
 *                 type: integer
 *                 description: Quantidade de itens divergentes.
 *                 example: 5
 *     responses:
 *       200:
 *         description: Divergências processadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 proposta:
 *                   type: integer
 *                   example: 12345
 *                 quantidadeSKUDivergente:
 *                   type: integer
 *                   example: 2
 *                 quantidadeItensDivergente:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro ao processar divergências."
 */

router.post("/divergencia", login.required, webhookController.webhookDivergencia);


/**
 * @swagger
 * /api/retorno/separacao:
 *   post:
 *     summary: Processa Ordens de Produção de Separação
 *     description: Recebe Ordens de Separação ja separadas.
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
 *               - wms
 *             properties:
 *               op:
 *                 type: integer
 *                 description: Código da Ordem de Produção.
 *                 example: 12345
 *               wms:
 *                 type: integer
 *                 description: Retorno de status de Separação WMS.
 *                 example: 2
 *     responses:
 *       200:
 *         description: Divergências processadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 proposta:
 *                   type: integer
 *                   example: 12345
 *                 quantidadeSKUDivergente:
 *                   type: integer
 *                   example: 2
 *                 quantidadeItensDivergente:
 *                   type: integer
 *                   example: 5
 *       500:
 *         description: Erro interno do servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 erro:
 *                   type: string
 *                   example: "Erro ao processar divergências."
 */

router.post("/separacao", login.required, webhookController.webhookSEPARACAO);

module.exports = router;