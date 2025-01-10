const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const PedidosCompra = sqlServerSequelize.define(
  "PedidosCompra",
  {
    codigoPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pastaPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lixeiraPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sistemaPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuarioPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataPEDIDOCOMPRA: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fornecedorPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    solicitantePEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    origemPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    taxanacionalizacaoPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: false,
    },
    transportadoraPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nometransportadoraPEDIDOCOMPRA: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    listaPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    compradorPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    liquidoPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: false,
    },
    cpgtoPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    observacaoPEDIDOCOMPRA: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    brutoPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    descontosPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    acrescimosPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    ipiPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    baseicmsPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    icmsPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    entradacalculadaPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    fretetipoPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    entradaPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    prazoPEDIDOCOMPRA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    baseicmsstPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true,
    },
    icmsstPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 0),
      allowNull: true,
    },
    numerodocDIPEDIDOCOMPRA: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    dataregistroDIPEDIDOCOMPRA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    localdesembaracoDIPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    datadesembaracoDIPEDIDOCOMPRA: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    statusemailPEDIDO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuariowebcodigoPEDIDO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    incidefreteipiPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    saldoPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    codigoviatranspPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pesoliquidoPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    quantidadeprodutosPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    destsolicitacaoPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    totalbrutoareceberPEDIDOCOMPRA: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    copiaPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    volumeDIPEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    prop1PEDIDOCOMPRA: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: "tb1402_Pedidos",
    timestamps: false,
  }
);

module.exports = PedidosCompra;
