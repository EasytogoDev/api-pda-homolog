const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const LogItemOrdemProducao = sqlServerSequelize.define(
  "LogItemOrdemProducao",
  {
    sistemaLOGITEMOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    itemLOGITEMOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataLOGITEMOP: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    logLOGITEMOP: {
      type: DataTypes.STRING(1000),
      allowNull: false,
    },
    usuarioLOGITEMOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entidadeLOGITEMOP: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "tb1303_Logs_Item_Ordem_Producao", // Nome da tabela no banco
    timestamps: false, // Desativa as colunas createdAt e updatedAt
  }
);

module.exports = LogItemOrdemProducao;
