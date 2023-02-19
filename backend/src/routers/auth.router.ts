import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller";

router.post("/google", authController.googleAuth);

export default router;
