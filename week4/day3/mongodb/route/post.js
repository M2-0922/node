import { Router } from "express";

import authentication from "../middleware/authentication.js"
import { getAllPosts, getPostById, createAPost, updatePost, deletePost } from "../controller/post.js"
import postOwner from "../middleware/postOwner.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authentication, createAPost);
router.put("/:id", authentication, postOwner, updatePost);
router.delete("/:id", authentication, postOwner, deletePost);

export default router;