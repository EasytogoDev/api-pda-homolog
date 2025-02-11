const express = require("express");
const router = express.Router();
const itensPropostaController = require("../controllers/itensPropostasController");
const login = require("../middleware/login"); // Middleware de autenticação

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
 *                 description: ID da proposta.
 *                 example: 1001
 *               produtoITEMPROPOSTA:
 *                 type: integer
 *                 description: ID do produto.
 *                 example: 501
 *               quantidadeITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Quantidade do item.
 *                 example: 10
 *               valorITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor do item.
 *                 example: 150.00
 *               finalidadeITEMPROPOSTA:
 *                 type: integer
 *                 description: Finalidade do item.
 *                 example: 1
 *               statusITEMPROPOSTA:
 *                 type: integer
 *                 description: Status do item.
 *                 example: 2
 *               brutoITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor bruto do item.
 *                 example: 200.00
 *               liquidototalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor líquido total do item.
 *                 example: 1500.00
 *               brutototalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor bruto total do item.
 *                 example: 1800.00
 *               basecalculoicmsITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo ICMS do item.
 *                 example: 100.00
 *               basecalculoicmstotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo total ICMS do item.
 *                 example: 200.00
 *               basecalculoicmsstITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo ICMS ST do item.
 *                 example: 150.00
 *               basecalculofcpsttotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo FCP ST total do item.
 *                 example: 50.00
 *               basecalculofcptotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo FCP total do item.
 *                 example: 75.00
 *     responses:
 *       201:
 *         description: Item de proposta criado com sucesso.
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
 *         description: Erro ao criar item de proposta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erro ao criar item de proposta"
 *                 error:
 *                   type: string
 *                   example: "Mensagem de erro detalhada"
 */

/**
 * @swagger
 * /api/itens-propostas/{id}:
 *   get:
 *     summary: Buscar itens de proposta por ID da proposta
 *     description: Retorna todos os itens de uma proposta com status 3.
 *     tags: [ItensProposta]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID da proposta.
 *     responses:
 *       200:
 *         description: Itens de proposta encontrados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 itemProposta:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       codigoITEMPROPOSTA:
 *                         type: integer
 *                         example: 1
 *                       propostaITEMPROPOSTA:
 *                         type: integer
 *                         example: 1001
 *                       produtoITEMPROPOSTA:
 *                         type: integer
 *                         example: 501
 *                       quantidadeITEMPROPOSTA:
 *                         type: number
 *                         format: decimal
 *                         example: 10
 *                       valorITEMPROPOSTA:
 *                         type: number
 *                         format: decimal
 *                         example: 150.00
 *                       statusITEMPROPOSTA:
 *                         type: integer
 *                         example: 3
 *       404:
 *         description: Nenhum item de proposta encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Item de proposta não encontrado"
 *       500:
 *         description: Erro ao buscar itens de proposta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erro ao buscar item de proposta"
 *                 error:
 *                   type: string
 *                   example: "Mensagem de erro detalhada"
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
 *         description: ID do item de proposta.
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
 *                 description: Quantidade do item.
 *                 example: 15
 *               valorITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor do item.
 *                 example: 250.00
 *               statusITEMPROPOSTA:
 *                 type: integer
 *                 description: Status do item.
 *                 example: 3
 *               brutoITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor bruto do item.
 *                 example: 200.00
 *               liquidototalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor líquido total do item.
 *                 example: 1500.00
 *               brutototalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Valor bruto total do item.
 *                 example: 1800.00
 *               basecalculoicmsITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo ICMS do item.
 *                 example: 100.00
 *               basecalculoicmstotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo total ICMS do item.
 *                 example: 200.00
 *               basecalculoicmsstITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo ICMS ST do item.
 *                 example: 150.00
 *               basecalculofcpsttotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo FCP ST total do item.
 *                 example: 50.00
 *               basecalculofcptotalITEMPROPOSTA:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo FCP total do item.
 *                 example: 75.00
 *     responses:
 *       200:
 *         description: Item de proposta atualizado com sucesso.
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
 *         description: Item de proposta não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Item de proposta não encontrado"
 *       500:
 *         description: Erro ao atualizar item de proposta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erro ao atualizar item de proposta"
 *                 error:
 *                   type: string
 *                   example: "Mensagem de erro detalhada"
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
 *         description: ID do item de proposta.
 *     responses:
 *       200:
 *         description: Item de proposta deletado com sucesso.
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
 *         description: Item de proposta não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Item de proposta não encontrado"
 *       500:
 *         description: Erro ao deletar item de proposta.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Erro ao deletar item de proposta"
 *                 error:
 *                   type: string
 *                   example: "Mensagem de erro detalhada"
 */

// Criar um novo item de proposta
router.post("/", login.required, itensPropostaController.create);

// Buscar itens de proposta por ID da proposta
router.get("/:id", login.required, itensPropostaController.findOne);

// Atualizar um item de proposta por ID
router.put("/:id", login.required, itensPropostaController.update);

// Deletar um item de proposta por ID
router.delete("/:id", login.required, itensPropostaController.delete);

module.exports = router;