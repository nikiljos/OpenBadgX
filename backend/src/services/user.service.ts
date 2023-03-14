import User from "../models/user.model";

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

export default {
    userDetail,
    findUser,
};
