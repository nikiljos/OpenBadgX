import { Request,Response } from "express"
import awardService from "../services/award.service";

interface AwardBody{
    recipients:[UserDetail]
}
interface UserDetail {
    email: string;
    name: string;
}


const awardBadge=async (req:Request,res:Response)=>{
    let {recipients}:AwardBody=req.body
    let { badgeId } = res.locals;
    if(!Array.isArray(recipients)) throw new Error("Invalid list");
    let result=await awardService.batchAward(badgeId,recipients)
    res.status(200).send({
        success:true,
        message:"Awarded Successfully!",
        data:result
    })
}

const listAssertions=async(req:Request,res:Response)=>{
    let {badgeId}=res.locals
    let awardeeList=await awardService.listAwardees(badgeId)
    res.status(200).send({
        success:true,
        message:"Fetched successfully",
        data:awardeeList?.assertions
    })
}

export default {
    awardBadge,
    listAssertions
}