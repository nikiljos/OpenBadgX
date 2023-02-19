import express from "express";
const router = express.Router();
import userController from "../controllers/user.controller";

router.get("/detail", userController.detail);

export default router;
