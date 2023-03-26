import {model,Schema} from "mongoose";

const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 
            'Please fill a valid email address'
        ]
    },
    name:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean
    },
    profileImage:{
        type:String
    },
    loginMethod:[
        {
            type:String,
        }
    ]
},{
    timestamps:true
})

export default model("users", userSchema);