import mongoose from "mongoose";

const schema=new mongoose.Schema({
    name:{
        type: String,
        required:true,
        trim:true,
        maxLength:70,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    
})
export const User=mongoose.model("user",schema)