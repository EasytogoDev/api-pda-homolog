const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Legislacao = sqlServerSequelize.define(
  "Legislacao",
  {
    codigoLEGISLACAO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuarioLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pastaLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lixeiraLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    sistemaLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    nomeLEGISLACAO: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    tributacaoicmsLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    reducaoLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: false,
      defaultValue: 0,
    },
    icmsLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    textofiscalLEGISLACAO: {
      type: DataTypes.STRING(700),
      allowNull: false,
    },
    observacaoLEGISLACAO: {
      type: DataTypes.STRING(250),
      allowNull: true,
    },
    padraoLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    incidereducaoLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    incideicmsLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    tiporeducaoLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    lucrostLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    icmsstLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incideicmsstLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    cfopLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    protocoloLEGISLACAO: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tributacaoicmsstLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    irpjLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incideirpjLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cofinsLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incidecofinsLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    pisLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incidepisLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    csllLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incidecsllLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    ipiLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incideipiLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    simplesLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incidesimplesLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    statusLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pisretLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incidepisretLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    cofinsretLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incidecofinsretLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    difalLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incidedifalLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    issLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incideissLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    inssLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incideinssLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    icmsdesLEGISLACAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
      defaultValue: 0,
    },
    incideicmsdesLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    exibirFcpTotalLEGISLACAO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    tableName: "tb0511_Legislacoes",
    timestamps: false,
  }
);

module.exports = Legislacao;
