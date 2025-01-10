const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Endereco = sqlServerSequelize.define(
  "Endereco",
  {
    codigoENDERECO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioENDERECO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    datacriacaoENDERECO: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    empresaENDERECO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    padraoENDERECO: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    logradouroENDERECO: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    logradourofullENDERECO: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    numeroENDERECO: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    cepENDERECO: {
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    paisENDERECO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    estadoENDERECO: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    cidadeENDERECO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bairroENDERECO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipoENDERECO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    complementoENDERECO: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    mascaraENDERECO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    regiaoENDERECO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataprocessamentoENDERECO: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    latitudeENDERECO: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    longitudeENDERECO: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "tb0302_Enderecos",
    timestamps: false,
  }
);

module.exports = Endereco;
