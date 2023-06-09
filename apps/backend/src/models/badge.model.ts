import { model, Schema, Types } from "mongoose";

const badgeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
    },
    org: {
        type: Types.ObjectId,
        ref: "orgs",
    },
    template:{
        type:String,
        required:true
    },
    assertions:[
        {
            _id:{
                type:Types.ObjectId,
                index:true
            },
            name:{
                type:String,
                required:true
            },
            user: {
                type: Types.ObjectId,
                ref: "users",
                required:true,
                index:true
            },
        },
    ],
});

export default model("badges",badgeSchema)