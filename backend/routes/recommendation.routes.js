import { Router } from 'express';
import { 
    createRecommendation, 
    getRecommendation, 
    getAllRecommendations, 
    updateRecommendation, 
    deleteRecommendation } from '../controllers/recommendation.controller.js'; 

const router = Router();

router.post("/", createRecommendation); 
router.get("/", getAllRecommendations);
router.get("/:id", getRecommendation);
router.put("/:id", updateRecommendation);
router.delete("/:id", deleteRecommendation);

export default router;