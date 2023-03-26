import { NextFunction, Request,Response } from "express";
import { checkGoogleAuth,handleUser,sendMailToken } from "../services/auth.service";
import { APIError } from "../utils/error";
import jwt from "../utils/jwt"

const googleAuth=async (req:Request,res:Response,next:NextFunction)=>{
    let {gAuthToken}=req.body;
    let gData=await checkGoogleAuth(gAuthToken)

    let user=gData&&await handleUser(gData.email,"google",gData.name,gData.picture)

    let accessToken=user&&await jwt.generateToken(user.id,"accesstoken","1d")
    
    accessToken&&res.status(200).send({
        success:true,
        message:"Authentication Successfull!",
        data:{
            accessToken
        }
    })
}

const mailAuthInit=async (req:Request,res:Response)=>{
    let {email,name}=req.body
    if(!email){
        throw new APIError("Invalid Email",400)
    }
    let user=await handleUser(email,"email",name);
    let mailToken=await jwt.generateToken(user.id,"mailtoken","10m")
    await sendMailToken(mailToken,email,user.name)

    res.status(200).send({
        success:true,
        message:"Verification mail sent!"
    })
}

const mailAuthVerify=async (req:Request,res:Response)=>{
    let {mailToken}=req.body
    let user=await jwt.checkToken(mailToken,"mailtoken");
    let accessToken =
        user.sub && (await jwt.generateToken(user.sub, "accesstoken", "1d"));
    accessToken &&
        res.status(200).send({
            success: true,
            message: "Authentication Successfull!",
            data: {
                accessToken,
            },
        });
}

export default {
    googleAuth,
    mailAuthInit,
    mailAuthVerify
}