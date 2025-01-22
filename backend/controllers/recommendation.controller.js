import { findAll, create, findById, deleteOne, update } from '../models/recommendation.model.js';
import mongoose from 'mongoose';


export async function createRecommendation(req, res) {
    if (!req.body.content || !req.body.meeting || !req.body.finishTo || !req.body.assignedTo ) {
        return res.status(400).json({ message: "Données manquantes" });
    } 
    try {
        const newRecommendation = await create(req.body);
        console.log(newRecommendation);
        res.status(201).json(newRecommendation);
    } catch (error) {
        console.error("Erreur lors de la création de la récommendation : ", error.message);
       // res.status(400).json({ message: error.message });
        res.status(500).json({ message: "Erreur lors de la création de la récommendation" });   
    }
};

export async function getAllRecommendations(req, res) {
    try {
    const recommendations = await findAll();
    res.status(200).json(recommendations);
} catch (error) {
    console.error("Erreur lors de la recherche des récommendations : ", error);
    res.status(400).json({ message: "Erreur serveur" });    
    }
}

export async function getRecommendation(req, res) {
    try {
    const recommendation = await findById(req.params.id);
    if (!recommendation) {
        return res.status(404).json({message : "Recommendation non trouvée" })
    }
    res.status(200).json(recommendation);
} catch (error) {
    console.error("Erreur lors de la recherche de la récommendation : ", error);
    res.status(400).json({ message: "Erreur serveur" });    
    }
}

export async function updateRecommendation(req, res) {
    try {
        const updateRecommendation = await update(req.params.id, req.body);
        if (!updateRecommendation) {
            return res.status(404).json({ message: "Récommendation non trouvée !" });
        }
        res.status(200).json(updateRecommendation);      
} catch (error) 
    { 
        console.error("Erreur lors de la mise à jour de la récommendation : ", error);
        res.status(400).json({message: error.message }); 
    }
}

export async function deleteRecommendation(req, res) {
    try {
        const recommendation = await findById(req.params.id);
        if (!recommendation) {
            return res.status(404).json({ message: "Récommendation non trouvée !" });
        } 
        const deleteRecommendation = await deleteOne({ _id: req.params.id });
        res.status(200).json(
            { message: "La récommendation avec l'ID : "+req.params.id + " a été supprimée avec succès" });   

    } catch {
        console.error("Erreur lors de la suppression de la récommendation : ", error);
        res.status(500).json({ message: error.message });
      }
}
