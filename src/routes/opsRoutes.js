const express = require("express");
const router = express.Router();
const opsController = require("../controllers/opsController");
const login = require("../middleware/login"); // Middleware de autenticação

/**
 * @swagger
 * /api/ops/:
 *   get:
 *     summary: Obter dados de produção com paginação
 *     description: Retorna os dados de produção com detalhes específicos, com suporte a paginação e filtros opcionais.
 *     tags:
 *       - Produção
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de registros a serem retornados.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de registros a serem pulados antes de iniciar a listagem.
 *       - in: query
 *         name: status
 *         schema:
 *           type: integer
 *         description: Status da produção (1 = Gerada, 2 = Produzindo, 3 = Encerrada). Parâmetro opcional.
 *       - in: query
 *         name: wms
 *         schema:
 *           type: integer
 *         description: Indicador WMS da produção. Parâmetro opcional.
 *     responses:
 *       '200':
 *         description: Dados de produção retornados com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   OP:
 *                     type: integer
 *                     description: Código de produção.
 *                     example: 12345
 *                   SKU:
 *                     type: string
 *                     description: Código do produto (SKU).
 *                     example: "ABC123"
 *                   Observacao:
 *                     type: string
 *                     description: Observação da produção.
 *                     example: "Produção urgente"
 *                   Quantidade:
 *                     type: integer
 *                     description: Quantidade a ser produzida.
 *                     example: 100
 *                   QuantidadeFinal:
 *                     type: integer
 *                     description: Quantidade final produzida.
 *                     example: 95
 *                   DataCriacao:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação da produção.
 *                     example: "2024-01-01T00:00:00.000Z"
 *                   DataInicio:
 *                     type: string
 *                     format: date-time
 *                     description: Data de início da produção.
 *                     example: "2024-01-02T08:00:00.000Z"
 *                   DataFinal:
 *                     type: string
 *                     format: date-time
 *                     description: Data final da produção.
 *                     example: "2024-01-05T17:00:00.000Z"
 *                   Status:
 *                     type: integer
 *                     description: Status da produção (1 = Gerada, 2 = Produzindo, 3 = Encerrada).
 *                     example: 2
 *                   WMS:
 *                     type: integer
 *                     description: Indicador WMS da produção.
 *                     example: 1
 *       '400':
 *         description: Parâmetros inválidos fornecidos.
 *       '401':
 *         description: Falha na autenticação (Token inválido ou ausente).
 *       '500':
 *         description: Erro interno do servidor.
 *
 * /api/ops/alterar-status/{codigo}:
 *   post:
 *     summary: Alterar status do WMS para 1
 *     description: Atualiza o status do WMS da OP para 1, se aplicável, e retorna mensagens específicas dependendo do estado atual.
 *     tags:
 *       - Produção
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: codigo
 *         required: true
 *         schema:
 *           type: integer
 *         description: Código da produção a ser atualizada.
 *     responses:
 *       '200':
 *         description: Status alterado com sucesso ou mensagem específica do estado atual da OP.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   description: Indica se a alteração foi bem-sucedida.
 *                   example: true
 *                 mensagem:
 *                   type: string
 *                   description: Mensagem sobre o estado da OP.
 *                   example: "OP 12345 processado no estoque!"
 *       '500':
 *         description: Erro interno do servidor.
 */

router.get("/", opsController.getProducaoData);
router.post("/alterar-status/:codigo", opsController.alterarStatusWMSPara1);

module.exports = router;
