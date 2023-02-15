import express from "express";
import { register, login, checkAdmin, checkUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/check/user", checkUser);
router.get("/check/admin", checkAdmin);

export default router;
