import User from "../models/user.model";

interface userUpdateBody{
    name: string|undefined;
}

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

const updateUser=(userId:string,data:userUpdateBody)=>User.findByIdAndUpdate(userId,data)

const updateMailPreference = (userId: string, unsubscribe: boolean) =>
    User.findByIdAndUpdate(userId, {
        mailUnsub:unsubscribe
    });

export default {
    userDetail,
    updateUser,
    findUser,
    updateMailPreference
};
