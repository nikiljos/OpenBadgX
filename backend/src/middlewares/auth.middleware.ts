import { NextFunction,Request,Response } from "express";
import jwt from "../utils/jwt"

const userAuth=(req:Request,res:Response,next:NextFunction)=>{
    if(!req.headers.authorization||typeof req.headers.authorization!=="string"){
        next(new Error("Invalid Auth header"))
    }
    let token=req.headers.authorization!.split(" ")[1]
    jwt.checkToken(token)
        .then((data) => {
            res.locals.userId = data.userId;
            next()
        })
        .catch((err) => next(new Error("Invalid Token")));
}

export default {
    userAuth
}