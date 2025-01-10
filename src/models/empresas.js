const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Empresa = sqlServerSequelize.define(
  "Empresa",
  {
    codigoEMPRESA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    pastaEMPRESA: {
      type: DataTypes.STRING,
    },
    lixeiraEMPRESA: {
      type: DataTypes.STRING,
    },
    sistemaEMPRESA: {
      type: DataTypes.STRING,
    },
    usuarioEMPRESA: {
      type: DataTypes.STRING,
    },
    nomeEMPRESA: {
      type: DataTypes.STRING,
    },
    datacriacaoEMPRESA: {
      type: DataTypes.DATE,
    },
    observacaoEMPRESA: {
      type: DataTypes.STRING,
    },
    razaoEMPRESA: {
      type: DataTypes.STRING,
    },
    pessoaEMPRESA: {
      type: DataTypes.STRING,
    },
    cnpjEMPRESA: {
      type: DataTypes.STRING,
    },
    ieEMPRESA: {
      type: DataTypes.STRING,
    },
    siteEMPRESA: {
      type: DataTypes.STRING,
    },
    emailEMPRESA: {
      type: DataTypes.STRING,
    },
    creditoEMPRESA: {
      type: DataTypes.DECIMAL(10, 2),
    },
    pendenciacreditoEMPRESA: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    saldocreditoEMPRESA: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    idiomaEMPRESA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    simplesnacionalEMPRESA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    naocontribuinteEMPRESA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    imEMPRESA: {
      type: DataTypes.STRING,
    },
    outlookEMPRESA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipofiscalEMPRESA: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inflivrecomEMPRESA: {
      type: DataTypes.STRING,
    },
    atacadistaEMPRESA: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    validadedescontoEMPRESA: {
      type: DataTypes.DATE,
    },
    grupoEMPRESA: {
      type: DataTypes.STRING,
    },
    empresawebEMPRESA: {
      type: DataTypes.STRING,
    },
    prop1EMPRESA: {
      type: DataTypes.STRING,
    },
    infadicionalEMPRESA: {
      type: DataTypes.STRING,
    },
    tipocontribuinteEMPRESA: {
      type: DataTypes.STRING,
    },
    contacontabilEMPRESA: {
      type: DataTypes.STRING,
    },
    dataprocessamentoEMPRESA: {
      type: DataTypes.DATE,
    },
    padraofreteEMPRESA: {
      type: DataTypes.STRING,
    },
    eanEMPRESA: {
      type: DataTypes.STRING,
    },
    indiedestEMPRESA: {
      type: DataTypes.STRING,
    },
    tipodocorigemEMPRESA: {
      type: DataTypes.STRING,
    },
    docorigemEMPRESA: {
      type: DataTypes.STRING,
    },
    prop2EMPRESA: {
      type: DataTypes.STRING,
    },
    prop3EMPRESA: {
      type: DataTypes.STRING,
    },
    prop4EMPRESA: {
      type: DataTypes.STRING,
    },
    prop6EMPRESA: {
      type: DataTypes.STRING,
    },
    prop7EMPRESA: {
      type: DataTypes.STRING,
    },
    prop8EMPRESA: {
      type: DataTypes.STRING,
    },
    prop9EMPRESA: {
      type: DataTypes.STRING,
    },
    prop11EMPRESA: {
      type: DataTypes.STRING,
    },
    prop12EMPRESA: {
      type: DataTypes.STRING,
    },
    prop13EMPRESA: {
      type: DataTypes.STRING,
    },
    prop14EMPRESA: {
      type: DataTypes.STRING,
    },
    prop15EMPRESA: {
      type: DataTypes.STRING,
    },
    prop16EMPRESA: {
      type: DataTypes.STRING,
    },
    prop17EMPRESA: {
      type: DataTypes.STRING,
    },
    logoEMPRESA: {
      type: DataTypes.BLOB,
    },
    pdfEMPRESA: {
      type: DataTypes.BLOB,
    },
    cscEMPRESA: {
      type: DataTypes.STRING,
    },
    idcscEMPRESA: {
      type: DataTypes.STRING,
    },
    prop18EMPRESA: {
      type: DataTypes.STRING,
    },
    prop19EMPRESA: {
      type: DataTypes.STRING,
    },
    prop20EMPRESA: {
      type: DataTypes.STRING,
    },
    prop21EMPRESA: {
      type: DataTypes.STRING,
    },
    prop22EMPRESA: {
      type: DataTypes.STRING,
    },
    prop23EMPRESA: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "tb0301_Empresas",
    timestamps: false,
  }
);

module.exports = Empresa;
