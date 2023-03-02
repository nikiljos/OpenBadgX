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