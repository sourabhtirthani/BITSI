'use client'
import React from 'react'
import {useChat} from 'ai/react'

const Chat = () => {
    const { messages , input, handleInputChange , handleSubmit , isLoading , error } = useChat();
  return (
    <div>Chat

        <section className='bg-red-500'>
            <form onSubmit={handleSubmit} className='relative'></form>
        </section>
    </div>
  )
}

export default Chat