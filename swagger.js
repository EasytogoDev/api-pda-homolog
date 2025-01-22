require("dotenv").config();

// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "API RAINHA DAS SETE - PDA (DEV)",
      version: "1.0.0",
      description: "Sistema ERP Interno",
    },
    servers: [
      {
        url: `http://itatiba.rainhadassete.com.br:8095`,
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          // type: "https",
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.js"], // Caminho para os arquivos de rota para documentação automática
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

module.exports = app;
