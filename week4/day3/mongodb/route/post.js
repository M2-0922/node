import { Router } from "express";

import authentication from "../middleware/authentication.js"
import { getAllPosts, getPostById, createAPost, updatePost, deletePost } from "../controller/post.js"
import checkOwner from "../middleware/checkOwner.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authentication, createAPost);
router.put("/:id", authentication, checkOwner, updatePost);
router.delete("/:id", authentication,checkOwner, deletePost)

export default router;