const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const TipoEmail = sqlServerSequelize.define(
  "TipoEmail",
  {
    codigoTIPOEMAIL: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sistemaTIPOEMAIL: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    descricaoTIPOEMAIL: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
  },
  {
    tableName: "tb0332_Tipos_Email",
    timestamps: false,
  }
);

module.exports = TipoEmail;
