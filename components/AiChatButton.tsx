'use client'
import React, { useState } from 'react'
import AiChatBox from './AiChatBox';
import { Bot } from 'lucide-react';
import { CSSTransition } from 'react-transition-group';

const AiChatButton = () => {
    const [chatBoxOpen , setChatBoxOpen] = useState(false);

  return (
   <div className='fixed  right-1 bottom-1 '>
   <button onClick={()=>{setChatBoxOpen((prev)=>!prev)}}>
    <div className='bg-blue-500 rounded-full w-fit items-center flex  p-2 justify-center'>
    <Bot color='white' size={40} className=''/></div>
   </button>
   <CSSTransition
        in={chatBoxOpen}
        timeout={300}
        classNames="chat-box"
        unmountOnExit
      >
   <AiChatBox open = {chatBoxOpen} onClose={()=>{setChatBoxOpen(false)}} />
    
   </CSSTransition>
   </div>
  )
}

export default AiChatButton