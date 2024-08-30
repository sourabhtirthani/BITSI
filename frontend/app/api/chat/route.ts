import Openai from 'openai';
import { OpenAIStream , StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';
import { ChatCompletionMessage, ChatCompletionSystemMessageParam } from 'openai/resources/index.mjs';
import openai, { createEmbedding } from '@/lib/openai';



export const runtime = 'edge';
// const openai =  new Openai({apiKey : process.env.OPENAI_API_KEY || ''});

// if(!process.env.OPENAI_API_KEY){
//   return new NextResponse('Missing open AI Api Key' , {status : 400})
// }

// const {messages} = await req.json();
// const response  = await openai.chat.completions.create({
//   model : 'gpt-3.5-turbo',
//   stream : true,
//   messages
// })

// const stream = OpenAIStream(response);
// return new StreamingTextResponse(stream);
export async function POST(req : Request){
  try{
    const body  = await req.json();
    const messages : ChatCompletionMessage[] = body.messages;
    const messagesTruncatedVariable  = messages.slice(-6);
    const embedding = await createEmbedding(
      messagesTruncatedVariable.map((messages)=>messages.content).join("\n")
    )
    const systemMessage : ChatCompletionSystemMessageParam = {
      role : "system",
      content : "content here"
    }


    const response = await openai.chat.completions.create({
      model : "gpt-3.5-turbo",
      stream : true,
      messages : []
    })

  }catch(error){
    console.log(error);
    console.log('in the error clause of api chat route ' )
    return new NextResponse('Something went wrong' , {status : 500});

  }
}