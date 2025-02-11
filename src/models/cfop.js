const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const CFOP = sqlServerSequelize.define(
  "CFOP",
  {
    codigoCFOP: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pastaCFOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lixeiraCFOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    nomeCFOP: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    grupoCFOP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sistemaCFOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    descricaoCFOP: {
      type: DataTypes.STRING(400),
      allowNull: false,
    },
    observacaoCFOP: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    ativoCFOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    abrangenciaCFOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    padraoCFOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    gerarreceitaCFOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    gerarmovimentacaoCFOP: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 1,
    },
    numeroCFOP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    operacaoCFOP: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    operacaonfeCFOP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    indnfeCFOP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    indcomunicaCFOP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    indtranspCFOP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    inddevolCFOP: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    exportacaoCFOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "tb1503_CFOP",
    timestamps: false,
  }
);

module.exports = CFOP;
