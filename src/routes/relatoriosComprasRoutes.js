/**
 * @swagger
 * components:
 *   schemas:
 *     Estado:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código do estado
 *         nome:
 *           type: string
 *           description: Nome do estado
 *     Linha:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código da linha de produto
 *         descricao:
 *           type: string
 *           description: Descrição da linha de produto
 *     Cliente:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código do cliente
 *         nome:
 *           type: string
 *           description: Nome do cliente
 *     Produto:
 *       type: object
 *       properties:
 *         codigo:
 *           type: string
 *           description: Código do produto
 *         descricao:
 *           type: string
 *           description: Descrição do produto
 *     Estatistica:
 *       type: object
 *       properties:
 *         totalCompras:
 *           type: number
 *           description: Total de Compras realizadas
 *         mediaCompras:
 *           type: number
 *           description: Média de Compras por cliente
 */

/**
 * @swagger
 * /api/relatorios/Compras/estados:
 *   get:
 *     summary: Retorna uma lista de estados para relatórios de Compras
 *     tags: [Relatórios de Compras]
 *     responses:
 *       200:
 *         description: Lista de estados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estado'
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/relatorios/Compras/linhas:
 *   get:
 *     summary: Retorna uma lista de linhas de produtos
 *     tags: [Relatórios de Compras]
 *     responses:
 *       200:
 *         description: Lista de linhas de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Linha'
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/relatorios/Compras/clientes:
 *   get:
 *     summary: Retorna uma lista de clientes
 *     tags: [Relatórios de Compras]
 *     responses:
 *       200:
 *         description: Lista de clientes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/relatorios/Compras/produtos:
 *   get:
 *     summary: Retorna uma lista de produtos
 *     tags: [Relatórios de Compras]
 *     responses:
 *       200:
 *         description: Lista de produtos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Produto'
 *       500:
 *         description: Erro no servidor
 */

/**
 * @swagger
 * /api/relatorios/Compras/estatisticas:
 *   get:
 *     summary: Retorna estatísticas de Compras
 *     tags: [Relatórios de Compras]
 *     responses:
 *       200:
 *         description: Estatísticas de Compras
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estatistica'
 *       500:
 *         description: Erro no servidor
 */
