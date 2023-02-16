import express from "express";
import { getUserById } from "../controllers/user.js";

const router = express.Router();

router.get("/:id", getUserById);

export default router;