const { Sequelize } = require("sequelize");
require("dotenv").config();

const sqlServerSequelize = new Sequelize(
  process.env.DB_SQLSERVER_BANCO,
  process.env.DB_SQLSERVER_USER,
  process.env.DB_SQLSERVER_PASSWORD,
  {
    host: process.env.DB_SQLSERVER_HOST,
    dialect: "mssql",
    dialectOptions: {
      options: {
        encrypt: true,
        enableArithAbort: true,
      },
    },
    logging: false,
  }
);

const sqlServerKnex = require("knex")({
  client: "mssql",
  connection: {
    host: process.env.DB_SQLSERVER_HOST,
    user: process.env.DB_SQLSERVER_USER,
    password: process.env.DB_SQLSERVER_PASSWORD,
    database: process.env.DB_SQLSERVER_BANCO,
  },
});

module.exports = { sqlServerSequelize, sqlServerKnex };
