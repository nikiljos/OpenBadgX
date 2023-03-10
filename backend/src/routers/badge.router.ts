import express from "express";
const router = express.Router();
import badgeController from "../controllers/badge.controller";

router.get("/",badgeController.listBadge)
router.post("/add",badgeController.createBadge)

router.get("/:badge_id/detail",badgeController.badgeDetail)

export default router