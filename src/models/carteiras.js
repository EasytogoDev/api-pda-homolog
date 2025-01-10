const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Carteira = sqlServerSequelize.define(
  "Carteira",
  {
    codigoCARTEIRA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sistemaCARTEIRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    vendedorCARTEIRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    empresaCARTEIRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    datacriacaoCARTEIRA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    dataagendamentoCARTEIRA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    datainicioagendamentoCARTEIRA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    datafimagendamentoCARTEIRA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    observacaoCARTEIRA: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    statusCARTEIRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipodocCARTEIRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    docCARTEIRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prioridadeCARTEIRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuarioCARTEIRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valorcomissaoCARTEIRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    vendedorporpadraoCARTEIRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tb1616_Carteiras",
    timestamps: false,
  }
);

module.exports = Carteira;
