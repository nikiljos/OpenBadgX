import { Request,Response } from "express";

const ping=(req:Request,res:Response)=>{
    res.status(200).send({
        status:true,
        message:"Pong"
    })
}

export default {
    ping
}