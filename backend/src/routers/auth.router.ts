import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller";
import { mailLoginRateLimit } from "../middlewares/rateLimit.middleware";

router.post("/google", authController.googleAuth);
router.post("/mail/init", mailLoginRateLimit ,authController.mailAuthInit);
router.post("/mail/verify",authController.mailAuthVerify);

export default router;
