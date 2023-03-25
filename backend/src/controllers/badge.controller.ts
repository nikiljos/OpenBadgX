import { NextFunction, Request, Response } from "express";
import badgeService from "../services/badge.service";

const createBadge=async (req:Request,res:Response,next:NextFunction)=>{
    let {title,desc,template}=req.body
    if(!template || !template.id) next(new Error("Invalid image"))
    let {orgId}=res.locals;
    let badgeId=await badgeService.createBadge(title,desc,orgId,template.id,template.type)
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

const templateUpload=async(req:Request,res:Response)=>{
    if(!req.file) throw(new Error("No File"))
    res.status(200).send({
        success: true,
        message: "Upload Success!",
        data: {
            file: {
                id: req.file.filename,
                // type:req.file.mimetype.split("/")[1]
                type: req.file.mimetype,
            },
        },
    });
}

export default {
    createBadge,
    listBadge,
    templateUpload,
    badgeDetail
}