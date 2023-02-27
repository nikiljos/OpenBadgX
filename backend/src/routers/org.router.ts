import express from "express";
const router = express.Router();
import orgController from "../controllers/org.controller";

router.get("/",orgController.listOrg)
router.post("/",orgController.createOrg)

export default router