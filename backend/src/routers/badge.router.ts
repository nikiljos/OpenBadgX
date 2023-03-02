import express from "express";
const router = express.Router();
import badgeController from "../controllers/badge.controller";

// router.get("/",orgController.listOrg)
router.post("/add",badgeController.createBadge)

export default router