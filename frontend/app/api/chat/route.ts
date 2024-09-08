import { OpenAIStream , StreamingTextResponse, AIStream, streamText } from 'ai';
import { ChatCompletionMessage, ChatCompletionMessageParam, ChatCompletionSystemMessageParam } from 'openai/resources/index.mjs';
import {ChatOpenAI} from '@langchain/openai'
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { NextResponse } from "next/server";
import { LangChainAdapter, LangChainStream } from 'ai';


// export async function POST(req : Request){
//   try{
//     const body  = await req.json();
//     const messages : ChatCompletionMessage[] = body.messages;
//     const currentMessageContent = messages[messages.length -1].content;
//     const {handlers , stream} = LangChainStream();
//     const chatModel = new ChatOpenAI({
//         modelName : "gpt-3.5-turbo",
//         streaming : true,
//         callbacks : [handlers]
//     })
//     const prompt = ChatPromptTemplate.fromMessages([
//         [
//             "system" , 'abs'
//         ],
//         [
//             "user" , "{input}"
//         ]
//     ])
//     const chain = prompt.pipe(chatModel);
//     chain.invoke({
//         input : currentMessageContent
//     })
//     return  new StreamingTextResponse(stream);
//   }catch(error){
//     console.log(error);
//     console.log('in the error clause of api chat route ' )
//     return new NextResponse('Something went wrong' , {status : 500});

//   }
// }


export async function GET(){
    return new NextResponse('Something went wrong' , {status : 500});
}