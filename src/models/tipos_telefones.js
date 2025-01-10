const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const TipoTelefone = sqlServerSequelize.define(
  "TipoTelefone",
  {
    codigoTIPOTELEFONE: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomeTIPOTELEFONE: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    abreviaturaTIPOTELEFONE: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    formatoTIPOTELEFONE: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },
  },
  {
    tableName: "tb0304_Tipos_Telefone",
    timestamps: false,
  }
);

module.exports = TipoTelefone;
