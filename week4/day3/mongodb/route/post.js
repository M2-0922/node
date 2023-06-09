import { Router } from "express";

import authentication from "../middleware/authentication.js";
import matchid from "../middleware/matchid.js";
import { getAllPosts, getPostById, createAPost, updatePost, deletePost } from "../controller/post.js";

const router = Router();

router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.post("/", authentication, createAPost);
router.put("/:id", authentication, matchid, updatePost);
router.delete("/:id", authentication, matchid, deletePost)

export default router;