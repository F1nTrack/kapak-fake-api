// server.js (AHORA SÍ, VERSIÓN FINAL)

const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors'); // <--- 1. Importa CORS

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'fixtures/db.json'));
const middlewares = jsonServer.defaults();

// 👇 2. AQUÍ ESTÁ EL CAMBIO
const allowedOrigins = [
  'https://f1ntrack-page.web.app',     // La URL antigua
  'http://localhost:5174',             // Tu localhost
  'https://f1ntracktry.web.app'        // <-- ¡TU NUEVA URL!
];

server.use(cors({
  origin: function (origin, callback) {
    // Permite peticiones sin 'origin' (como las de Postman o apps móviles) o si el origen está en la lista blanca
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
// ----------------------------------------------------

// El resto de tu código
server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});