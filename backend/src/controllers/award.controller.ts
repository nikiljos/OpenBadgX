import { Request,Response } from "express"
import awardService from "../services/award.service";
import badgeService from "../services/badge.service";

interface AwardBody{
    recipients:[UserDetail]
}
interface UserDetail {
    email: string;
    name: string;
}


const awardBadge=async (req:Request,res:Response)=>{
    let {recipients}:AwardBody=req.body
    let {badge_id:badgeId}=req.params
    let {orgId}=res.locals
    if(!Array.isArray(recipients)) throw new Error("Invalid list");
    let result=await awardService.batchAward(badgeId,orgId,recipients)
    res.status(200).send({
        success:true,
        message:"Awarded Successfully!",
        data:result
    })
}

const listAssertions=async(req:Request,res:Response)=>{
    let { badge_id: badgeId } = req.params;
    let {orgId}=res.locals
    let awardeeList=await awardService.listAwardees(badgeId,orgId)
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