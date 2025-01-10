const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const ItensPedidos = sqlServerSequelize.define(
  "ItensPedidos",
  {
    codigoITEMPC: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    sistemaITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pedidoITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    produtoITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantidadeITEMPC: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    finalidadeITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    moedaITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pesoITEMPC: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    liquidoITEMPC: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    despesasITEMPC: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    taxasiscomexITEMPC: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    valoripiITEMPC: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    iiITEMPC: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    valoricmsITEMPC: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    statusITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    observacaoITEMPC: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    tipodocorigemITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    docorigemITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    dataITEMPC: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    prazoITEMPC: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    loteITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nomeLoteITEMPC: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    certificadoLoteITEMPC: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    validadeLoteITEMPC: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    armazemITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pacoteITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    rfiITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cfopITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    percentualimportadoITEMPC: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    descontoITEMPC: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorfreteITEMPC: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    origemITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valorimportadoITEMPC: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    icmsstITEMPC: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    xmlITEMPC: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    fciITEMPC: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    numeroAdicaoITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    incidenciatipoITEMPC: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    numeroAdicaoDIITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    numeroSequenciaDIITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    impressoloteITEMPC: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    basecalculofciITEMPC: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    pesobrutoITEMPC: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    datafabricacaoITEMPC: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    destinoITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    centrodecustoITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    verbaLocadaITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusmailITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    itemITEMPC: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tb1403_Itens_Pedidos",
    timestamps: false,
  }
);

module.exports = ItensPedidos;
