import React, { useEffect, useRef } from 'react'
import Sidebar from '../components/Sidebar'
import { useState } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";
import Header from '../components/Header';
import { Chatdata } from '../context/Chatprovide';
import { Avatar } from '@mui/material';
import { FaRobot } from "react-icons/fa";
import { Loadinglarge, Loadingsamll } from '../components/Loading';
import { IoMdSend } from 'react-icons/io';
import { Component, Send } from 'lucide-react';
import { Bot } from 'lucide-react';
import { Sparkles } from 'lucide-react';
const Home = () => {
  const[isopen,setisopen]=useState(true)
  const reverse=()=>{
    setisopen(!isopen)
  }
  const {getresponse,
    messages,
    label,
    setlabel,
    newrequestload,
  createlod,
  deletechats,
chats}=Chatdata()
    const submitHandler=(x)=>{
      x.preventDefault()
      getresponse()
    }
    const messagecontainerRef = useRef();

    useEffect(() => {
      if (messagecontainerRef.current) {
        messagecontainerRef.current.scrollTo({
          top: messagecontainerRef.current.scrollHeight,
          behavior: "smooth",
        });
      }
    }, [messages]);
  return (
    <div className='text-white flex h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 font-poppins overflow-hidden'>
    
    <Sidebar isopen={isopen} reverse={reverse}/>
   <div className='flex flex-1 flex-col'>
  <button 
  onClick={reverse}
  className="md:hidden p-4 bg-gray-800 text-2xl"
>
  <GiHamburgerMenu />
</button>
{createlod?(Loadinglarge):(
<div className="flex-1 p-6 mb-20  mt-4  overflow-hidden  md:mb-0 ">
          <Header />
          <div className='flex-1  rounded-3xl p-6 max-h-[600px] overflow-y-auto mb-20 md:mb-0 scrollbar '
          
          ref={messagecontainerRef}>
{
   messages && messages.length>0 ?(messages.map((x,i)=>(
    <div key={i}>
      <div className='mb-4 p-4 rounded-lg bg-teal-200/40 text-teal-100 border border-gray-400/20 shadow-xl  items-start flex gap-2'>
      
        <div className={`flex-shrink-0 ${isopen ? 'hidden' : 'block'} md:block`}>
          
          <Avatar   sx={{
              color: "black",
              bgcolor: "white",
               
              fontWeight:700,
              // height:"10px"
              
              
            }}>
              


          </Avatar></div>
          
        <div className='py-1'>
        {x.question}
        </div>
      </div>
      <div className='mb-4 p-4 rounded bg-transparent bg-opacity-20   border border-gray-400/20 shadow-xl text-teal-400 flex items-start gap-2'>
        <div className='bg-white p-2 rounded-full text-black text-2xl h-10'>
          <FaRobot/>
        </div >
        <div className='py-1'>
        {x.answer}
        </div>
      </div>

      </div>))):
      <div className='flex flex-col items-center justify-center h-full text-gray-300/60'>
        <Component size={48} className='mb-2 text-gray-400 mt-3'/>
        <h2 className='text-2xl  mb-2 mt-1 text-gray-400'>Create new chat to start a conversation</h2>
        {!isopen && (<div className='mt-2 text-slate-400 opacity-70'>
          <p>•Avoid sharing personal or sensitive information.</p>
          <p>•Avoid asking offensive or harmful content.</p>
          <p>•It cannot provide any time based data.</p>

        </div>)}
      
       </div>
  }

  {newrequestload && <Loadingsamll/>}

          </div>
          </div>)
}
</div>
{!isopen&&chats.length>0&&(
 <div className='fixed bottom-0 right-0 left-0 md:left-[25%]  p-5  w-full md:w-[75%] z-20'> 

  <form  
   onSubmit={submitHandler}
  
  >
<input
className=' py-4 px-5 w-full bg-transparent  rounded-2xl glass-input text-blue-50 border-teal-300 border-2  focus:outline-none focus:ring-2 focus:ring-teal-400 pr-12 placeholder-teal-600 '
type='text'
placeholder='Enter your query'
value={label}
onChange={(e)=> setlabel(e.target.value)}
required
>
</input>
<button className=" absolute right-2 top-1/2 -translate-y-1/2 p-8 rounded-xl  hover:text-teal-200 transition-all duration-200">
              <Send size={20} />
            </button>
  </form>
</div>
)}
</div>
  )

}

export default Home