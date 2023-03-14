import { Request, Response } from "express";
import userService from "../services/user.service";
import assertionService from "../services/assertion.service";

const detail = async (req: Request, res: Response) => {
    // console.log("auth passed")
    let data=await userService.userDetail(res.locals.userId)
    res.status(200).send({
        success: true,
        message: "User details!",
        data:{
            userDetail:data,
            orgLogin:res.locals.orgLogin
        }
    });
};

const listBadge=async (req:Request,res:Response)=>{
    let {userId}=res.locals
    let badgeList=await assertionService.assertionList(userId)
    res.status(200).send({
        success:true,
        message:"Badges Fetched",
        data:badgeList
    })
}

export default {
    detail,
    listBadge
};
