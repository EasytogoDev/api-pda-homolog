require('dotenv').config();
const fs = require('fs');
const https = require('https');
const http = require('http');
const app = require('./src/app');

// Portas do .env
const portHttp = process.env.PORT || 8095; // Porta para HTTP
const portHttps = process.env.PORT_SSL || 8444; // Porta para HTTPS

// Caminhos para os arquivos do certificado SSL no VPS
const sslOptions = {
    key: fs.readFileSync('/home/artur/conf/web/api.sistema.gruporainha.com.br/ssl/api.sistema.gruporainha.com.br.key'),
    cert: fs.readFileSync('/home/artur/conf/web/api.sistema.gruporainha.com.br/ssl/api.sistema.gruporainha.com.br.pem'),
};

// Servidor HTTP
const httpServer = http.createServer(app);

// Servidor HTTPS
const httpsServer = https.createServer(sslOptions, app);

// Iniciar o servidor HTTP
httpServer.listen(portHttp, () => {
    console.log(`Servidor HTTP rodando em http://localhost:${portHttp}`);
});

// Iniciar o servidor HTTPS
httpServer.listen(portHttps, () => {
    console.log(`Servidor HTTPS rodando em https://localhost:${portHttps}`);
});
