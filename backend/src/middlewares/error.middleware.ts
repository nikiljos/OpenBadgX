import { ErrorRequestHandler } from "express";

const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
    res.status(500).send({
        success:false,
        message:err.message||"Sorry, Some error occured!",
        data:null
    })
}

export default errorHandler