import { cn } from '@/lib/utils';
import { Message } from 'ai'
import { Bot } from 'lucide-react';
import React from 'react'

const AiChatMessages = ({message} : {message : Message}) => {
    const isAiMessage = message.role === 'assistant';
  return (
    <div className={cn("mb-3 flex items-center ", isAiMessage ? 'me-5 justify-start' : 'ms-5 justify-end')}>
        {isAiMessage && <Bot className='mr-2 flex-none' />}
        <div className={cn("rounded-xl border px-3 py-2" , isAiMessage ? "bg-gray-50" : "bg-gray-700 text-white")}>
            {message.content}
        </div>
    </div>
  )
}

export default AiChatMessages