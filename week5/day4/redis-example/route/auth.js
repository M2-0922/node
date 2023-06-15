import { Router } from 'express';

// import middlewares
// import { authenticate } from '../middleware/authenticate.js';

// import controller
import { register, login, logout, refresh } from '../controller/auth.js';

// initialize router
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refresh", refresh);

export default router;