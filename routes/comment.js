import express from "express";
import { getCommentById } from "../controllers/comment.js";

const router = express.Router();

router.get("/:id", getCommentById);

export default router;