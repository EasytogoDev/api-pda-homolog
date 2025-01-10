const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Telefone = sqlServerSequelize.define(
  "Telefone",
  {
    codigoTELEFONE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioTELEFONE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    empresaTELEFONE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numeroTELEFONE: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    tipoTELEFONE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    observacaoTELEFONE: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    padraoTELEFONE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dataprocessamentoTELEFONE: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tb0303_Telefones",
    timestamps: false,
  }
);

module.exports = Telefone;
