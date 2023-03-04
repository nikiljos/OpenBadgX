import { rejects } from "assert";
import Org from "../models/org.model";

const createOrg = (key: string, name: string, admin: string) =>
    new Promise((resolve, reject) => {
        Org.create({
            key,
            name,
            admin,
        })
            .then((data) => {
                if (data) {
                    resolve(data._id);
                } else {
                    throw new Error("Org Creation Failed");
                }
            })
            .catch((err) => reject(err));
    });

const isKeyAvailable = (key: string) =>
    new Promise((resolve, reject) => {
        Org.findOne({
            key,
        })
            .then((data) => {
                if (!data) {
                    resolve(true);
                } else {
                    reject(new Error("Key already used"));
                }
            })
            .catch((err) => reject(err));
    });

const listOrgs = (adminId: string) =>
    Org.find({
        admin: adminId,
    })
    .select("key name");

const isOrgAdmin=(org:string,user:string)=>new Promise((resolve,reject)=>{
    Org.findOne({
        _id:org,
        admin:user
    }).select("key name")
    .then(data=>{
        console.log(data)
        if(!data){
            reject(new Error("Sorry, you are not the admin!"))
        }
        else{
            resolve(data)
        }
    })
    .catch(err=>reject(err))
})

export default {
    createOrg,
    isKeyAvailable,
    listOrgs,
    isOrgAdmin
};
