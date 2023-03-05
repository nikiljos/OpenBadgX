import { NextFunction,Request,Response } from "express";
import jwt from "../utils/jwt"

const userAuth=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers.authorization||typeof req.headers.authorization!=="string"){
        return next(new Error("Invalid Auth header"))
    }
    let token=req.headers.authorization!.split(" ")[1]
    jwt.checkToken(token)
        .then((data) => {
            res.locals.userId = data.userId;
            if(data.orgId){
                res.locals.orgLogin=true;
                res.locals.orgId=data.orgId;
            }
            next()
        })
        .catch((err) => next(new Error("Invalid Token")));
}

const orgAuth=(req:Request,res:Response,next:NextFunction)=>{
    if(res.locals.orgLogin){
        next();
    }
    else{
        next(new Error("Please login to an org!"))
    }
}

export default {
    userAuth,
    orgAuth
}