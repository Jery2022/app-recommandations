import { find, create } from '../models/meeting.model.js';

export async function getMeetings(req, res) {
    try {
    const meetings = await find();
    res.status(200).json(meetings);
} catch (error) {
   // console.log(error);
    res.status(400).json({ message: "Erreur serveur" });    
    }
}

export async function setMeeting(req, res) {
    console.log(req.body);
    if (!req.body.title || !req.body.date || !req.body.location) {
        return res.status(400).json({ message: "Données manquantes" });
    } 
    try { 
        const attendees = req.body.attendees.map(attendee => mongoose.Types.ObjectId(attendee));
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
    const meeting = await MeetingModel.findById(req.params.id);
    if (!meeting) {
        return res.status(404).json({ message: "Réunion non trouvée !" });
    }   
    const updateMeeting = await MeetingModel.findByIdAndUpdate(meeting, req.body, { new: true });
    res.status(200).json(updateMeeting); 
}

export async function deleteMeeting(req, res) {
    const meeting = await MeetingModel.findById(req.params.id);
    if (!meeting) {
        return res.status(404).json({ message: "Réunion non trouvée !" });
    }   
    const dmeeting = await MeetingModel.deleteOne({ _id: req.params.id });
    console.log(dmeeting);
    res.status(200).json({ message: "La réunion avec l'ID "+req.params.id + " supprimé avec succès" }); 
}
