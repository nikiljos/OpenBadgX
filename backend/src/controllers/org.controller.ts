import { Request, Response } from "express";
import orgService from "../services/org.service";
import jwt from "../utils/jwt";

const createOrg=async (req:Request,res:Response)=>{
    let {key,name}=req.body;
    let adminUser=res.locals.userId;
    
    let validKey=await orgService.isKeyAvailable(key)
    let orgId=validKey&&await orgService.createOrg(key,name,adminUser)

    res.status(200).send({
        success:true,
        message:"Org created successfully!",
        data:{
            id:orgId
        }
    })
}

const listOrg=async (req:Request,res:Response)=>{
    let adminId=res.locals.userId
    let data=await orgService.listOrgs(adminId);
    res.status(200).send({
        success:true,
        message:"Org list",
        data
    })
}

const loginOrg=async (req:Request,res:Response)=>{
    let {userId}=res.locals
    let {orgId}=req.body
    let orgDetail=await orgService.isOrgAdmin(orgId,userId);
    let token=orgDetail&&await jwt.generateToken(userId,orgId);
    res.status(200).send({
        success:true,
        data:{
            accessToken:token,
            orgDetail
        }
    })
}

export default {
    createOrg,
    listOrg,
    loginOrg
}