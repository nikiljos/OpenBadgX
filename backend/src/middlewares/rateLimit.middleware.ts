import { NextFunction, Request, Response } from "express";
import redis from "../config/redis.config"
import { APIError } from "../utils/error";
const redisClient=redis.client

const rateLimitEnabled=process.env.RATE_LIMIT_ENABLE==="true"
const heavyPerMinute=Number(process.env.HEAVY_REQ_PER_MINUTE)||60
const uploadPerMinute=Number(process.env.UPLOAD_PER_MINUTE)||5
const maxLoginResend=Number(process.env.MAX_LOGIN_RESEND)||2

const checkRate = async (key: string, maxValue:number, expiry: number) => {
    let reqCount = await redisClient.get(key);
    let count = Number(reqCount) || 0;
    if (count >= maxValue) return false;
    await redisClient.set(key, count + 1, {
        EX: expiry,
    });
    return true;
};

// for high impact routes like badge creation and awarding
// since mailing could be exploitted to spam list the service
export const heavyRateLimit=async (req:Request,res:Response,next:NextFunction)=>{
    if(!rateLimitEnabled) return next()
    const user=res.locals.userId
    const minute = new Date().getMinutes()
    const key = "post:"+user + ":" + minute;
    const inLimit=await checkRate(key,heavyPerMinute,120)
    if(!inLimit) throw(new APIError("Rate limit exceeded! Pls try after 1 minute",429))
    next()
}

// for controlling the amount of stale uploads to the server
export const uploadRateLimit=async (req:Request,res:Response,next:NextFunction)=>{
    if(!rateLimitEnabled) return next()
    const user=res.locals.userId
    const minute = new Date().getMinutes()
    const key = "file:"+user + ":" + minute;
    const inLimit=await checkRate(key,uploadPerMinute,120)
    if(!inLimit) throw(new APIError("Upload rate limit exceeded! Pls try after 1 minute",429))
    next()
}

// for controlling the number of verify mails 
// being sent to same user in a short interval
export const mailLoginRateLimit=async (req:Request,res:Response,next:NextFunction)=>{
    if(!rateLimitEnabled) return next()
    const user=req.body.email
    const tenthMinute=Math.floor(new Date().getMinutes()/10)*10
    const key = "loginMail:"+user+":"+tenthMinute;
    const inLimit=await checkRate(key,maxLoginResend,11*60)
    if(!inLimit) throw(new APIError("You exceeded the maximum number of resends. Pls try after 10 mins",429))
    next()
}