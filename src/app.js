require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
const path = require("path");

const { sqlServerSequelize } = require("./config/sqlserver");
const mySqlSequelize = require("./config/mysql");
const swaggerApp = require("../swagger");

app.use(cors());

var corsOptions = {
  origin: "http://localhost",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Importando as rotas com base nas novas tabelas do banco de dados
const usuariosRoutes = require("./routes/usuariosRoutes");
const vendedoresRoutes = require("./routes/vendedoresRoutes");
const propostasRoutes = require("./routes/propostasRoutes");
const relatoriosVendasRoutes = require("./routes/relatoriosVendasRoutes");
const pedidosRoutes = require("./routes/pedidosRoutes");
const itensPedidosRoutes = require("./routes/itensPedidosRoutes");
const itensPropostasRoutes = require("./routes/itensPropostasRoutes");
const webhookRoutes = require("./routes/webhookRoutes");
const empresasRoutes = require("./routes/empresasRoutes");
const fiscalRoutes = require("./routes/fiscal");
const opsRoutes = require("./routes/opsRoutes");
const produtosRoutes = require("./routes/produtosRoutes");
const embalagensRoutes = require("./routes/embalagensRoutes");

const bodyParser = require("body-parser");

// Configurações do express
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use(swaggerApp);
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Header",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).send({});
  }

  next();
});

// Rotas
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/vendedores", vendedoresRoutes);
app.use("/api/propostas", propostasRoutes);
app.use("/api/relatorios/vendas", relatoriosVendasRoutes);
app.use("/api/pedidos", pedidosRoutes);
app.use("/api/propostas", propostasRoutes);
app.use("/api/itens-pedidos", itensPedidosRoutes);
app.use("/api/itens-propostas", itensPropostasRoutes);
app.use("/api/retorno", webhookRoutes);
app.use("/api/empresas", empresasRoutes);
app.use("/api/fiscal", fiscalRoutes);
app.use("/api/ops", opsRoutes);
app.use("/api/produtos", produtosRoutes);
app.use("/api/embalagens", embalagensRoutes);

// Quando não encontra rota, entra aqui:
app.use((req, res, next) => {
  res.status(404).send("Api Online: caminho não encontrado.");
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      mensagem: error.message,
    },
  });
});

//responsavel pelas conexoes no banco de dados
(async () => {
  try {
    await sqlServerSequelize.sync();
    await mySqlSequelize.sync();
    console.log("Banco de dados sincronizado com sucesso!");
  } catch (error) {
    console.error("Erro ao sincronizar o banco de dados:", error);
  }
})();

module.exports = app;
