import express from "express";
const router = express.Router();
import badgeController from "../controllers/badge.controller";

router.get("/",badgeController.listBadge)
router.post("/add",badgeController.createBadge)

export default router