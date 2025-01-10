const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Temp1202NFItensWms = sqlServerSequelize.define(
  "Temp1202NFItensWms",
  {
    codigoNFITEM: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    chaveNFITEM: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    itemNFITEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantidadeNFITEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numeroitemNFITEM: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    skuNFITEM: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    tableName: "temp1202_NF_Itens_Wms",
    timestamps: false,
  }
);

module.exports = Temp1202NFItensWms;
