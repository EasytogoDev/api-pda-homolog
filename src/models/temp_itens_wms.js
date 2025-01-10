const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Temp1602RetornoItensWms = sqlServerSequelize.define(
  "Temp1602RetornoItensWms",
  {
    codigoITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    produtoITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    propostaITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidadeITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: false,
    },
    statusITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    loteITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nomeloteITEMPROPOSTA: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    locacaoITEMPROPOSTA: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "temp1602_Retorno_Itens_Wms",
    timestamps: false,
  }
);

module.exports = Temp1602RetornoItensWms;
