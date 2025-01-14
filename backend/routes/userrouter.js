import express from 'express'
import { profile, signin, signup } from '../controllers/user.js'
import { isauth } from '../middlewares/auth.js'

const router=express.Router()
router.post("/signup",signup)
router.post("/signin",signin)
router.get("/me",isauth,profile)


export default router