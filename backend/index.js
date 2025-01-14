import express from 'express'
import dotenv from 'dotenv'
import connectmongo from './database/DB.js'
import userroutes from './routes/userrouter.js'
import chatroutes from './routes/chatroutes.js '
import cors from 'cors'
dotenv.config()

const app=express()
const port=process.env.PORT||5000

app.use(cors())
app.use(express.json())
app.use("/api/user",userroutes)
app.use("/api/chat",chatroutes)


app.listen(port,()=>{
    console.log(`server running on ${port}`);
    connectmongo()
})