import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUserById } from "../controller/user.js"

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

// TODO: write update and delete routes
router.put('/:id', updateUser);
router.delete('/:id', deleteUserById);

export default router;