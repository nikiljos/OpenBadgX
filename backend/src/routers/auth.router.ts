import express from "express";
const router = express.Router();
import authController from "../controllers/auth.controller";

router.post("/google", authController.googleAuth);
router.post("/mail/init",authController.mailAuthInit);
router.post("/mail/verify",authController.mailAuthVerify);

export default router;
