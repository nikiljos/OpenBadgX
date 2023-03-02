import { Request, Response } from "express";
import badgeService from "../services/badge.service";

const createBadge=async (req:Request,res:Response)=>{
    let {title,desc}=req.body
    let {orgId}=res.locals;
    let badgeId=await badgeService.createBadge(title,desc,orgId)
    res.status(200).send({
        success:true,
        message:"Badge/Cert created successfully!",
        data:{
            badgeId
        }
    })
}

export default {
    createBadge
}