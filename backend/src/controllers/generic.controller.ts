import { Request,Response } from "express";
import userService from "../services/user.service";
import { APIError } from "../utils/error";
import jwt from "../utils/jwt";

const ping=async (req:Request,res:Response)=>{
    res.status(200).send({
        success:true,
        message:"Pong",
        data:null
    })
}

const mailUnsub=async (req:Request,res:Response)=>{
    let {secret} =req.body;
    if(!secret) throw new APIError("No token found!",400)
    const data=await jwt.checkToken(secret,"mail_unsub",true)
    const updateRes=data.sub&&await userService.updateMailPreference(data.sub,true)
    updateRes&&res.status(200).send({
        success:true,
        message:"Unsubscribe successful.",
        data:null
    })
}

export default {
    ping,
    mailUnsub
}