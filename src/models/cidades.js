const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Cidade = sqlServerSequelize.define(
  "Cidade",
  {
    codigoCIDADE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sistemaCIDADE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idcepCIDADE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuarioCIDADE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomeCIDADE: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    datacriacaoCIDADE: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    observacaoCIDADE: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    estadoCIDADE: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    prop1CIDADE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    livrecomerCIDADE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    ibgeCIDADE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tb0703_Cidades",
    timestamps: false,
  }
);

module.exports = Cidade;
