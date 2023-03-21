import { Request,Response,NextFunction } from "express";
import multer, { FileFilterCallback } from "multer";

const fileFilter=(req:Request,file:Express.Multer.File,cb:FileFilterCallback)=>{
    if(!(file.mimetype === "image/png"||file.mimetype === "image/jpeg"||file.mimetype === 'image/jpg')){
        cb(null,false)
    }
    cb(null,true)
}


const handleUpload=(req:Request,res:Response,next:NextFunction)=>{
    const upload = multer({
        dest:"tmp/uploads/templates",
        fileFilter,
        limits: {
            fileSize: 1005*1000,
        },
    }).single("template");

    upload(req,res,(err)=>{
        if(err){
            next(new Error(err))
        }
        next()
    })
}

export default handleUpload

