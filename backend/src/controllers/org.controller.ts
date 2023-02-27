import { Request, Response } from "express";
import orgService from "../services/org.service";

const createOrg=async (req:Request,res:Response)=>{
    let {key,name}=req.body;
    let adminUser=res.locals.userId;
    
    let validKey=await orgService.isKeyAvailable(key)
    let orgId=validKey&&await orgService.createOrg(key,name,adminUser)

    res.status(200).send({
        status:true,
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
        status:true,
        message:"Org list",
        data
    })
}

export default {
    createOrg,
    listOrg
}