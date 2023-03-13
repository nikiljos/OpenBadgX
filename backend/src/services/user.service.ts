import User from "../models/user.model";
import Badge from "../models/badge.model";
import { Types } from "mongoose";

const userDetail = (id: string) =>
    User.findById(id).select("name email profileImage");

const findUser=(email:string,name:string)=>new Promise(async(resolve,reject)=>{
    try{
        let user = await User.findOne({
            email,
        });
        if(!user){
            user=await User.create({
                email,
                name
            })
        }
        resolve(user.id)
    }
    catch(err){
        reject(err)
    }
})

const badgeList = (user: string) =>
    Badge.aggregate([
        {
            $unwind: "$assertions",
        },
        {
            $match: {
                "assertions.user": new Types.ObjectId(user),
            },
        },
        //TODO: return only necessary fields
        // {
        //     $project: { org: 1, assertions: 1 },
        // },
    ]);
export default {
    userDetail,
    findUser,
    badgeList
};
