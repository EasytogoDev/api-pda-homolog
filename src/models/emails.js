const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Email = sqlServerSequelize.define(
  "Email",
  {
    codigoEMAIL: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    empresaEMAIL: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipoEMAIL: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    enderecoEMAIL: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    padraoEMAIL: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dataprocessamentoEMAIL: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "tb0331_Emails",
    timestamps: false,
  }
);

module.exports = Email;
