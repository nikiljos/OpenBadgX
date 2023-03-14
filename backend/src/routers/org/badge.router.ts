import express from "express";
import awardController from "../../controllers/award.controller";
const router = express.Router();
import badgeController from "../../controllers/badge.controller";

router.get("/",badgeController.listBadge)
router.post("/add",badgeController.createBadge)

router.get("/:badge_id/detail",badgeController.badgeDetail)
router.post("/:badge_id/award", awardController.awardBadge);

export default router