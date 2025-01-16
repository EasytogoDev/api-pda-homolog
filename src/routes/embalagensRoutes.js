const express = require("express");
const router = express.Router();
const Embalagens = require("../controllers/embalagensController");
const login = require("../middleware/login");

/**
 * @swagger
 * tags:
 *   name: Embalagens
 *   description: Operações embalagens
 */

/**
 * @swagger
 * /api/embalagens/buscar/{codigo}:
 *   get:
 *     summary: Busca informações de uma embalagem específica para a Ordem de Produção fornecida.
 *     tags:
 *       - Embalagens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código da Ordem de Produção.
 *     responses:
 *       200:
 *         description: Informações da embalagem retornadas com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       codigoPRODUCAO:
 *                         type: integer
 *                       codigoPRODUTO:
 *                         type: integer
 *                       partnumberPRODUTO:
 *                         type: string
 *                       codigobarrasEMBALAGEMPRODUTO:
 *                         type: string
 *                       quantidadeEMBALAGEMPRODUTO:
 *                         type: number
 *                       ean13PRODUTO:
 *                         type: string
 *                       nomeEMBALAGEM:
 *                         type: string
 *       404:
 *         description: Nenhuma embalagem encontrada para a Ordem de Produção fornecida.
 *       500:
 *         description: Erro interno do servidor.
 */
router.get("/buscar/:codigo", Embalagens.buscarEmbalagem);

/**
 * @swagger
 * /api/embalagens/atualizar/{codigo}:
 *   post:
 *     summary: Atualiza informações de uma embalagem específica.
 *     tags:
 *       - Embalagens
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: integer
 *         description: (PARTNUMBER).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidade:
 *                 type: number
 *                 description: Nova quantidade para a embalagem.
 *           example:
 *             quantidade: 50
 *     responses:
 *       200:
 *         description: Quantidade da embalagem atualizada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 resultItatiba:
 *                   type: object
 *                 resultSP:
 *                   type: object
 *       404:
 *         description: Produto não encontrado.
 *       500:
 *         description: Erro interno do servidor.
 */

router.post("/atualizar/:codigo", Embalagens.atualizarEmbalagem);

module.exports = router;
