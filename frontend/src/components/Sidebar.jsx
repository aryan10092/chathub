import React from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import { Chatdata } from '../context/Chatprovide';
import { MdDelete } from "react-icons/md";
import { Loadingspinner } from './Loading';
import { useUserData } from '../context/Userprovider';
import { useNavigate } from 'react-router-dom';
import { Bot, MessageCircleMore } from 'lucide-react';

const Sidebar = ({isopen,reverse}) => {
  const{chats,createchatss, createLod,setSelected,deletechats}=Chatdata()
  const{logoutfunc}=useUserData()
  const navigate=useNavigate()
  const deletechathandlers=(id)=>{
    if(confirm("Do you want to delete this chat")){
      deletechats(id)
    }
  }

  const clickevent=(id)=>{
    setSelected(id)
    reverse()
  }
  return (
    <div className={`fixed inset-0 bg-teal-950/30 backdrop-filter backdrop-blur-xl border-r border-teal-400/20 transition-transform transform md:relative md:translate-x-0 md:w-1/4 md:block ${
        
    isopen? "translate-x-0" : "-translate-x-full"
        
    }`}>
        <button className='md:hidden p-2 mb-4 bg-blue-400/20 rounded text-2xl'
        onClick={reverse}>
<IoIosCloseCircle/>

        </button>
        <div className='flex'>
        <div className='mt-5 ml-8'><Bot size={38}/></div>
  <div className='text-2xl font-roboto font-semibold ml- mb-6 mt-4 pl-2 pt-2'>ChatHub</div>
  
  </div>
  <div className='mb-4 box-border px-4'> 


    <button
     onClick={createchatss}
    className="w-full py-2 mb-2 text-teal-100 border border-gray-400/20 shadow-lg bg-gray-900/10 hover:bg-blue-400/10 rounded "
    > 


     {createLod?<Loadingspinner/>:"Newchat"}
    </button>
    <div className='flex '>
    <div className='mt-3 pr-2 pl-2'><MessageCircleMore/></div>
    <p className='text-sm text-gray-400 mt-1 mb-2 pt-3'>Recent chats</p>
    </div>
    <div className='max-h-[500px] overflow-y-auto mb-20 md:mb-0 scrollbar'>
    

<div className="max-h-[500px] overflow-y-auto mb-20 md:mb-0 thin-scrollbar">
  {chats && chats.length > 0 ? (
    chats.map((e) => (
      <div
        key={e._id}
        className="w-full text-left py-2 px-2 bg-blue-400/20 hover:bg-blue-400/10 rounded mt-2 flex justify-between items-center"
        onClick={() => clickevent(e._id)} 
      >
        <span>{e.latestmessage.slice(0, 38)}...</span>
        <button
          className="bg-red-600 text-white text-xl px-3 py-2 rounded-md hover:bg-red-700"
          onClick={(event) => {
            event.stopPropagation(); 
            deletechathandlers(e._id);
          }}
        >
          <MdDelete />
        </button>
      </div>
    ))
  ) : (
    <p>No chats yet</p>
  )}
</div>


    </div>

      </div>
      <div className="absolute bottom-0 ml-4 mb-6 w-full">
        <button
          className="bg-blue-400/20 hover:bg-blue-400/10 text-white text-xl px-3 py-2 rounded-md "
          onClick={()=>{
            
            logoutfunc(navigate)}}
           >
          Logout
        </button>
      </div>
        </div>
  )
}

export default Sidebar