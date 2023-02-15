import express from "express";
import { getErrorById } from "../controllers/error.js";

const router = express.Router();

router.get("/:id", getErrorById);

export default router;