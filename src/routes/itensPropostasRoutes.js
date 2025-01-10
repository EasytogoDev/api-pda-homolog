const express = require("express");
const router = express.Router();
const itensPropostaController = require("../controllers/itensPropostasController");
const login = require("../middleware/login"); // Presumindo que você tenha um middleware de autenticação

/**
 * @swagger
 * tags:
 *   name: ItensProposta
 *   description: API para gerenciamento de itens de proposta
 */

/**
 * @swagger
 * /api/itens-propostas:
 *   post:
 *     summary: Criar um novo item de proposta
 *     tags: [ItensProposta]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propostaITEMPROPOSTA:
 *                 type: integer
 *                 description: ID da proposta
 *               produtoITEMPROPOSTA:
 *                 type: integer
 *                 description: ID do produto
 *               quantidadeITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Quantidade do item
 *               valorITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor do item
 *               finalidadeITEMPROPOSTA:
 *                 type: integer
 *                 description: Finalidade do item
 *               statusITEMPROPOSTA:
 *                 type: integer
 *                 description: Status do item
 *               brutoITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor bruto do item
 *               liquidototalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor líquido total do item
 *               brutototalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor bruto total do item
 *               basecalculoicmsITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo ICMS do item
 *               basecalculoicmstotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo total ICMS do item
 *               basecalculoicmsstITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo ICMS ST do item
 *               basecalculofcpsttotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo FCP ST total do item
 *               basecalculofcptotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo FCP total do item
 *             example:
 *               propostaITEMPROPOSTA: 1001
 *               produtoITEMPROPOSTA: 501
 *               quantidadeITEMPROPOSTA: 10
 *               valorITEMPROPOSTA: 150.00
 *               finalidadeITEMPROPOSTA: 1
 *               statusITEMPROPOSTA: 2
 *               brutoITEMPROPOSTA: 200.00
 *               liquidototalITEMPROPOSTA: 1500.00
 *               brutototalITEMPROPOSTA: 1800.00
 *               basecalculoicmsITEMPROPOSTA: 100.00
 *               basecalculoicmstotalITEMPROPOSTA: 200.00
 *               basecalculoicmsstITEMPROPOSTA: 150.00
 *               basecalculofcpsttotalITEMPROPOSTA: 50.00
 *               basecalculofcptotalITEMPROPOSTA: 75.00
 *     responses:
 *       201:
 *         description: Item de proposta criado com sucesso
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
 *                   example: "Item de proposta criado com sucesso!"
 *                 itemProposta:
 *                   type: object
 *       500:
 *         description: Erro ao criar item de proposta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar item de proposta"
 */

/**
 * @swagger
 * /api/itens-propostas:
 *   get:
 *     summary: Buscar todos os itens de proposta
 *     tags: [ItensProposta]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de itens de proposta
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigoITEMPROPOSTA:
 *                     type: integer
 *                   propostaITEMPROPOSTA:
 *                     type: integer
 *                   produtoITEMPROPOSTA:
 *                     type: integer
 *                   quantidadeITEMPROPOSTA:
 *                     type: number
 *                     format: decimal
 *                   valorITEMPROPOSTA:
 *                     type: number
 *                     format: decimal
 *                   brutoITEMPROPOSTA:
 *                     type: number
 *                     format: decimal
 *                   statusITEMPROPOSTA:
 *                     type: integer
 *                   basecalculoicmsITEMPROPOSTA:
 *                     type: number
 *                     format: decimal
 *                   basecalculoicmstotalITEMPROPOSTA:
 *                     type: number
 *                     format: decimal
 *                   basecalculoicmsstITEMPROPOSTA:
 *                     type: number
 *                     format: decimal
 *                   basecalculofcpsttotalITEMPROPOSTA:
 *                     type: number
 *                     format: decimal
 *                   basecalculofcptotalITEMPROPOSTA:
 *                     type: number
 *                     format: decimal
 *       500:
 *         description: Erro ao buscar itens de proposta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar itens de proposta"
 */

