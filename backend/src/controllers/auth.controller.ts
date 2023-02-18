import { Request,Response } from "express";

const googleAuth=(req:Request,res:Response)=>{
    //TODO: Get auth token from google, verify with google OAuth lib, and do login/signup
    res.status(200).send({
        status:true,
        message:"Pong"
    })
}

export default {
    googleAuth
}