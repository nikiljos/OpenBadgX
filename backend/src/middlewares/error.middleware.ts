import { ErrorRequestHandler } from "express";

const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
    let statusCode=500
    if(err.statusCode) statusCode=err.statusCode
    res.status(statusCode).send({
        success:false,
        message:err.message||"Sorry, Some error occured!",
        data:null
    })
}

export default errorHandler