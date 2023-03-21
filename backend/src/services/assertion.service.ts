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

const assertionDetail=(assertionId:string)=>
    Badge.findOne({
        assertions:{
            $elemMatch: {
                id:assertionId
            }
        }
    },{
        title:1,
        desc:1,
        template:1,
        "assertions.$":1
    })


export default{
    assertionDetail,
    assertionList
}