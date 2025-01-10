const express = require("express");
const router = express.Router();
const produtosController = require("../controllers/produtosController");
const login = require("../middleware/login");

/**
 * @swagger
 * tags:
 *   name: Produtos
 *   description: Operações relacionadas aos produtos
 */

/**
 * @swagger
 * /api/produtos/:
 *   get:
 *     summary: Obtém dados dos produtos com informações adicionais de embalagem e unidade de medida
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de produtos a serem retornados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de produtos a pular antes de começar a retornar os resultados
 *     responses:
 *       200:
 *         description: Dados dos produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: integer
 *                     description: Código do produto
 *                   sku:
 *                     type: string
 *                     description: Código SKU do produto
 *                   Descricao:
 *                     type: string
 *                     description: Descrição do produto
 *                   Altura:
 *                     type: number
 *                     description: Altura do produto
 *                   Largura:
 *                     type: number
 *                     description: Largura do produto
 *                   Comprimento:
 *                     type: number
 *                     description: Comprimento do produto
 *                   Peso:
 *                     type: number
 *                     description: Peso bruto do produto
 *                   Barras:
 *                     type: string
 *                     description: Código de barras do produto
 *                   UN:
 *                     type: string
 *                     description: Unidade de medida do produto
 *                   PASTA:
 *                     type: string
 *                     description: Nome da pasta associada ao produto
 *       500:
 *         description: Erro ao buscar dados do produto
 */

router.get("/", login.required, produtosController.getProdutoData);

module.exports = router;
