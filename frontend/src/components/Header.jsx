import { Sparkles } from 'lucide-react'
import React from 'react'

const Header = () => {
    const chats =[]
  return (
    <div>

        {chats && chats.length === 0 && (
        // <p className="text-2xl mb-6 font-semibold ">You are talking to Chathub</p>
        <div className='text-center mb-2 mt-5'>
          <h1 className='text-5xl font-medium text-white flex items-center justify-center gap-3'
          style={{fontFamily:'Style script'}}>
            CHAT HUB<Sparkles className='text-teal-400' size={28}/>
          </h1>

           <p className='text-blue-200/80 mr-5'>You are talking to chathub</p>
        </div>
      )}
    </div>
  )
}

export default Header