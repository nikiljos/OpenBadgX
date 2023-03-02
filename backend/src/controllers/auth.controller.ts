import { NextFunction, Request,Response } from "express";
import { checkGoogleAuth,checkUser } from "../services/auth.service";
import jwt from "../utils/jwt"

const googleAuth=async (req:Request,res:Response,next:NextFunction)=>{
    let {gAuthToken}=req.body;
    let gData=await checkGoogleAuth(gAuthToken)

    let user=gData&&await checkUser(gData.email,gData.name,gData.picture)

    let accessToken=user&&await jwt.generateToken(user)
    
    accessToken&&res.status(200).send({
        success:true,
        message:"Authentication Successfull!",
        data:{
            accessToken
        }
    })
}

export default {
    googleAuth
}