import fs from "fs";
import { Types } from "mongoose"
import Badge from "../models/badge.model"
import s3 from "../utils/s3";

const createBadge=(title:string,desc:string,org:string,fileName:string,fileType:string)=>new Promise(async(resolve,reject)=>{
    const _id=new Types.ObjectId()
    const filePath = "tmp/uploads/templates";
    const fileKey=_id+"."+fileType
    const s3Response=await s3
        .uploadFile(filePath, fileName, "templates/" + fileKey)
        .catch((err) => reject(err));
    s3Response&&fs.unlink(filePath+"/"+fileName,()=>{
        // console.log("deleted",fileName)
    })
    s3Response &&
        Badge.create({
            _id,
            title,
            desc,
            org,
            template: fileKey,
        })
            .then((data) => {
                if (data) {
                    resolve(data._id);
                } else {
                    reject(new Error("Unable to create"));
                }
            })
            .catch((err) => reject(err));
})

const listBadge=(org:string)=>Badge.find({
    org
})
.select("title desc template")

const badgeDetail = (org: string,badge:string) =>
    Badge.findOne({
        org,
        _id:badge
    }).select("title desc template");

export default {
    createBadge,
    listBadge,
    badgeDetail
}