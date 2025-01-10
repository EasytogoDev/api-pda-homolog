const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const GerenciadorNFe = sqlServerSequelize.define(
  "GerenciadorNFe",
  {
    chaveGERENCIADORNFE: {
      type: DataTypes.STRING(47),
      allowNull: false,
      primaryKey: true,
    },
    xmlGERENCIADORNFE: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pastaGERENCIADORNFE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lixeiraGERENCIADORNFE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuarioGERENCIADORNFE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipoGERENCIADORNFE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nsuGERENCIADORNFE: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true,
    },
    datacriacaoGERENCIADORNFE: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    excluirGERENCIADORNFE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusGERENCIADORNFE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    hashGERENCIADORNFE: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    webserviceGERENCIADORNFE: {
      type: DataTypes.STRING(18),
      allowNull: true,
    },
    consultaGERENCIADORNFE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prop1GERENCIADORNFE: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    empresaconsultaGERENCIADORNFE: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tb4401_Gerenciador_NFe",
    timestamps: false, // Desativa as colunas createdAt e updatedAt
  }
);

module.exports = GerenciadorNFe;
