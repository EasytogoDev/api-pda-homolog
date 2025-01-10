const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Temp1602LoteItensWms = sqlServerSequelize.define(
  "Temp1602LoteItensWms",
  {
    codigoLOTEITEM: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    loteLOTEITEM: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    produtoLOTEITEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidadeLOTEITEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "temp1602_Lote_Itens_Wms_USARESSA",
    timestamps: false,
  }
);

module.exports = Temp1602LoteItensWms;
