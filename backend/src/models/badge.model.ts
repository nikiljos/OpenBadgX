import { model, Schema, Types } from "mongoose";

const badgeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc:{
        type:String
    },
    org: {
        type: Types.ObjectId,
        ref: "orgs",
    },
});

export default model("badges",badgeSchema)