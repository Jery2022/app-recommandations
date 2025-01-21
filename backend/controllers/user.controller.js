import { createUser } from '../models/user.model.js';

export async function addUser(req, res) {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
}