import express from "express";
import awardController from "../../controllers/award.controller";
const router = express.Router();
import badgeController from "../../controllers/badge.controller";
import handleUpload from "../../middlewares/upload.middleware";
import {heavyRateLimit, uploadRateLimit} from "../../middlewares/rateLimit.middleware";

router.get("/",badgeController.listBadge)
router.post("/add",heavyRateLimit, badgeController.createBadge)
router.post("/upload",uploadRateLimit, handleUpload, badgeController.templateUpload);

router.get("/:badge_id/detail",badgeController.badgeDetail)
router.get("/:badge_id/assertions", awardController.listAssertions);
router.post("/:badge_id/award",heavyRateLimit, awardController.awardBadge);

export default router