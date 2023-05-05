import express from "express";
const router = express.Router();
import genericController from "../controllers/generic.controller";
import verifyController from "../controllers/verify.controller"

router.get("/ping",genericController.ping)
router.get("/detail/:id",verifyController.assertionDetail)
router.post("/mail/unsubscribe",genericController.mailUnsub)

export default router