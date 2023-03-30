import User from "../models/user.model"
import { OAuth2Client } from "google-auth-library";
import { sendMail } from "../utils/ses";
import { APIError } from "../utils/error";

const gAuthClientID=process.env.GOOGLE_AUTH_CLIENT_ID
const client = new OAuth2Client(gAuthClientID);

interface GData{
    name:string;
    email:string;
    picture:string;
}

interface UserData{
    id:string;
    name:string;
}

export const checkGoogleAuth = (idToken: string) =>
    new Promise<GData>((resolve, reject) => {
        client.verifyIdToken({
            idToken,
            audience:gAuthClientID
        })
        .then(data=>{
            let {name,picture,email}=data["payload"]
            resolve({ name, picture, email });
        })
        .catch(err=>{
            reject(err)
        })
    });


export const handleUser=(email:string,loginType:string,name?:string,image?:string)=>new Promise<UserData>((resolve,reject)=>{
    User.findOne({
        email
    })
    .then(async (data)=>{
        if(data){
            let newData:any={}
            if(!data.loginMethod.includes(loginType)){
                newData.loginMethod=[...data.loginMethod,loginType]
            }
            if(!data.profileImage&&image){
                newData.profileImage=image
            }
            
            if(Object.keys(newData).length>0){
                await data.updateOne(newData)
                .catch(err=>reject(err))
            }

            resolve({
                id:data.id,
                name:data.name
            });
        }else if(name){
            User.create({
                email,
                name,
                profileImage:image,
                loginMethod:[loginType]
            })
            .then(data=>{
                resolve({
                    id: data.id,
                    name: data.name,
                });
            })
            .catch(err=>reject(err))
        }
        else{
            //user doesn't exist and didn't get name either
            reject(new APIError("Sorry, User Didn't Exist, Please provide Name to signup!",400,"new_user"))
        }
    })
    .catch(err=>reject(err))
})

export const sendMailToken = (token: string, email: string, name: string) =>
    sendMail("loginPrompt", email,{
        name,
        loginUrl:`${process.env.FRONTEND_URL}/login/verify?secret=${token}`
    });