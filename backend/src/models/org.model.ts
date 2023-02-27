import { model, Schema,Types } from "mongoose";

const orgSchema=new Schema({
    key:{
        type:String,
        unique:true,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    admin:{
        type: Types.ObjectId,
        ref:"users"
    }
})

export default model("orgs",orgSchema)