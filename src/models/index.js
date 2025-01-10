const { sqlServerSequelize } = require("../config/sqlserver");
const Usuarios = require("./usuarios");
const Vendedores = require("./vendedores");
const PedidosCompra = require("./pedidos");
const Propostas = require("./propostas");
const Temp1601RetornoWms = require("./temp_wms");
const Temp1602RetornoItensWms = require("./temp_itens_wms");
const Empresa = require("./empresas");
const Telefone = require("./telefones");
const TipoTelefone = require("./tipos_telefones");
const Email = require("./emails");
const TipoEmail = require("./tipo_emails");
const Endereco = require("./enderecos");
const Cidade = require("./cidades");
const Carteira = require("./carteiras");
const ItemNFe = require("./itemnfe");
const GerenciadorNFe = require("./gerenciadornfe");
const CabecalhoNFe = require("./cabecalhonfe");
const Producao = require("./producao");
const LogItemOrdemProducao = require("./historicoProducao");
const Temp1602LoteItensWms = require("./temp_lote_items");
const Temp1202NFItensWms = require("./temp_nf_item");

Empresa.hasMany(Endereco, {
  foreignKey: "empresaENDERECO",
  as: "enderecos",
});

Endereco.belongsTo(Empresa, {
  foreignKey: "empresaENDERECO",
  as: "empresa",
});

Empresa.hasMany(Email, {
  foreignKey: "empresaEMAIL",
  as: "emails",
});
Email.belongsTo(Empresa, {
  foreignKey: "empresaEMAIL",
  as: "empresa",
});

Empresa.hasMany(Carteira, {
  foreignKey: "empresaCARTEIRA",
  as: "carteiras",
});
Carteira.belongsTo(Empresa, {
  foreignKey: "empresaCARTEIRA",
  as: "empresa",
});

Endereco.belongsTo(Cidade, {
  foreignKey: "cidadeENDERECO", // Chave estrangeira em Endereco que se refere à Cidade
  as: "cidade",
});

// Correto: Uma Cidade tem muitos Enderecos
Cidade.hasMany(Endereco, {
  foreignKey: "cidadeENDERECO", // Chave estrangeira em Endereco
  as: "enderecos",
});

Empresa.hasMany(Telefone, {
  foreignKey: "empresaTELEFONE",
  as: "telefone",
});

Telefone.belongsTo(Empresa, {
  foreignKey: "empresaTELEFONE",
  as: "empresa",
});

TipoTelefone.hasMany(Telefone, {
  foreignKey: "tipoTELEFONE",
  as: "telefone",
});

Telefone.belongsTo(TipoTelefone, {
  foreignKey: "tipoTELEFONE",
  as: "tipo_telefone",
});

TipoEmail.hasMany(Email, {
  foreignKey: "tipoEMAIL",
  as: "email",
});

Email.belongsTo(TipoEmail, {
  foreignKey: "tipoEMAIL",
  as: "tipo_email",
});

Propostas.belongsTo(Empresa, {
  foreignKey: "clientePROPOSTA",
  as: "empresa",
});

Empresa.hasMany(Propostas, {
  foreignKey: "clientePROPOSTA",
  as: "propostas",
});
// PedidosCompra.js
PedidosCompra.hasMany(CabecalhoNFe, {
  foreignKey: "gerenciadorCABNFE",
  as: "CabecalhoNFe",
});

CabecalhoNFe.belongsTo(PedidosCompra, {
  foreignKey: "gerenciadorCABNFE",
  as: "Pedidos",
});

// CabecalhoNFe.js
CabecalhoNFe.belongsTo(GerenciadorNFe, {
  foreignKey: "gerenciadorCABNFE",
  as: "GerenciadorNFe",
});

GerenciadorNFe.hasMany(CabecalhoNFe, {
  foreignKey: "gerenciadorCABNFE",
  as: "CabecalhoNFe",
});

// ItemNFe.js
CabecalhoNFe.hasMany(ItemNFe, {
  foreignKey: "cabecalhoITEMNFE",
  as: "ItemNfes",
});

ItemNFe.belongsTo(CabecalhoNFe, {
  foreignKey: "cabecalhoITEMNFE",
  as: "CabecalhoNFe",
});

module.exports = {
  sqlServerSequelize,
  Usuarios,
  Vendedores,
  PedidosCompra,
  Propostas,
  Temp1601RetornoWms,
  Temp1602RetornoItensWms,
  Empresa,
  Telefone,
  TipoTelefone,
  Email,
  TipoEmail,
  Endereco,
  Cidade,
  Carteira,
  ItemNFe,
  GerenciadorNFe,
  CabecalhoNFe,
  Producao,
  LogItemOrdemProducao,
  Temp1602LoteItensWms,
  Temp1202NFItensWms,
};
