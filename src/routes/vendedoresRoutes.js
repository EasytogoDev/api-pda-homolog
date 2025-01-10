const express = require("express");
const router = express.Router();
const vendedoresControllers = require("../controllers/vendedoresControllers");
const login = require("../middleware/login"); // Middleware de autenticação

/**
 * @swagger
 * /api/vendedores:
 *   get:
 *     summary: Retorna os vendedores associados ao usuário autenticado
 *     tags: [Vendedores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de vendedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: integer
 *                     description: ID do vendedor
 *                   nome:
 *                     type: string
 *                     description: Nome do vendedor
 *                   dataCriacao:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação do vendedor
 *                   observacao:
 *                     type: string
 *                     description: Observações sobre o vendedor
 *                   empresa:
 *                     type: integer
 *                     description: Empresa associada ao vendedor
 *                   gerente:
 *                     type: integer
 *                     description: Gerente do vendedor
 *                   irrf:
 *                     type: number
 *                     format: decimal
 *                     description: Valor de IRRF do vendedor
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */

router.get("/", login.required, vendedoresControllers.getVendedores);

/**
 * @swagger
 * /api/vendedores/gerente:
 *   get:
 *     summary: Retorna os vendedores do usuário autenticado que é gerente
 *     tags: [Vendedores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Retorna Lista de Vendedores abaixo da posição da pessoa Logada
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: integer
 *                     description: ID do vendedor
 *                   nome:
 *                     type: string
 *                     description: Nome do vendedor
 *                   dataCriacao:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação do vendedor
 *                   observacao:
 *                     type: string
 *                     description: Observações sobre o vendedor
 *                   empresa:
 *                     type: integer
 *                     description: Empresa associada ao vendedor
 *                   gerente:
 *                     type: integer
 *                     description: Gerente do vendedor
 *                   irrf:
 *                     type: number
 *                     format: decimal
 *                     description: Valor de IRRF do vendedor
 *       401:
 *         description: Não autorizado
 *       500:
 *         description: Erro no servidor
 */

router.get("/gerente", login.required, vendedoresControllers.getGerentes);

module.exports = router;
