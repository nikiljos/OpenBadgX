import Badge from "../models/badge.model";
import userService from "./user.service"

type ResArray=string[]
interface UserDetail{
    email:string,
    name:string
}

const batchAward = (badgeId: string,orgId:string, users: [UserDetail]) =>
    new Promise(async (resolve, reject) => {
        let success:ResArray=[],error:ResArray=[],exist:ResArray=[]; 
        let badge=await Badge.findOne({
            _id:badgeId,
            org:orgId
        })
        if(!badge) reject(new Error("Invalid badge"))
        let awardeeList = badge?.assertions||[]
        for await(let userDetail of users){
            await userService.findUser(userDetail.email,userDetail.name)
            .then((id:any)=>{
                let existUser=awardeeList.find((elt)=>elt.user==id)
                if(!existUser){
                    awardeeList.push({
                        user: id,
                        name: userDetail.name
                    });
                    success.push(userDetail.email);
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
        await badge?.updateOne({assertions:awardeeList})

        resolve({
            success,
            error,
            exist,
        });
    });

const listAwardees = (badgeId: string, orgId: string) =>
    Badge.findOne({
        _id: badgeId,
        org: orgId,
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