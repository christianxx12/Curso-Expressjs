// En las versiones modernas de Node.js ya no es necesario instalar dotenv
// si no usar el siguiente comando: node --env-file .env --watch app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send(`
    <h1>Curso Express.js V3</h1>
    <p>Esto es una aplicación node.js con express.js</p>
    <p>Corre en el puerto ${PORT}</p>
`);
});

app.get("/users/:id", (req, res) => {
  const userId = req.params.id;
  res.send(`Mostrar información del usuario con ID: ${userId}`);
});

app.get("/search", (req, res) => {
  const terms = req.query.termino || "No especificado";
  const category = req.query.categoria || "Todas";

  res.send(`
    <h2>Resultados de búsqueda:</h2>
    <p>Término: ${terms}</p>
    <p>Categoría: ${category}</p>
  `);
});

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
