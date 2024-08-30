import { cn, generateMessages } from '@/lib/utils';
import { useChat } from 'ai/react'
import { Bot, Cross, Trash, XCircle } from 'lucide-react';
import React, { useRef } from 'react'
import AiChatMessages from './AiChatMessages';
interface AiChatBoxProps {
    open : boolean;
    onClose : ()=>void;

}
const AiChatBox = ({open , onClose} : AiChatBoxProps) => {
    const {messages, input,handleInputChange, handleSubmit, setMessages,isLoading, error} = useChat({
        initialMessages : generateMessages(20)
    });
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const lastMessageIsUser = messages[messages.length-1]?.role === "user";
  return (
    <div className={cn("z-10 fixed bottom-16 md:right-4 max-md:right-0 bg-white rounded-xl max-w-[500px]  p-1  w-full", open == true ? 'fixed' : 'hidden')}>
        <button onClick={onClose} className='mb-1 ms-auto block'><XCircle size={25} /></button>
        <div className='flex h-[500px] flex-col rounded bg-background border shadow-xl'>
        <div className='h-full mt-2 overflow-y-auto table-body'> 
            {messages.map((message)=>{
                return(
                    <AiChatMessages message={message} key={message.id} />
                )
            })}
            {isLoading && lastMessageIsUser && (
                <AiChatMessages message={{id:"loading" , role : "assistant" , content : "Thinking..."}} />
            )}
            {!error && messages.length == 0 && (
                <div className='flex flex-col items-center justify-center gap-2 font-inter  h-full'>
                    <Bot size = {28} />
                    <p>Send a message to start chat with BITSI Bot.</p>
                </div>
            )}
             {error &&  (
                <AiChatMessages message={{id:"error" , role : "assistant" , content : "Something went Wrong , Please try again later"}} />
            )}

        </div>
        <form onSubmit={handleSubmit} className='m-0.5 flex gap-1'>
            <button onClick={()=>{setMessages([])}}><Trash size={24} /></button>
            <input value={input} onChange={handleInputChange} placeholder='Talk To Ai' className='w-full bg-slate-100 border rounded-xl p-2.5 ' />
            <button type='submit' className='bg-gray-800 p-2 px-4 rounded-xl text-white'>Send</button>
        </form>
        </div>
    </div>
  )
}

export default AiChatBox