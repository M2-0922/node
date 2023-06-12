import { Router } from "express";

import authentication from "../middleware/authentication.js"
import { createComment, deleteComment, createLike, deleteLike } from "../controller/comment.js";

const router = Router();

router.post("/:id", authentication, createComment);
router.delete("/:id", authentication, deleteComment);
router.put("/like/:id", authentication, createLike);
router.delete("/like/:id", authentication, deleteLike);


export default router;