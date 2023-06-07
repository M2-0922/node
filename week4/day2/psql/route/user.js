import { Router } from "express";
import { createUser, getUsers, getUserById } from "../controller/user.js"

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);

// TODO: write update and delete routes

export default router;