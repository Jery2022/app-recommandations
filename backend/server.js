const express = require('express');
const connectDb = require('./config/db').default;
const dotenv = require('dotenv').config();
const port = 5000;

// Connexion à la base de données
connectDb();

const app = express();

// middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/post", require("./routes/post.routes.js"));

// lancer le serveur
app.listen(port, () => {
  console.log("Le server a démarré au port : " + port);
});