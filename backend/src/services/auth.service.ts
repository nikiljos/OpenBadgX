import User from "../models/user.model"
import { OAuth2Client } from "google-auth-library";

const gAuthClientID=process.env.GOOGLE_AUTH_CLIENT_ID
const client = new OAuth2Client(gAuthClientID);

interface GData{
    name:string;
    email:string;
    picture:string;
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


export const handleUser=(email:string,loginType:string,name?:string,image?:string)=>new Promise<string>((resolve,reject)=>{
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

            resolve(data._id.toString());
        }else if(name){
            User.create({
                email,
                name,
                profileImage:image,
                loginMethod:[loginType]
            })
            .then(data=>{
                resolve(data._id.toString())
            })
            .catch(err=>reject(err))
        }
        else{
            //user doesn't exist and didn't get name either
            reject(new Error("User does not exist"))
        }
    })
    .catch(err=>reject(err))
})
