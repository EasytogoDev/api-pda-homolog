const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Producao = sqlServerSequelize.define(
  "Producao",
  {
    codigoPRODUCAO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    pastaPRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    lixeiraPRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    sistemaPRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    usuarioPRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    observacaoPRODUCAO: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
    quantidadePRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    quantidadefinalPRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    datacriacaoPRODUCAO: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    prazoPRODUCAO: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    inicioproducaoPRODUCAO: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fimproducaoPRODUCAO: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    empresaPRODUCAO: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    produtoPRODUCAO: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    custoPRODUCAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    lotePRODUCAO: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    statusPRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    tipodocorigemPRODUCAO: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    docorigemPRODUCAO: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    tipooperacaoPRODUCAO: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    produtorPRODUCAO: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    CustosubprodutoPRODUCAO: {
      type: DataTypes.DECIMAL(18, 2),
      allowNull: true,
    },
    alocadoPRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    pesopecaPRODUCAO: {
      type: DataTypes.DECIMAL(18, 4),
      allowNull: true,
    },
    impressaPRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    statuscontabilPRODUCAO: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    wmsPRODUCAO: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
  },
  {
    tableName: "tb1301_Producao",
    timestamps: false,
  }
);

module.exports = Producao;
