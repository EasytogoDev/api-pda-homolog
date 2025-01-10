const express = require("express");
const router = express.Router();
const itensPedidosController = require("../controllers/itensPedidosController");
const login = require("../middleware/login"); // Middleware de autenticação

/**
 * @swagger
 * tags:
 *   name: ItensPedidos
 *   description: API para gerenciamento dos itens de pedidos
 */

/**
 * @swagger
 * /api/itens-pedidos:
 *   post:
 *     summary: Criar um novo item de pedido
 *     tags: [ItensPedidos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sistemaITEMPC:
 *                 type: integer
 *                 description: Sistema relacionado ao item
 *               pedidoITEMPC:
 *                 type: integer
 *                 description: Código do pedido relacionado ao item
 *               produtoITEMPC:
 *                 type: integer
 *                 description: Código do produto relacionado ao item
 *               quantidadeITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Quantidade do item no pedido
 *               finalidadeITEMPC:
 *                 type: integer
 *                 description: Finalidade do item
 *               moedaITEMPC:
 *                 type: integer
 *                 description: Moeda utilizada no item
 *               pesoITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Peso do item
 *               liquidoITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Valor líquido do item
 *               despesasITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Despesas associadas ao item
 *               taxasiscomexITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Taxas Siscomex do item
 *               valoripiITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Valor do IPI do item
 *               iiITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Valor do II do item
 *               valoricmsITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Valor do ICMS do item
 *               statusITEMPC:
 *                 type: integer
 *                 description: Status do item
 *               observacaoITEMPC:
 *                 type: string
 *                 description: Observações sobre o item
 *               tipodocorigemITEMPC:
 *                 type: integer
 *                 description: Tipo do documento de origem
 *               docorigemITEMPC:
 *                 type: integer
 *                 description: Documento de origem
 *               dataITEMPC:
 *                 type: string
 *                 format: date-time
 *                 description: Data do item
 *               prazoITEMPC:
 *                 type: string
 *                 format: date-time
 *                 description: Prazo do item
 *               loteITEMPC:
 *                 type: integer
 *                 description: Lote associado ao item
 *               nomeLoteITEMPC:
 *                 type: string
 *                 description: Nome do lote do item
 *               certificadoLoteITEMPC:
 *                 type: string
 *                 description: Certificado do lote do item
 *               validadeLoteITEMPC:
 *                 type: string
 *                 format: date-time
 *                 description: Validade do lote
 *               armazemITEMPC:
 *                 type: integer
 *                 description: Armazém relacionado ao item
 *               pacoteITEMPC:
 *                 type: integer
 *                 description: Pacote associado ao item
 *               rfiITEMPC:
 *                 type: integer
 *                 description: RFI relacionado ao item
 *               cfopITEMPC:
 *                 type: integer
 *                 description: CFOP do item
 *               percentualimportadoITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Percentual de importação
 *               descontoITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Desconto do item
 *               valorfreteITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Valor do frete
 *               origemITEMPC:
 *                 type: integer
 *                 description: Origem do item
 *               valorimportadoITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Valor importado
 *               icmsstITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: ICMS ST do item
 *               xmlITEMPC:
 *                 type: string
 *                 description: XML do item
 *               fciITEMPC:
 *                 type: string
 *                 description: FCI do item
 *               numeroAdicaoITEMPC:
 *                 type: integer
 *                 description: Número de adição
 *               incidenciatipoITEMPC:
 *                 type: string
 *                 description: Tipo de incidência
 *               numeroAdicaoDIITEMPC:
 *                 type: integer
 *                 description: Número de adição DI
 *               numeroSequenciaDIITEMPC:
 *                 type: integer
 *                 description: Número de sequência DI
 *               impressoloteITEMPC:
 *                 type: boolean
 *                 description: Indica se o lote foi impresso
 *               basecalculofciITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Base de cálculo FCI
 *               pesobrutoITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Peso bruto do item
 *               datafabricacaoITEMPC:
 *                 type: string
 *                 format: date-time
 *                 description: Data de fabricação do item
 *               destinoITEMPC:
 *                 type: integer
 *                 description: Destino do item
 *               centrodecustoITEMPC:
 *                 type: integer
 *                 description: Centro de custo do item
 *               verbaLocadaITEMPC:
 *                 type: integer
 *                 description: Verba locada do item
 *               statusmailITEMPC:
 *                 type: integer
 *                 description: Status do e-mail do item
 *               itemITEMPC:
 *                 type: integer
 *                 description: Código do item
 *             example:
 *               sistemaITEMPC: 1
 *               pedidoITEMPC: 123
 *               produtoITEMPC: 456
 *               quantidadeITEMPC: 10.5
 *               finalidadeITEMPC: 2
 *               moedaITEMPC: 1
 *               pesoITEMPC: 50.1234
 *               liquidoITEMPC: 500.00
 *               despesasITEMPC: 20.00
 *               taxasiscomexITEMPC: 5.00
 *               valoripiITEMPC: 15.00
 *               iiITEMPC: 25.00
 *               valoricmsITEMPC: 10.123456
 *               statusITEMPC: 1
 *               observacaoITEMPC: "Item relacionado ao pedido principal"
 *               tipodocorigemITEMPC: 1
 *               docorigemITEMPC: 12345
 *               dataITEMPC: "2024-12-20T12:00:00Z"
 *               prazoITEMPC: "2024-12-31T12:00:00Z"
 *               loteITEMPC: 101
 *               nomeLoteITEMPC: "Lote A"
 *               certificadoLoteITEMPC: "Cert-12345"
 *               validadeLoteITEMPC: "2025-01-01T12:00:00Z"
 *               armazemITEMPC: 5
 *               pacoteITEMPC: 20
 *               rfiITEMPC: 10
 *               cfopITEMPC: 5102
 *               percentualimportadoITEMPC: 50.00
 *               descontoITEMPC: 5.123456
 *               valorfreteITEMPC: 50.00
 *               origemITEMPC: 1
 *               valorimportadoITEMPC: 1000.00
 *               icmsstITEMPC: 25.00
 *               xmlITEMPC: "<xml></xml>"
 *               fciITEMPC: "ABC123456"
 *               numeroAdicaoITEMPC: 1
 *               incidenciatipoITEMPC: "Importação"
 *               numeroAdicaoDIITEMPC: 2
 *               numeroSequenciaDIITEMPC: 3
 *               impressoloteITEMPC: true
 *               basecalculofciITEMPC: 100.123456
 *               pesobrutoITEMPC: 60.1234
 *               datafabricacaoITEMPC: "2024-12-01T12:00:00Z"
 *               destinoITEMPC: 1
 *               centrodecustoITEMPC: 123
 *               verbaLocadaITEMPC: 456
 *               statusmailITEMPC: 1
 *               itemITEMPC: 789
 *     responses:
 *       201:
 *         description: Item de pedido criado com sucesso
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
 *                   example: "Item de pedido criado com sucesso!"
 *                 itemPedido:
 *                   type: object
 *       500:
 *         description: Erro ao criar item de pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao criar item de pedido"
 */

