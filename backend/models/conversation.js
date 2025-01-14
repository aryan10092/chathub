
import mongoose from 'mongoose'
const schema=new mongoose.Schema({

    chat:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat",
        required:true,
    },
    question:{
        type:String,
        required:true
    },
    answer:{
        type:String,
        required:true
    },

},{
    timestamps:true,
}

) 

export const conversation =mongoose.model("conversation",schema)