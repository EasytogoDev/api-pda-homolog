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
 *     summary: Obtém dados paginados dos produtos com informações adicionais de embalagem e unidade de medida
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
 *         description: Dados paginados dos produtos
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
 *                   N:
 *                     type: string
 *                     description: Unidade de medida do produto
 *                   PASTA:
 *                     type: string
 *                     description: Nome da pasta associada ao produto
 *                   GTINS:
 *                     type: array
 *                     description: Lista de informações das embalagens relacionadas ao produto
 *                     items:
 *                       type: object
 *                       properties:
 *                         EMBALAGEM:
 *                           type: string
 *                           description: Nome da embalagem
 *                         GTIN:
 *                           type: string
 *                           description: Código GTIN da embalagem
 *                         QUANTIDADE:
 *                           type: number
 *                           description: Quantidade de produtos na embalagem
 *                         UNIDADE:
 *                           type: string
 *                           description: Unidade de medida da embalagem
 *                         PADRAO:
 *                           type: boolean
 *                           description: Indica se a embalagem é a padrão
 *       500:
 *         description: Erro ao buscar dados dos produtos
 */

/**
 * @swagger
 * /api/produtos/{produto}:
 *   get:
 *     summary: Obtém os dados de um produto específico pelo SKU
 *     tags: [Produtos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: produto
 *         required: true
 *         schema:
 *           type: string
 *         description: SKU do produto a ser buscado
 *     responses:
 *       200:
 *         description: Dados do produto solicitado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigo:
 *                   type: integer
 *                   description: Código do produto
 *                 sku:
 *                   type: string
 *                   description: Código SKU do produto
 *                 Descricao:
 *                   type: string
 *                   description: Descrição do produto
 *                 Altura:
 *                   type: number
 *                   description: Altura do produto
 *                 Largura:
 *                   type: number
 *                   description: Largura do produto
 *                 Comprimento:
 *                   type: number
 *                   description: Comprimento do produto
 *                 Peso:
 *                   type: number
 *                   description: Peso bruto do produto
 *                 Barras:
 *                   type: string
 *                   description: Código de barras do produto
 *                 N:
 *                   type: string
 *                   description: Unidade de medida do produto
 *                 PASTA:
 *                   type: string
 *                   description: Nome da pasta associada ao produto
 *                 GTINS:
 *                   type: array
 *                   description: Lista de informações das embalagens relacionadas ao produto
 *                   items:
 *                     type: object
 *                     properties:
 *                       EMBALAGEM:
 *                         type: string
 *                         description: Nome da embalagem
 *                       GTIN:
 *                         type: string
 *                         description: Código GTIN da embalagem
 *                       QUANTIDADE:
 *                         type: number
 *                         description: Quantidade de produtos na embalagem
 *                       UNIDADE:
 *                         type: string
 *                         description: Unidade de medida da embalagem
 *                       PADRAO:
 *                         type: boolean
 *                         description: Indica se a embalagem é a padrão
 *       400:
 *         description: Parâmetro obrigatório 'produto' não fornecido
 *       500:
 *         description: Erro ao buscar dados do produto
 */

router.get("/", login.required, produtosController.getProdutoData);
router.get("/comparar", login.required, produtosController.compararProdutos);

router.get("/:produto", login.required, produtosController.getProdutoDataById);

module.exports = router;
