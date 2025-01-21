import express from 'express';
//import postRoutes from './routes/post.routes.js';
import meetingRoutes from './routes/meeting.routes.js';
import userRoutes from './routes/user.routes.js';
import connectDb from './config/db.js';
import dotenv from 'dotenv';

dotenv.config(); // permet de lire les variables d'environnement du fichier .env

const port = process.env.PORT || 5000;

const app = express(); // initialisation de l'application express

connectDb(); // Connexion à la base de données 



// middleware qui permet de traiter les données de la Request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
//app.use("/api/post", postRoutes);
app.use("/api/meetings", meetingRoutes);

// lancer le serveur
app.listen(port, () => {
  console.log("Le server a démarré au port : " + port);
});