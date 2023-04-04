import express from "express";
import awardController from "../../controllers/award.controller";
const router = express.Router();
import badgeController from "../../controllers/badge.controller";
import handleUpload from "../../middlewares/upload.middleware";
import rateLimit from "../../middlewares/rateLimit.middleware";

router.get("/",badgeController.listBadge)
router.post("/add",rateLimit, badgeController.createBadge)
router.post("/upload",handleUpload, badgeController.templateUpload);

router.get("/:badge_id/detail",badgeController.badgeDetail)
router.get("/:badge_id/assertions", awardController.listAssertions);
router.post("/:badge_id/award",rateLimit, awardController.awardBadge);

export default router