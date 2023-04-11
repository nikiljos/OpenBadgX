import express,{Request,Response} from "express"
const router=express.Router()

import authMiddleware from "../middlewares/auth.middleware"
import genericRouter from "./generic.router"
import authRouter from "./auth.router"
import userRouter from "./user/user.router"
import userOrgRouter from "./user/org.router"
import orgRouter from "./org/org.router"
import orgBadgeRouter from "./org/badge.router"
import orgBadgeIdRouter from "./org/badgeId.router"

router.use(express.json())
router.use("/",genericRouter)
router.use("/auth",authRouter)

router.use("/user", authMiddleware.userAuth,userRouter);
router.use("/user/org", authMiddleware.userAuth, userOrgRouter);

router.use("/org", authMiddleware.userAuth, authMiddleware.orgAuth,orgRouter);
router.use("/org/badge", authMiddleware.userAuth,authMiddleware.orgAuth, orgBadgeRouter);
router.use("/org/badge/:badge_id",authMiddleware.userAuth,authMiddleware.orgAuth,authMiddleware.badgeAuth, orgBadgeIdRouter)

export default router