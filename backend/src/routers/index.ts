import express,{Request,Response} from "express"
const router=express.Router()

import authMiddleware from "../middlewares/auth.middleware"
import genericRouter from "./generic.router"
import authRouter from "./auth.router"
import userRouter from "./user.router"
import orgRouter from "./org.router"
import badgeRouter from "./badge.router"

router.use(express.json())
router.use("/",genericRouter)
router.use("/auth",authRouter)
router.use("/user", authMiddleware.userAuth,userRouter);
router.use("/org", authMiddleware.userAuth, orgRouter);
router.use("/org/badge", authMiddleware.userAuth,authMiddleware.orgAuth, badgeRouter);

export default router