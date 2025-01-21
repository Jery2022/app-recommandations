import { findAll, create, findById, deleteOne, update } from '../models/meeting.model.js';
import mongoose from 'mongoose';

export async function getMeetings(req, res) {
    try {
    const meetings = await findAll();
    res.status(200).json(meetings);
} catch (error) {
   // console.log(error);
    res.status(400).json({ message: "Erreur serveur" });    
    }
}

export async function setMeeting(req, res) {
   // console.log(req.body);
    if (!req.body.title || !req.body.date || !req.body.location) {
        return res.status(400).json({ message: "Données manquantes" });
    } 
    try { 
        
        let attendees = [];
        if (Array.isArray(req.body.attendees)) {
            attendees = req.body.attendees.map(attendee => new mongoose.Types.ObjectId(attendee));
        } else {
            return res.status(400).json({ message: "Les participants doivent être au moins deux (02)." });
        }

        const meeting = await create({
                title: req.body.title,
                content: req.body.content,
                location: req.body.location,
                date: req.body.date, 
                duration: req.body.duration,
                attendees: attendees,
            });
            console.log(meeting);
            res.status(201).json(meeting); 
    } catch (error) {
        console.error("Erreur lors de la création de la réunion:", error);
        res.status(500).json({ message: "Erreur lors de la création de la réunion" });    
    }
}

export async function editMeeting(req, res) {
    const meeting = await findById(req.params.id);
    if (!meeting) {
        return res.status(404).json({ message: "Réunion non trouvée !" });
    }   
    const updateMeeting = await update(meeting, req.body, { new: true });
    console.log(updateMeeting);
    res.status(200).json(updateMeeting); 
}

export async function deleteMeeting(req, res) {
    const meeting = await findById(req.params.id);
    if (!meeting) {
        return res.status(404).json({ message: "Réunion non trouvée !" });
    }   
    const dmeeting = await deleteOne({ _id: req.params.id });
    console.log(dmeeting);
    res.status(200).json({ message: "La réunion avec l'ID : "+req.params.id + " a été supprimée avec succès" }); 
}
