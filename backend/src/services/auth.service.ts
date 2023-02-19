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


export const checkUser=(email:string,name:string,image:string)=>new Promise<string>((resolve,reject)=>{
    User.findOne({
        email
    })
    .then(data=>{
        if(data){
            resolve(data._id.toString());
        }else{
            User.create({
                email,
                name,
                profileImage:image,
                loginMethod:["google"]
            })
            .then(data=>{
                resolve(data._id.toString())
            })
            .catch(err=>reject(err))
        }
    })
    .catch(err=>reject(err))
})
