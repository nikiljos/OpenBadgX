import { Request,Response } from "express";

const ping=async (req:Request,res:Response)=>{
    res.status(200).send({
        success:true,
        message:"Pong",
        data:null
    })
}

export default {
    ping
}