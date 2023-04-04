import { NextFunction, Request, Response } from "express";
import redis from "../config/redis.config"
import { APIError } from "../utils/error";
const redisClient=redis.client

const rateLimitEnabled=process.env.RATE_LIMIT_ENABLE==="true"
const reqPerMinute=Number(process.env.MAX_REQ_PER_MINUTE)||0

const rateLimit=async (req:Request,res:Response,next:NextFunction)=>{
    if(!rateLimitEnabled) return next()
    const user=res.locals.userId
    const minute = new Date().getMinutes()
    const key = user + ":" + minute;
    let reqCount=await redisClient.get(key)
    let count=Number(reqCount)||0
    if(count>=reqPerMinute) throw(new APIError("Rate Limit Exceeded, Please try after 1 minute.",429)) 
    await redisClient.set(key,count+1,{
        EX:120
    })
    next() 
}

export default rateLimit