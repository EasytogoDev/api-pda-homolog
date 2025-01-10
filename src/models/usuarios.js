const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Usuarios = sqlServerSequelize.define(
  "Usuarios",
  {
    codigoUSUARIO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pastaUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 14,
    },
    lixeiraUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    sistemaUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    usuarioUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    nomeUSUARIO: {
      type: DataTypes.STRING(50),
    },
    senhaUSUARIO: {
      type: DataTypes.STRING(8),
    },
    observacaoUSUARIO: {
      type: DataTypes.STRING(100),
    },
    nomecompletoUSUARIO: {
      type: DataTypes.STRING(50),
    },
    aplicacaoUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    expiraUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    diasUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 30,
    },
    inicioUSUARIO: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    mudarUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    componenteinicialUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    exibirmenuverticalUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    exibirbarraferramentasUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    ativoUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    iconelocalUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    caminhoiconeUSUARIO: {
      type: DataTypes.STRING(300),
    },
    googlecalendarUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    corpadraoUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    administradortecwareUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    remetenteUSUARIO: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    assinaturaimgUSUARIO: {
      type: DataTypes.STRING(2500),
    },
    expedienteUSUARIO: {
      type: DataTypes.INTEGER,
    },
    imagemurlUSUARIO: {
      type: DataTypes.STRING(256),
    },
  },
  {
    tableName: "tb0201_Usuarios",
    timestamps: false,
  }
);

module.exports = Usuarios;
