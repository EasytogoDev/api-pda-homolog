const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Temp1601RetornoWms = sqlServerSequelize.define(
  "Temp1601RetornoWms",
  {
    codigoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    wmsPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuarioPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "temp1601_Retorno_Wms",
    timestamps: false,
  }
);

module.exports = Temp1601RetornoWms;
