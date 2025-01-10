const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const ItemNFe = sqlServerSequelize.define(
  "ItemNFe",
  {
    cabecalhoITEMNFE: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nItem_detITEMNFE: {
      type: DataTypes.DECIMAL(3, 0),
      allowNull: true,
    },
    cProd_prodITEMNFE: {
      type: DataTypes.STRING(60),
      allowNull: true,
    },
    cEAN_prodITEMNFE: {
      type: DataTypes.STRING(14),
      allowNull: true,
    },
    xProd_prodITEMNFE: {
      type: DataTypes.STRING(120),
      allowNull: true,
    },
    NCM_prodITEMNFE: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    EXTIPI_prodITEMNFE: {
      type: DataTypes.DECIMAL(3, 0),
      allowNull: true,
    },
    CFOP_prodITEMNFE: {
      type: DataTypes.DECIMAL(4, 0),
      allowNull: true,
    },
    uCom_prodITEMNFE: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    qCom_prodITEMNFE: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: true,
    },
    vUnCom_prodITEMNFE: {
      type: DataTypes.DECIMAL(23, 10),
      allowNull: true,
    },
    vProd_prodITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    cEANTrib_prodITEMNFE: {
      type: DataTypes.STRING(35),
      allowNull: true,
    },
    uTrib_prodITEMNFE: {
      type: DataTypes.STRING(6),
      allowNull: true,
    },
    qTrib_prodITEMNFE: {
      type: DataTypes.DECIMAL(15, 4),
      allowNull: true,
    },
    vUnTrib_prodITEMNFE: {
      type: DataTypes.DECIMAL(23, 10),
      allowNull: true,
    },
    vFrete_prodITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    vSeg_prodITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    vDesc_prodITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    vOutro_prodITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    indTot_prodITEMNFE: {
      type: DataTypes.DECIMAL(1, 0),
      allowNull: true,
    },
    xPed_prodITEMNFE: {
      type: DataTypes.STRING(15),
      allowNull: true,
    },
    nItemPed_prodITEMNFE: {
      type: DataTypes.DECIMAL(6, 0),
      allowNull: true,
    },
    nFCI_prodITEMNFE: {
      type: DataTypes.STRING(36),
      allowNull: true,
    },
    vTotTrib_impostoITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    orig_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(1, 0),
      allowNull: true,
    },
    CST_ICMSITEMNFE: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    modBC_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(2, 0),
      allowNull: true,
    },
    vBC_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    pICMS_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(6, 4),
      allowNull: true,
    },
    vICMS_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    modBCST_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(1, 0),
      allowNull: true,
    },
    pMVAST_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    pRedBCST_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    vBCST_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    pICMSST_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(6, 4),
      allowNull: true,
    },
    vICMSST_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    pRedBC_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(18, 6),
      allowNull: true,
    },
    vICMSDeson_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    motDesICMS_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(2, 0),
      allowNull: true,
    },
    vICMSOp_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    pDif_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(10, 6),
      allowNull: true,
    },
    vICMSDif_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    vBCSTRet_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    vICMSSTRet_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(15, 2),
      allowNull: true,
    },
    pBCOP_ICMSITEMNFE: {
      type: DataTypes.DECIMAL(6, 4),
      allowNull: true,
    },
    UFST_ICMSITEMNFE: {
      type: DataTypes.STRING(2),
      allowNull: true,
    },
    // Adicione os campos restantes seguindo o mesmo padrão
  },
  {
    tableName: "tb4405_Item_NFe",
    timestamps: false,
  }
);

module.exports = ItemNFe;
