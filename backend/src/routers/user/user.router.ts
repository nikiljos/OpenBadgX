import express from "express";
const router = express.Router();
import userController from "../../controllers/user.controller";

router.get("/detail", userController.detail);
router.put("/detail",userController.updateDetail)
router.get("/badge", userController.listBadge);

export default router;