import express from "express";
const router = express.Router();
import orgController from "../../controllers/org.controller";

router.get("/detail", orgController.detail);
router.put("/detail", orgController.updateDetail);

export default router;
