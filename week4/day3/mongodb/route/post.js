import { Router } from "express";

import authentication from "../middleware/authentication.js"
import checkUser from "../middleware/checkUser.js";
import { getAllPosts, getPostById, createAPost, updatePost, deletePost } from "../controller/post.js"

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authentication, createAPost);
router.put("/:id", authentication, checkUser, updatePost);
router.delete("/:id", authentication, checkUser, deletePost)

export default router;