/**
 * @swagger
 * /api/itens-pedidos:
 *   get:
 *     summary: Buscar todos os itens de pedidos
 *     tags: [ItensPedidos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de itens de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigoITEMPC:
 *                     type: integer
 *                   sistemaITEMPC:
 *                     type: integer
 *                   pedidoITEMPC:
 *                     type: integer
 *                   produtoITEMPC:
 *                     type: integer
 *                   quantidadeITEMPC:
 *                     type: number
 *                     format: decimal
 *                   pesoITEMPC:
 *                     type: number
 *                     format: decimal
 *                   liquidoITEMPC:
 *                     type: number
 *                     format: decimal
 *                   observacaoITEMPC:
 *                     type: string
 *                   statusITEMPC:
 *                     type: integer
 *       500:
 *         description: Erro ao buscar itens de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar itens de pedidos"
 */

/**
 * @swagger
 * /api/itens-pedidos/{id}:
 *   get:
 *     summary: Buscar um item de pedido por ID
 *     tags: [ItensPedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de pedido
 *     responses:
 *       200:
 *         description: Dados do item de pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 codigoITEMPC:
 *                   type: integer
 *                 pedidoITEMPC:
 *                   type: integer
 *                 produtoITEMPC:
 *                   type: integer
 *                 quantidadeITEMPC:
 *                   type: number
 *                   format: decimal
 *                 liquidoITEMPC:
 *                   type: number
 *                   format: decimal
 *                 observacaoITEMPC:
 *                   type: string
 *                 statusITEMPC:
 *                   type: integer
 *       404:
 *         description: Item de pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item de pedido não encontrado"
 *       500:
 *         description: Erro ao buscar item de pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao buscar item de pedido"
 */

/**
 * @swagger
 * /api/itens-pedidos/{id}:
 *   put:
 *     summary: Atualizar um item de pedido por ID
 *     tags: [ItensPedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantidadeITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Quantidade atualizada do item
 *               liquidoITEMPC:
 *                 type: number
 *                 format: decimal
 *                 description: Valor líquido atualizado do item
 *               statusITEMPC:
 *                 type: integer
 *                 description: Status atualizado do item
 *             example:
 *               quantidadeITEMPC: 20.0
 *               liquidoITEMPC: 1000.00
 *               statusITEMPC: 2
 *     responses:
 *       200:
 *         description: Item de pedido atualizado com sucesso
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
 *                   example: "Item de pedido atualizado com sucesso!"
 *                 itemPedido:
 *                   type: object
 *       404:
 *         description: Item de pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item de pedido não encontrado"
 *       500:
 *         description: Erro ao atualizar item de pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao atualizar item de pedido"
 */

/**
 * @swagger
 * /api/itens-pedidos/{id}:
 *   delete:
 *     summary: Deletar um item de pedido por ID
 *     tags: [ItensPedidos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID do item de pedido
 *     responses:
 *       200:
 *         description: Item de pedido deletado com sucesso
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
 *                   example: "Item de pedido deletado com sucesso!"
 *       404:
 *         description: Item de pedido não encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Item de pedido não encontrado"
 *       500:
 *         description: Erro ao deletar item de pedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Erro ao deletar item de pedido"
 */

// Criar um novo item de pedido
router.post("/", login.required, itensPedidosController.create);

// Buscar todos os itens de pedidos
router.get("/", login.required, itensPedidosController.findAll);

// Buscar um item de pedido por ID
router.get("/:id", login.required, itensPedidosController.findOne);

// Atualizar um item de pedido por ID
router.put("/:id", login.required, itensPedidosController.update);

// Deletar um item de pedido por ID
router.delete("/:id", login.required, itensPedidosController.delete);

module.exports = router;
