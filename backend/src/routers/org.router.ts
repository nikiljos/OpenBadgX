import express from "express";
const router = express.Router();
import orgController from "../controllers/org.controller";

router.get("/",orgController.listOrg)
router.post("/add",orgController.createOrg)
router.post("/login",orgController.loginOrg)

export default router