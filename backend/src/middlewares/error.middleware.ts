import { ErrorRequestHandler } from "express";

const errorHandler:ErrorRequestHandler=(err,req,res,next)=>{
    res.status(500).send({
        status:false,
        message:err.message||"Sorry, Some error occured!"
    })
}

export default errorHandler