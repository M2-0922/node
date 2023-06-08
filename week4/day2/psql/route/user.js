import { Router } from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser } from "../controller/user.js"

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);


// TODO: write update and delete routes
router.post("/:id", deleteUser);
router.get("/:id", deleteUser);
export default router;