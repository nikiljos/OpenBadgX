import express from "express";
import awardController from "../../controllers/award.controller";
const router = express.Router();
import badgeController from "../../controllers/badge.controller";
import handleUpload from "../../middlewares/upload.middleware";
import {heavyRateLimit, uploadRateLimit} from "../../middlewares/rateLimit.middleware";

router.get("/detail",badgeController.badgeDetail)
router.get("/assertions", awardController.listAssertions);
router.post("/award",heavyRateLimit, awardController.awardBadge);

router.put("/detail",badgeController.badgeDetailUpdate);
router.put("/template",uploadRateLimit,handleUpload,badgeController.templateUpdate);
router.delete("/", badgeController.deleteBadge);

export default router