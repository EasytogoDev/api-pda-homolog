const { DataTypes } = require('sequelize');
const { sqlServerSequelize } = require('../config/sqlserver');

const Vendedores = sqlServerSequelize.define(
  'Vendedores',
  {
    codigoVENDEDOR: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pastaVENDEDOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lixeiraVENDEDOR: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sistemaVENDEDOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuarioVENDEDOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nomeVENDEDOR: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    datacriacaoVENDEDOR: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observacaoVENDEDOR: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    padraoVENDEDOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuarioassociadoVENDEDOR: {
      type: DataTypes.STRING(5),
      allowNull: false,
    },
    empresaVENDEDOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gerenteVENDEDOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ativoVENDEDOR: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    remetenteVENDEDOR: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    irrfVENDEDOR: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
  },
  {
    tableName: 'tb1609_Vendedores',
    timestamps: false,
  }
);

module.exports = Vendedores;
