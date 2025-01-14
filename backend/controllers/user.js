import { User } from "../models/user.js";
import zod from "zod";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const signupbody= zod.object({
name:zod.string(),
email:zod.string().email(),
password:zod.string(),
})
export const signup=async(req,res)=>{
    try {
        const {success}=signupbody.safeParse(req.body);
        if(!success){
            return res.status(411).json({
                message:"incorrest inputs"
            })
        }

        const existinguser=await User.findOne({
        email:req.body.email,
        })
        if(existinguser){
            return res.status(411).json({
                message:"email already exists"
            })

        }
        const {name,email,password}=req.body;
        const salt=await bcrypt.genSalt(13);
        const hashedpassword=await bcrypt.hashSync(password,salt)

        const newUser=await User.create({
            name,
            email,
            password:hashedpassword
        })
        const userid=newUser._id
        const token=jwt.sign({
            userid
        },
        process.env.jwtsecret

    )
    res.status(200).json({
        message:"account created",
        token:token,
    })



    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}
const signinbody=zod.object({
    email:zod.string().email(),
    password:zod.string(),
})
export const signin=async(req,res)=>{
try {

    const {success}=signinbody.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message:"incorrest inputs"
        })
    }

    const user=await User.findOne({
        email:req.body.email

    })

    if(!user){
        return res.status(404).json("user not found")
    }
if(user){
    const match=await bcrypt.compare(req.body.password,user.password)
    if(!match){
        return res.status(401).json("wrong inputs")
    }
}
const token=jwt.sign({
    userid:user._id,
},
process.env.jwtsecret
)
res.status(200).json({
    message:"signed in successfully",
    token:token,
    user:user
})
    
} catch (error) {
    res.status(500).json({
        message:error.message
    })
}
}
export const profile=async(req,res)=>{
    try {

        const user=await User.findById(req.user._id)
        res.json(user)
        
    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
}