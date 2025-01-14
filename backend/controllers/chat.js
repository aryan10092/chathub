import {  chat } from "../models/chat.js"
import { conversation } from "../models/conversation.js"

export const chatcreate=async(req,res)=>{
try {

    const userId=req.user._id
    const chats=await chat.create({
        user:userId
    })
    res.json(chats)
    
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}

export const getallchats=async(req,res)=>{
    try {

        const chats = await chat.find({ user: req.user._id }).sort({
            createdAt: -1,
          });
      
          res.json(chats);
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
export const addconversation=async(req,res)=>{

    try {

        const chats=await chat.findById(req.params.id)

        if(!chats){
            return res.status(404).json({
                message:"no chats with this id"
            })
        }

        const conversations=await conversation.create({
            chat:chats._id,
            question:req.body.question,
            answer:req.body.answer,
        })
       
    const updatechat = await chat.findByIdAndUpdate(
        req.params.id,
        { latestmessage: req.body.question },
        { new: true }
      );
  
        res.json({
            conversations,
            updatechat
        })
        
    } catch (error) {
        
        res.status(500).json({
            message:error.message
        })
    }
}

export const getconversations=async(req,res)=>{

    try {

        const conversations=await conversation.find({chat:req.params.id})
        if(!conversations){
            return res.status(404).json({
                message:"no conversation with htis id"
            })
        }
        res.json(conversations)
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}

export const deletechats=async(req,res)=>{

    try {
        const chats=await chat.findById(req.params.id)
        if(!chats){
            return res.status(404).json({
                message:"no chats with this id"
            })
        }

        if(chats.user.toString()!==req.user._id.toString()){
            return res.status(403).json({
                message:"not authorized"
            })

                 }
                 await chats.deleteOne();
                 res.json({
                    message:"chats deleted"
                 })
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}