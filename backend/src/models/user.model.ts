import {model,Schema} from "mongoose";

const userSchema=new Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
    },
    isActive:{
        type:Boolean
    },
    loginMethod:[
        {
            type:String,
            enum:["google"]
        }
    ]
},{
    timestamps:true
})

export default model("users", userSchema);