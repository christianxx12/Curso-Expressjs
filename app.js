// En las versiones modernas de Node.js ya no es necesario instalar dotenv
// si no usar el siguiente comando: node --env-file .env --watch app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, "users.json");

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

app.post("/form", (req, res) => {
  const name = req.body.nombre || "Anónimo";
  const email = req.body.email || "No proporcionado";
  res.json({
    message: "Datos recibidos",
    data: {
      name,
      email,
    },
  });
});

app.post("/api/data", (req, res) => {
  const data = req.body;
  if (!data || Object.keys(data).length === 0) {
    return res.status(400).json({ error: "No se proporcionaron datos" });
  }

  res.status(201).json({
    message: "Datos JSON recibidos",
    data,
  });
});

app.get("/users", (req, res) => {
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error con conexión de datos." });
    }
    const users = JSON.parse(data);
    res.json(users);
  });
});

app.post("/users", (req, res) => {
  const newUser = req.body;
  if (!newUser.name || newUser.name.length < 3) {
    return res
      .status(400)
      .json({ error: "El nombre debe tener al menos 3 caracteres" });
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!newUser.email || !emailRegex.test(newUser.email)) {
    return res.status(400).json({ error: "Email no válido" });
  }
  fs.readFile(usersFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error con conexión de datos." });
    }
    const users = JSON.parse(data);
    users.push(newUser);
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Error al guardar el usuario." });
      }
      res.status(201).json(newUser);
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor: http://localhost:${PORT}`);
});
