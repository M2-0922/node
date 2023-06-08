import express from "express";
import { authentication } from "../middleware/authentication.js";
const router = express.Router();
import { getMe } from "../controller/userController.js";

// user routes
router.get("/me", authentication, getMe)

export default router;