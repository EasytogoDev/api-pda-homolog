const express = require('express');
const router = express.Router();
const relatoriosVendasControllers = require('../controllers/relatoriosVendasControllers'); // Certifique-se de importar o controlador corretamente
const login = require('../middleware/login'); // Presumindo que você tenha um middleware de autenticação

/**
 * @swagger
 * components:
 *   schemas:
 *     Estado:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código do estado
 *         nome:
 *           type: string
 *           description: Nome do estado
 *     Linha:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código da linha de produto
 *         descricao:
 *           type: string
 *           description: Descrição da linha de produto
 *     Cliente:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código do cliente
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *     Produto:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *     Estatistica:
 *       type: object
 *       properties:
 *         totalVendas:
 *           type: number
 *           description: Total de vendas realizadas
 *         mediaVendas:
 *           type: number
 *           description: Média de vendas por cliente
 */

/**
 * @swagger
 * /api/relatorios/vendas/estados:
 *   get:
 *     summary: Retorna um relatório de vendas por estado
 *     tags: [Relatórios de Vendas]
 *     parameters:
 *       - in: query
 *         name: dataInicial
 *         schema:
 *           type: string
 *           format: date-time
 *           example: '2024-09-01 00:00:00.000'
 *         description: Data inicial para filtrar as vendas (formato YYYY-MM-DD HH:MM:SS.sss)
 *       - in: query
 *         name: dataFinal
 *         schema:
 *           type: string
 *           format: date-time
 *           example: '2024-09-30 23:59:59.000'
 *         description: Data final para filtrar as vendas (formato YYYY-MM-DD HH:MM:SS.sss)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 50
 *         description: Número máximo de registros a serem retornados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           example: 0
 *         description: Ponto de partida dos registros
 *     responses:
 *       200:
 *         description: Relatório de vendas por estado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ITEM:
 *                     type: string
 *                     description: Código do item vendido
 *                   nomePRODUTO:
 *                     type: string
 *                     description: Nome do produto
 *                   QNTD:
 *                     type: number
 *                     description: Quantidade vendida
 *                   UN:
 *                     type: string
 *                     description: Unidade de medida
 *                   EST:
 *                     type: string
 *                     description: Estado onde a venda foi realizada
 *                   Linha:
 *                     type: string
 *                     description: Linha do produto
 *                   Rank:
 *                     type: integer
 *                     description: Posição do item no ranking de vendas
 *       400:
 *         description: Erro de requisição. Usuário não definido no token.
 *       500:
 *         description: Erro no servidor.
 */


router.get('/estados', login.required, relatoriosVendasControllers.getVendasEstado);

/**
 * @swagger
 * /api/relatorios/vendas/linhas:
 *   get:
 *     summary: Retorna uma lista de linhas de produtos
 *     tags: [Relatórios de Vendas]
 *     responses:
 *       200:
 *         description: Lista de linhas de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Linha'
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/relatorios/vendas/clientes:
 *   get:
 *     summary: Retorna uma lista de clientes
 *     tags: [Relatórios de Vendas]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/relatorios/vendas/produtos:
 *   get:
 *     summary: Retorna uma lista de produtos
 *     tags: [Relatórios de Vendas]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/relatorios/vendas/estatisticas:
 *   get:
 *     summary: Retorna estatísticas de vendas
 *     tags: [Relatórios de Vendas]
 *     responses:
 *       200:
 *         description: Estatísticas de vendas
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estatistica'
 *       500:
 *         description: Erro no servidor
 */

module.exports = router;