import { NextFunction, Request, Response } from "express";
import badgeService from "../services/badge.service";
import { APIError } from "../utils/error";

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
    let { orgId,badgeId } = res.locals;
    let detail=await badgeService.badgeDetail(orgId,badgeId)
    res.status(200).send({
        success:true,
        message:"Badge Details",
        data:detail||null
    })
}

const badgeDetailUpdate=async(req:Request,res:Response)=>{
    let { orgId,badgeId } = res.locals;
    let {title,desc} = req.body;
    const checkOwner = await badgeService.badgeDetail(orgId, badgeId);
    if (!checkOwner) throw new APIError("Invalid Badge/UnAuthorized", 403);
    await badgeService.updateBadgeDetail(badgeId,{
        title,
        desc
    })
    res.status(200).send({
        success:true,
        message:"Updated Successfully...",
        data:null
    })
}

const deleteBadge=async(req:Request,res:Response)=>{
    let { badgeId } = res.locals;
    await badgeService.deleteBadge(badgeId)
    res.status(200).send({
        success:true,
        message:"Badge deleted successfully."
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
                type: req.file.mimetype,
            },
        },
    });
}

const templateUpdate=async(req:Request,res:Response)=>{
    if(!req.file) throw new Error("No File");
    let { badgeId } = res.locals;
    let updateDetail=await badgeService.updateTemplate(badgeId,req.file.filename,req.file.mimetype)
    res.status(200).send({
        success:true,
        message:"Tempalte update successfully",
        data:updateDetail||null
    })
}

export default {
    createBadge,
    listBadge,
    templateUpload,
    templateUpdate,
    badgeDetail,
    deleteBadge,
    badgeDetailUpdate
}