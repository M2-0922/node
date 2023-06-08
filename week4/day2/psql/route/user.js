import { Router } from "express";
import { createUser, getUsers, getUserById, updataUserById, deleteUserById } from "../controller/user.js"

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updataUserById);
router.delete("/:id", deleteUserById);

// TODO: write update and delete routes

export default router;