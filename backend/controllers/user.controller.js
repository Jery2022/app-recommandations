import bcrypt from 'bcrypt';
import { create, findAll, update, deleteOne, findById } from '../models/user.model.js';

export async function setUser(req, res) {
    try {
        const user = await create(req.body);
        res.status(201).json(user);
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur:", error);
        res.status(500).json({ message: "Erreur lors de la création de l'utilisateur" });
    }
}

export async function getUsers(req, res) {
    try {
    const users = await findAll();
    res.status(200).json(users);
} catch (error) {
    console.log(error);
    res.status(400).json({ message: "Erreur serveur" });    
    }
}

/*
export async function editUser(req, res) {
    const user = await findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé !" });
    }   
    const updateUser = await update(user, req.body, { new: true });
    res.status(200).json(updateUser); 
}
*/

export async function editUser(req, res) {
    const user = await findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé !" });
    }

    // Vérifiez si le mot de passe a été modifié
    if (req.body.password) {
        // Hash le nouveau mot de passe
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const updateUser = await update(user, req.body, { new: true });
    res.status(200).json(updateUser); 
}



export async function deleteUser(req, res) {
    const user = await findById(req.params.id);
    if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé !" });
    }   
    const deleteOneUser = await deleteOne({ _id: req.params.id });
    console.log(deleteOneUser);
    res.status(200).json({ message: "L'utilisateur avec l'ID : "+req.params.id + " a été supprimé avec succès" }); 
}