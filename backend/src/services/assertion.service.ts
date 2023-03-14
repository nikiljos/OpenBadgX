import Badge from "../models/badge.model";
import { Types } from "mongoose";

const assertionList = (user: string) =>
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

const assertionDetail=(id:string,isPrivate:boolean,user?:string)=>
    Badge.aggregate([
        {
            $unwind: "$assertions",
        },
        {
            $match: {
                "assertions._id": new Types.ObjectId(id),
            },
        },
    ])
    .then(data=>data[0])


export default{
    assertionDetail,
    assertionList
}