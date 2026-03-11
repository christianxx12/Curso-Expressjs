// En las versiones modernas de Node.js ya no es necesario instalar dotenv
// si no usar el siguiente comando: node --env-file .env --watch app.js
require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Curso Express.js V3</h1>
    <p>Esto es una aplicación node.js con express.js</p>
    <p>Corre en el puerto ${PORT}</p>
`);
});

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
