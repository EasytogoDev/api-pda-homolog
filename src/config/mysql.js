const { Sequelize } = require('sequelize');
require('dotenv').config();


const mySqlSequelize = new Sequelize(process.env.DB_MYSQL_BANCO, process.env.DB_MYSQL_USER, process.env.DB_MYSQL_PASSWORD, {
  host: process.env.DB_MYSQL_HOST,
  dialect: 'mysql',
  logging: false
});

module.exports = mySqlSequelize;
