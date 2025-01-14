import express from 'express'
import { isauth } from '../middlewares/auth.js'
import { addconversation, chatcreate, deletechats, getallchats, getconversations } from '../controllers/chat.js'
const router=express.Router()

router.post("/newchat",isauth,chatcreate)

router.get("/allchats",isauth,getallchats)

router.post("/:id",isauth,addconversation)
router.get("/:id",isauth,getconversations)
router.delete("/:id",isauth,deletechats)
export default router