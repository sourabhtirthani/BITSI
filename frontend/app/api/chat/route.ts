import Openai from 'openai';
import { OpenAIStream , StreamingTextResponse } from 'ai';
import { NextResponse } from 'next/server';



export const runtime = 'edge';
const openai =  new Openai({apiKey : process.env.OPENAI_API_KEY || ''});

export async function POST(req : Request){
  try{
    if(!process.env.OPENAI_API_KEY){
      return new NextResponse('Missing open AI Api Key' , {status : 400})
    }

    const {messages} = await req.json();
    const response  = await openai.chat.completions.create({
      model : 'gpt-3.5-turbo',
      stream : true,
      messages
    })

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);

  }catch(error){
    console.log(error);
    console.log('in the error clause of api chat route ' )
    return new NextResponse('Something went wrong' , {status : 500});

  }
}