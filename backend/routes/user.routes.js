import { Router } from 'express';
import { setUser, getUsers, editUser, deleteUser } from '../controllers/user.controller.js';

const router = Router();

router.post("/", setUser);
router.get("/", getUsers);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

export default router;