require('dotenv').config();
const fs = require('fs');
//const https = require('https');
const http = require('http');
const app = require('./src/app');

// Portas do .env
const portHttp = process.env.PORT || 8095; // Porta para HTTP
/* const portHttps = process.env.PORT_SSL || 8095; // Porta para HTTPS
const url = process.env.URL;
 */
// Caminhos para os arquivos do certificado SSL
/* const sslOptions = {
  key: fs.readFileSync('D:\\win-acme\\Arquivos\\private-key.pem'), // Caminho para sua chave privada
  cert: fs.readFileSync('D:\\win-acme\\Arquivos\\certificate.pem'), // Caminho para o certificado
  ca: fs.readFileSync('D:\\win-acme\\Arquivos\\chain.pem') // Caminho para a cadeia de certificados
}; */

// Servidor HTTP
const httpServer = http.createServer(app);

/* // Servidor HTTPS
const httpsServer = https.createServer(sslOptions, app);
 */
// Iniciar o servidor HTTP (independente)
httpServer.listen(portHttp, () => {
  console.log(`Servidor HTTP rodando em https://localhost:${portHttp}`);
});

/* // Iniciar o servidor HTTPS (independente)
httpsServer.listen(portHttps, () => {
  console.log(`Servidor HTTPS rodando em https://itatiba.rainhadassete.com.br:${portHttps}`);
});
 */
