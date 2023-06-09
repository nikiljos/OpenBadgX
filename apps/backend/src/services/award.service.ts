import { Types } from "mongoose";
import Badge from "../models/badge.model";
import MailQueue from "../models/mailQueue.model";
import { APIError } from "../utils/error";
import { triggerNextMail } from "../utils/ses";
import userService from "./user.service"

const maxAwardPerBadge=Number(process.env.MAX_AWARD_PER_BADGE)||0

type ResArray=string[]
interface UserDetail{
    email:string,
    name:string
}

interface MailQueueObject{
    template:string;
    recepient:string;
    assertion:string;
    variableData:{
        name:string;
        badgeName:string|undefined;
        orgName:string;
        imgUrl:string;
        assertionUrl:string;
        frontendUrl:string;
    }
}

interface OrgData{
    name:string
}

const batchAward = (badgeId: string, users: [UserDetail]) =>
    new Promise(async (resolve, reject) => {
        let success:ResArray=[],error:ResArray=[],exist:ResArray=[]; 
        let badge=await Badge.findOne({
            _id:badgeId,
        })
        .populate<{org:OrgData}>("org")
        .catch(err=>reject(err))
        if(!badge) return reject(new Error("Invalid badge"))
        let awardeeList = badge?.assertions||[]
        if((awardeeList.length+users.length)>maxAwardPerBadge) return reject(new APIError(`Total awardees for the certificate exceeds the limit of ${maxAwardPerBadge}.`,400))
        let mailQueueData:MailQueueObject[]=[]
        for await(let userDetail of users){
            await userService.findUser(userDetail.email,userDetail.name)
            .then((id:any)=>{
                let existUser=awardeeList.find((elt)=>elt.user==id)
                if(!existUser){
                    const assertionId:any=new Types.ObjectId()
                    awardeeList.push({
                        _id: assertionId,
                        user: id,
                        name: userDetail.name
                    });
                    success.push(userDetail.email);
                    mailQueueData.push({
                        template: "assertionNotify",
                        recepient: id,
                        assertion: assertionId,
                        variableData: {
                            name: userDetail.name,
                            badgeName: badge?.title,
                            orgName: badge?.org.name||"an Organization",
                            imgUrl: `${process.env.S3_PUBLIC_URL}/templates/${badge?.template}`,
                            assertionUrl: `${process.env.FRONTEND_URL}/badge/${assertionId}`,
                            frontendUrl: process.env.FRONTEND_URL,
                        },
                    });
                }
                else{
                    exist.push(userDetail.email)
                }
            })
            .catch(err=>{
                console.log(err)
                error.push(userDetail.email)
            })
        }
        let assertionStatus=await badge?.updateOne({assertions:awardeeList})
        .catch(err=>reject(err))
        assertionStatus&&await MailQueue.insertMany(mailQueueData)
        .then(()=>triggerNextMail())
        .catch((err) =>
            reject(new Error("Error in queueing mails"))
        );
        resolve({
            success,
            error,
            exist,
        });
    });

const listAwardees = (badgeId: string) =>
    Badge.findOne({
        _id: badgeId,
    })
        .populate("assertions.user", "name email")
        .select({
            assertions: {
                user: 1,
                _id:1
            },
        });

export default {
    batchAward,
    listAwardees
}