/**
 * @swagger
 * /api/itens-propostas/{id}:
 *   get:
 *     summary: Buscar um item de proposta por ID
 *     tags: [ItensProposta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de proposta
 *     responses:
 *       200:
 *         description: Dados do item de proposta encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigoITEMPROPOSTA:
 *                   type: integer
 *                 propostaITEMPROPOSTA:
 *                   type: integer
 *                 produtoITEMPROPOSTA:
 *                   type: integer
 *                 quantidadeITEMPROPOSTA:
 *                   type: number
 *                   format: decimal
 *                 valorITEMPROPOSTA:
 *                   type: number
 *                   format: decimal
 *                 brutoITEMPROPOSTA:
 *                   type: number
 *                   format: decimal
 *                 statusITEMPROPOSTA:
 *                   type: integer
 *                 basecalculoicmsITEMPROPOSTA:
 *                   type: number
 *                   format: decimal
 *                 basecalculoicmstotalITEMPROPOSTA:
 *                   type: number
 *                   format: decimal
 *                 basecalculoicmsstITEMPROPOSTA:
 *                   type: number
 *                   format: decimal
 *                 basecalculofcpsttotalITEMPROPOSTA:
 *                   type: number
 *                   format: decimal
 *                 basecalculofcptotalITEMPROPOSTA:
 *                   type: number
 *                   format: decimal
 *       404:
 *         description: Item de proposta não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item de proposta não encontrado"
 *       500:
 *         description: Erro ao buscar item de proposta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar item de proposta"
 */

/**
 * @swagger
 * /api/itens-propostas/{id}:
 *   put:
 *     summary: Atualizar um item de proposta por ID
 *     tags: [ItensProposta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de proposta
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidadeITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Quantidade do item
 *               valorITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor do item
 *               statusITEMPROPOSTA:
 *                 type: integer
 *                 description: Status atualizado do item
 *               basecalculoicmsITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo ICMS do item
 *               basecalculoicmstotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo total ICMS do item
 *               basecalculoicmsstITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo ICMS ST do item
 *               basecalculofcpsttotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo FCP ST total do item
 *               basecalculofcptotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo FCP total do item
 *             example:
 *               quantidadeITEMPROPOSTA: 15
 *               valorITEMPROPOSTA: 250.00
 *               statusITEMPROPOSTA: 3
 *               basecalculoicmsITEMPROPOSTA: 100.00
 *               basecalculoicmstotalITEMPROPOSTA: 200.00
 *               basecalculoicmsstITEMPROPOSTA: 150.00
 *               basecalculofcpsttotalITEMPROPOSTA: 50.00
 *               basecalculofcptotalITEMPROPOSTA: 75.00
 *     responses:
 *       200:
 *         description: Item de proposta atualizado com sucesso
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
 *                   example: "Item de proposta atualizado com sucesso!"
 *                 itemProposta:
 *                   type: object
 *       404:
 *         description: Item de proposta não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item de proposta não encontrado"
 *       500:
 *         description: Erro ao atualizar item de proposta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar item de proposta"
 */

/**
 * @swagger
 * /api/itens-propostas/{id}:
 *   delete:
 *     summary: Deletar um item de proposta por ID
 *     tags: [ItensProposta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de proposta
 *     responses:
 *       200:
 *         description: Item de proposta deletado com sucesso
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
 *                   example: "Item de proposta deletado com sucesso!"
 *       404:
 *         description: Item de proposta não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item de proposta não encontrado"
 *       500:
 *         description: Erro ao deletar item de proposta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao deletar item de proposta"
 */


// Criar um novo item de proposta
router.post("/", login.required, itensPropostaController.create);

// Buscar todos os itens de proposta
router.get("/", login.required, itensPropostaController.findAll);

// Buscar um item de proposta por ID
router.get("/:id", login.required, itensPropostaController.findOne);

// Atualizar um item de proposta por ID
router.put("/:id", login.required, itensPropostaController.update);

// Deletar um item de proposta por ID
router.delete("/:id", login.required, itensPropostaController.delete);

module.exports = router;
