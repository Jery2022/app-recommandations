import { Router } from 'express';
import { setMeeting, getMeetings, editMeeting, deleteMeeting } from '../controllers/meeting.controller.js'; 

const router = Router();

router.get("/", getMeetings);
router.post("/", setMeeting); 
router.put("/:id", editMeeting);
router.delete("/:id", deleteMeeting);

export default router;