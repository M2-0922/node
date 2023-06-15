import { Router } from "express";
import { getMe } from "../controller/user.js";

import { authenticate } from "../middleware/authenticate.js";
const router = Router();

router.get("/", authenticate, getMe);

export default router;