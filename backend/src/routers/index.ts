import express from "express"
const router=express.Router()

import genericRouter from "./generic.router"

router.use("/",genericRouter)

export default router