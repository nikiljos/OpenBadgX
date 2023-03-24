import { model, Schema, Types } from "mongoose";

const mailQueueSchema = new Schema({
    template:{
        type:String,
        required:true
    },
    recepient:{
        type: Types.ObjectId,
        ref:"users"
    },
    assertion:{
        type:Types.ObjectId,
    },
    variableData:{
        type:Object
    },
    status:{
        queue:{
            type:Boolean,
            required:true,
            default:true
        },
        tryCount:{
            type:Number,
            required:true,
            default:0
        },
        success:Boolean,
        send:{
            type:Date
        },
        tracker:{
            recieve:Date,
            open:Date
        }
    }
})

export default model("mailqueue",mailQueueSchema)
