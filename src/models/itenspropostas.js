const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const ItensProposta = sqlServerSequelize.define(
  "ItensProposta",
  {
    codigoITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    propostaITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produtoITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantidadeITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: false,
    },
    finalidadeITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    liquidoITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    brutoITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    liquidototalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    brutototalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    ipiITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    valoripiITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valoripitotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    icmsITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    reducaoITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    basecalculoicmsITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    basecalculoicmstotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valoricmsITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valoricmstotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    descontoITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valordescontoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valordescontototalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    observacaoITEMPROPOSTA: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    datacriacaoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DATE,
      allowNull: true,
    },
    dataalocacaoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DATE,
      allowNull: true,
    },
    dataencomendaITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DATE,
      allowNull: true,
    },
    dataprazosolicitadoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DATE,
      allowNull: true,
    },
    notafiscalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    pagoITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    despesasITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    separadoITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    comissaoITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    pedidoclienteITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tipooperacaoITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuarioITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    legislacaoITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pedidorepresentadaITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statusrepresentadaITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    liquidostITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    basecalculoicmsstITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    basecalculoicmstotalstITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valoricmsstITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valoricmstotalstITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    tipodocorigemITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    docorigemITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    itemITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nomenclaturaITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    codigonfITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    outrasdespesasITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    liquidocalculadoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    calculadoemvendasITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    liquidooriginalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    modeloITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    serieITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    diaprazosolicitadoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DATE,
      allowNull: true,
    },
    campanhaITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    freteITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    undconversaoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    embalagemITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    icmssnITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    itempedidoclienteITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    pesoliquidototalITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    origemITEMPROPOSTA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fciITEMPROPOSTA: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    qtddevolvidaITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    datafinalizacaoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DATE,
      allowNull: true,
    },
    cmvITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 9),
      allowNull: true,
    },
    propriedadecmvITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    nomeprodutoITEMPROPOSTA: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    liquidosemimpostoscreditaveisITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    liquidosemimpostosITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    liquidosemimpostoscreditaveistotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    liquidosemimpostostotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    propriedadecmvprecoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    xmlsequenciaITEMPROPOSTA: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pisretITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorpisretITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorpisrettotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    cofinsretITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorcofinsretITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorcofinsrettotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    converteunidadeITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    copiadoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    valoricmsdesoneradoITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    basecalculofcpsttotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    basecalculofcptotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    fcpinterITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    fcpITEMPROPOSTA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    fcpstITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorfcpintertotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorfcpsttotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    valorfcptotalITEMPROPOSTA: {
      // Correção no nome
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
  },
  {
    tableName: "tb1602_Itens_Proposta",
    timestamps: false,
  }
);

module.exports = ItensProposta;
