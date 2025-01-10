const express = require("express");
const router = express.Router();
const Empresas = require("../controllers/empresasController");
const login = require("../middleware/login");

/**
 * @swagger
 * tags:
 *   name: Empresas
 *   description: Operações relacionadas às empresas, incluindo fornecedores, transportadoras e clientes
 */

/**
 * @swagger
 * /api/empresas/:
 *   get:
 *     summary: Obtém informações de empresas com detalhes de endereço, telefone e email
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de resultados a serem retornados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de resultados a pular antes de retornar a lista
 *     responses:
 *       200:
 *         description: Lista de empresas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigoEMPRESA:
 *                     type: integer
 *                     description: Código da empresa
 *                   nomeEMPRESA:
 *                     type: string
 *                     description: Nome da empresa
 *                   razaoEMPRESA:
 *                     type: string
 *                     description: Razão social da empresa
 *                   cnpjEMPRESA:
 *                     type: string
 *                     description: CNPJ da empresa
 *                   enderecos:
 *                     type: array
 *                     description: Lista de endereços associados à empresa
 *                     items:
 *                       type: object
 *                       properties:
 *                         logradouroENDERECO:
 *                           type: string
 *                           description: Logradouro do endereço
 *                         numeroENDERECO:
 *                           type: string
 *                           description: Número do endereço
 *                         cepENDERECO:
 *                           type: string
 *                           description: CEP do endereço
 *                         bairroENDERECO:
 *                           type: string
 *                           description: Bairro do endereço
 *                         estadoENDERECO:
 *                           type: string
 *                           description: Estado do endereço
 *                         paisENDERECO:
 *                           type: string
 *                           description: País do endereço
 *                         nomeCIDADE:
 *                           type: string
 *                           description: Nome da cidade
 *                   telefone:
 *                     type: array
 *                     description: Lista de telefones associados à empresa
 *                     items:
 *                       type: object
 *                       properties:
 *                         numeroTELEFONE:
 *                           type: string
 *                           description: Número de telefone
 *                         tipo_telefone:
 *                           type: string
 *                           description: Tipo de telefone
 *                   emails:
 *                     type: array
 *                     description: Lista de emails associados à empresa
 *                     items:
 *                       type: object
 *                       properties:
 *                         enderecoEMAIL:
 *                           type: string
 *                           description: Endereço de email
 *                         tipo_email:
 *                           type: string
 *                           description: Tipo de email
 *       500:
 *         description: Erro ao buscar dados das empresas
 */
router.get("/", login.required, Empresas.getAll);

/**
 * @swagger
 * /api/empresas/fornecedores:
 *   get:
 *     summary: Obtém todos os fornecedores
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de resultados a serem retornados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de resultados a pular antes de retornar a lista
 *     responses:
 *       200:
 *         description: Lista de fornecedores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: integer
 *                     description: Código da empresa
 *                   FANTASIA:
 *                     type: string
 *                     description: Nome fantasia da empresa
 *                   RAZAO:
 *                     type: string
 *                     description: Razão social da empresa
 *                   CNPJ:
 *                     type: string
 *                     description: CNPJ da empresa
 *                   PASTA:
 *                     type: integer
 *                     description: Código da pasta da empresa
 *                   DATA:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação da empresa
 *       500:
 *         description: Erro ao buscar dados dos fornecedores
 */
router.get("/fornecedores", login.required, Empresas.getFornecedores);

/**
 * @swagger
 * /api/empresas/transportadoras:
 *   get:
 *     summary: Obtém todas as transportadoras
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de resultados a serem retornados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de resultados a pular antes de retornar a lista
 *     responses:
 *       200:
 *         description: Lista de transportadoras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: integer
 *                     description: Código da empresa
 *                   FANTASIA:
 *                     type: string
 *                     description: Nome fantasia da empresa
 *                   RAZAO:
 *                     type: string
 *                     description: Razão social da empresa
 *                   CNPJ:
 *                     type: string
 *                     description: CNPJ da empresa
 *                   PASTA:
 *                     type: integer
 *                     description: Código da pasta da empresa
 *                   DATA:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação da empresa
 *       500:
 *         description: Erro ao buscar dados das transportadoras
 */
router.get("/transportadoras", login.required, Empresas.getTransportadoras);

/**
 * @swagger
 * /api/empresas/clientes:
 *   get:
 *     summary: Obtém todos os clientes
 *     tags: [Empresas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número máximo de resultados a serem retornados
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *           default: 0
 *         description: Número de resultados a pular antes de retornar a lista
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   codigo:
 *                     type: integer
 *                     description: Código da empresa
 *                   FANTASIA:
 *                     type: string
 *                     description: Nome fantasia da empresa
 *                   RAZAO:
 *                     type: string
 *                     description: Razão social da empresa
 *                   CNPJ:
 *                     type: string
 *                     description: CNPJ da empresa
 *                   PASTA:
 *                     type: integer
 *                     description: Código da pasta da empresa
 *                   DATA:
 *                     type: string
 *                     format: date-time
 *                     description: Data de criação da empresa
 *       500:
 *         description: Erro ao buscar dados dos clientes
 */
router.get("/clientes", login.required, Empresas.getClientes);

module.exports = router;
