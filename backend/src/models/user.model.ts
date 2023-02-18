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
    }
},{
    timestamps:true
})

export default model("user", userSchema);