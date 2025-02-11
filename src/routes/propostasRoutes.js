const express = require("express");
const router = express.Router();
const propostasControllers = require("../controllers/propostasControllers");
const login = require("../middleware/login"); // Middleware de autenticação

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
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               clientePROPOSTA:
 *                 type: integer
 *                 description: ID do cliente
 *               liquidoPROPOSTA:
 *                 type: number
 *                 description: Valor líquido da proposta
 *               descricao:
 *                 type: string
 *                 description: Descrição da proposta
 *             example:
 *               clientePROPOSTA: 1
 *               liquidoPROPOSTA: 5000.00
 *               descricao: "Proposta de serviços de TI"
 *     responses:
 *       201:
 *         description: Proposta criada com sucesso
 *       500:
 *         description: Erro ao criar proposta
 */
router.post("/create", login.required, propostasControllers.create);

/**
 * @swagger
 * /api/propostas/all:
 *   get:
 *     summary: Buscar todas as propostas ativas
 *     tags: [Propostas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Limite de registros retornados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         required: false
 *         description: Quantidade de registros a serem ignorados
 *     responses:
 *       200:
 *         description: Lista de propostas ativas retornadas
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
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da proposta
 *     responses:
 *       200:
 *         description: Proposta encontrada
 *       404:
 *         description: Proposta não encontrada
 *       500:
 *         description: Erro ao buscar proposta
 */
router.get("/get/:id", login.required, propostasControllers.findOne);

/**
 * @swagger
 * /api/propostas/edit/{id}:
 *   put:
 *     summary: Atualizar uma proposta por ID
 *     tags: [Propostas]
 *     security:
 *       - bearerAuth: []
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
 *               liquidoPROPOSTA:
 *                 type: number
 *                 description: Novo valor líquido
 *               descricao:
 *                 type: string
 *                 description: Descrição atualizada
 *             example:
 *               liquidoPROPOSTA: 6000.00
 *               descricao: "Proposta atualizada"
 *     responses:
 *       200:
 *         description: Proposta atualizada com sucesso
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
 *     security:
 *       - bearerAuth: []
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
 *     summary: Obter propostas agrupadas com valores agregados
 *     tags: [Propostas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Sucesso ao buscar propostas agrupadas
 *       500:
 *         description: Erro no servidor
 */
router.get("/grouped", login.required, propostasControllers.getPropostasGrouped);

module.exports = router;
