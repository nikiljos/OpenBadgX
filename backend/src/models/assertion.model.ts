// DEPRECATED :- Keeping assertions as subdoc since it's 1-1 relation

import { model, Schema, Types } from "mongoose";

const assertionSchema= new Schema({
    badge:{
        type:Types.ObjectId,
        ref:"badges"
    },
    recepient:{
        type:Types.ObjectId,
        ref:"users"
    }
})

export default model("assertions",assertionSchema)