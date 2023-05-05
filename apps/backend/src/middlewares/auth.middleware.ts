import { NextFunction,Request,Response } from "express";
import badgeService from "../services/badge.service";
import { APIError } from "../utils/error";
import jwt from "../utils/jwt"

const userAuth=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers.authorization||typeof req.headers.authorization!=="string"){
        return next(new APIError("Invalid Auth Header",401,"invalid_token"))
    }
    let token=req.headers.authorization!.split(" ")[1]
    jwt.checkToken(token,"accesstoken")
        .then((data) => {
            res.locals.userId = data.sub;
            res.locals.tokenExpiry=data.exp;
            if(data.org){
                res.locals.orgLogin=true;
                res.locals.orgId=data.org;
            }
            else{
                res.locals.orgLogin=false;
            }
            next()
        })
        .catch((err) => next(new APIError(err.message,401,"invalid_token")));
}

const orgAuth=(req:Request,res:Response,next:NextFunction)=>{
    if(res.locals.orgLogin){
        next();
    }
    else{
        next(new APIError("Please login to an org!",403))
    }
}

const badgeAuth=async (req:Request,res:Response,next:NextFunction)=>{
    let { badge_id: badgeId } = req.params;
    let { orgId } = res.locals;
    if(!badgeId) next(new APIError("Invalid Badge ID",400))
    const checkOwner = await badgeService.badgeDetail(orgId, badgeId);
    if (!checkOwner) next(new APIError("Invalid Badge / UnAuthorized", 403));
    res.locals.badgeId=badgeId
    next()
}

export default {
    userAuth,
    orgAuth,
    badgeAuth
}