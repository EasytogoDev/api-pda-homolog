const { DataTypes } = require("sequelize");
const { sqlServerSequelize } = require("../config/sqlserver");

const Historico1604 = sqlServerSequelize.define(
  "Historico1604",
  {
    codigoHISTORICO: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    documentoHISTORICO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    entidadeHISTORICO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dataHISTORICO: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW, // Equivalente ao GETDATE() do SQL Server
    },
    usuarioHISTORICO: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    descricaoHISTORICO: {
      type: DataTypes.STRING(244), // Definido conforme a tabela
      allowNull: false,
    },
    sistemaHISTORICO: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Definido conforme a tabela
    },
  },
  {
    tableName: "tb1604_Historicos",
    timestamps: false, // A tabela não possui createdAt e updatedAt
  }
);

module.exports = Historico1604;
