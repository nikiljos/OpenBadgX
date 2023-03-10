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

const listBadge=async (req:Request,res:Response)=>{
    let { orgId } = res.locals;
    let badgeList=await badgeService.listBadge(orgId)
    res.status(200).send({
        success:true,
        message:"Badge List",
        data:badgeList
    })
}

const badgeDetail=async(req:Request,res:Response)=>{
    let {badge_id:badgeId}=req.params
    let { orgId } = res.locals;
    let detail=await badgeService.badgeDetail(orgId,badgeId)
    res.status(200).send({
        success:true,
        message:"Badge Details",
        data:detail||null
    })
}

export default {
    createBadge,
    listBadge,
    badgeDetail
}