const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Propostas = sqlServerSequelize.define(
  "Propostas",
  {
    codigoPROPOSTA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pastaPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lixeiraPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuarioPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sistemaPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    clientePROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    proponentePROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    vendedorPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    listaPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cpgtoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    datacriacaoPROPOSTA: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    validadePROPOSTA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    liquidoPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    brutoPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    descontosPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    acrescimosPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    ipiPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    baseicmsPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    icmsPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    transportadoraPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nometransportadoraPROPOSTA: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    statusPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    observacaoPROPOSTA: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    fretetipoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fretevalorPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    volumesPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pesobrutoPROPOSTA: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    pesoliquidoPROPOSTA: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    garantiafinanceiraPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    naogerarcomissaoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipocomissaoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valorbasecomissaoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipodocorigemPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    docorigemPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    representadaPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    coletatipoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icmsstPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    baseicmsstPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    ordemseparacaoimpressaPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    solicitantePROPOSTA: {
      type: DataTypes.STRING(4000),
      allowNull: true,
    },
    webPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuariowebPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusemailPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuariowebcodigoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    motoristaPROPOSTA: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    cpgtorecpadraoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icmssnPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    entregaPROPOSTA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    incideipifretePROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    modeloPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    cmvPROPOSTA: {
      type: DataTypes.DECIMAL(18, 9),
      allowNull: true,
    },
    prop1PROPOSTA: {
      type: DataTypes.STRING(5),
      allowNull: true,
    },
    prop2PROPOSTA: {
      type: DataTypes.STRING(3),
      allowNull: true,
    },
    numeroPROPOSTA: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    propostavinculoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    liquidosemimpostoscreditaveisPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    liquidosemimpostosPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    canceladawebPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lojavirtualPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    copiadaPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    incideicmsfretePROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statuslojavirtualPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icmsdesoneradoPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pedidorecorrentePROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prop3PROPOSTA: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    prop4PROPOSTA: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dimensaovolumePROPOSTA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    prop5PROPOSTA: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    prop6PROPOSTA: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    valorfcpintertotalPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorfcpsttotalPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorfcptotalPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    prop7PROPOSTA: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    pesobrutoPROPOSTA: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    prop8PROPOSTA: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    prop9PROPOSTA: {
      type: DataTypes.DECIMAL(18, 8),
      allowNull: true,
    },
    prop10PROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prop11PROPOSTA: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true
    }
  },
  {
    tableName: "tb1601_Propostas",
    timestamps: false,
  }
);

module.exports = Propostas;
