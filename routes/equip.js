import express from "express";
import {
    getEquip,
    getTenEquipsWithSkip,
    createEquip,
    updateEquip,
    addComment,
    deleteEquip,
    getEquipById,
    addError
 } from "../controllers/equip.js";

const router = express.Router();

router.get("/", getEquip);
router.get("/ten/:skip", getTenEquipsWithSkip);
router.get("/:id", getEquipById);
router.post("/", createEquip);
router.patch("/:id", updateEquip);
router.patch("/comment/:id", addComment);
router.patch("/error/:id", addError);
router.delete("/:id", deleteEquip);

export default router;