
import mongoose from 'mongoose'
const schema=new mongoose.Schema({

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    latestmessage:{
        type:String,
        default:"new chats"
    },
},{
    timestamps:true,
}

) 

export const chat =mongoose.model("chat",schema)