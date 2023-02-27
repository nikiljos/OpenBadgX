import { Request,Response } from "express";

const ping=async (req:Request,res:Response)=>{
    res.status(200).send({
        status:true,
        message:"Pong"
    })
}

export default {
    ping
}