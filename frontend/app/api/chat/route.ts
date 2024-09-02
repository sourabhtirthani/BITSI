// import Openai from 'openai';
// import { OpenAIStream , StreamingTextResponse, AIStream, streamText } from 'ai';
// import { NextResponse } from 'next/server';
// import { ChatCompletionMessage, ChatCompletionMessageParam, ChatCompletionSystemMessageParam } from 'openai/resources/index.mjs';
// import openai, { createEmbedding } from '@/lib/openai';



// export const runtime = 'edge';

// export async function POST(req : Request){
//   try{
//     const body  = await req.json();
//     const messages : ChatCompletionMessage[] = body.messages;
//     // const messagesTruncatedVariable  = messages.slice(-6);
//     // const embedding = await createEmbedding(
//     //   messagesTruncatedVariable.map((messages)=>messages.content).join("\n")
//     // )
//     const systemMessage : ChatCompletionMessageParam = {
//       role : "system",
//       content : "content here"
//     }


//     const response = await openai.chat.completions.create({
//       model : "gpt-3.5-turbo",
//       stream : true,
//       messages : [systemMessage , ...messages]
//     })
//   //   for await (const chunk of response) {
//   //   process.stdout.write(chunk.choices[0]?.delta?.content || "");
//   // }
//     const stream = OpenAIStream(response);
//     return  new StreamingTextResponse(stream);
//   }catch(error){
//     console.log(error);
//     console.log('in the error clause of api chat route ' )
//     return new NextResponse('Something went wrong' , {status : 500});

//   }
// }