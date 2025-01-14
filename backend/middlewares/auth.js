import jwt from 'jsonwebtoken'
import { User } from '../models/user.js';
export const isauth=async(req,res,next)=>{
try {
    const token=req.headers.token;

    if(!token){
        return res.status(403).json({
            message:"please login "
        })
    }

    const decoding=jwt.verify(token,process.env.jwtsecret)
    // req.user=await User.findById(decoding._id)
    // next()
    const user = await User.findById(decoding.userid);

if (!user) {
    return res.status(404).json({ message: 'User not found' });
}

req.user = user;
next();
} catch (error) {
    res.status(500).json({
        message:error.message
    })
    

}
}