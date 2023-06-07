import { Router } from "express";
import { getAllUsers, createUser, updateUser, deleteUser } from "../controller/user.js"

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;