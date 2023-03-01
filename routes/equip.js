import express from "express";
import {
    getEquip,
    getTenEquipsWithSkip,
    createEquip,
    updateEquip,
    addComment,
    deleteEquip,
    getEquipById,
    addError,
    registerEquip,
    cancelEquip,
    searchEquip,
    resetEquip
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
router.patch("/register/:id", registerEquip);
router.patch("/cancel/:id", cancelEquip);
router.get("/search", searchEquip);
router.patch("/reset", resetEquip);

export default router;