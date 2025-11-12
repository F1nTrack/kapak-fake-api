const jsonServer = require('json-server');
const path = require('path'); // <-- 1. Importa el módulo 'path'
const server = jsonServer.create();
// 2. Crea la ruta absoluta usando path.join() y __dirname
const router = jsonServer.router(path.join(__dirname, 'fixtures/db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

// Puerto 4000 para local
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});