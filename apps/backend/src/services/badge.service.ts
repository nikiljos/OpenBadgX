import fs from "fs";
import { Types } from "mongoose"
import Badge from "../models/badge.model"
import { APIError } from "../utils/error";
import s3 from "../utils/s3";

const filePath = "tmp/uploads/templates";

interface BadgeUpdateData{
    title:string|undefined;
    desc:string|undefined;
}

const createBadge=(title:string,desc:string,org:string,fileName:string,fileType:string)=>new Promise(async(resolve,reject)=>{
    const _id=new Types.ObjectId()
    // const fileKey=_id+"."+fileType
    const fileKey = _id
    const s3Response=await s3
        .uploadFile(filePath, fileName, "templates/" + fileKey,fileType)
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

const updateTemplate=(badgeId:string,fileName:string,fileType:string)=>new Promise(async (resolve,reject)=>{
    const s3Response = await s3
        .uploadFile(filePath, fileName, "templates/" + badgeId, fileType)
        .catch((err) => reject(err));
    s3Response &&
        fs.unlink(filePath + "/" + fileName, () => {
            // console.log("deleted",fileName)
        });
    Badge.findByIdAndUpdate(badgeId,{
        template:badgeId
    })
    .then(res=>{
        resolve({
            template:badgeId
        })
    })
    .catch(err=>reject(err))
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

const updateBadgeDetail = (badgeId: string, data: BadgeUpdateData) =>
    Badge.findByIdAndUpdate(badgeId, data);

const deleteBadge=(badgeId:string)=>new Promise(async (resolve,reject)=>{
    let badge=await Badge.findById(badgeId);
    if(badge&&badge.assertions.length>0){
        return reject(new APIError("Badge already has assertions and hence can't be deleted.",400))
    }
    await badge?.deleteOne()
    .then(resolve("Delete Successfull"))
    .catch(()=>reject(new Error("Failed to delete")))    
})

export default {
    createBadge,
    listBadge,
    badgeDetail,
    updateBadgeDetail,
    deleteBadge,
    updateTemplate
}