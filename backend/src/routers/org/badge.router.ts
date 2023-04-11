import express from "express";
const router = express.Router();
import badgeController from "../../controllers/badge.controller";
import handleUpload from "../../middlewares/upload.middleware";
import {heavyRateLimit, uploadRateLimit} from "../../middlewares/rateLimit.middleware";

router.get("/",badgeController.listBadge)
router.post("/add",heavyRateLimit, badgeController.createBadge)
router.post("/upload",uploadRateLimit, handleUpload, badgeController.templateUpload);

export default router