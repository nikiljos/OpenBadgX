import express from "express";
const router = express.Router();
import orgController from "../../controllers/org.controller";

router.get("/detail", orgController.detail);

export default router;
