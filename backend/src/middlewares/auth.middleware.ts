import { NextFunction,Request,Response } from "express";
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

export default {
    userAuth,
    orgAuth
}