import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(request : Request, context :  {params : { userAddress: string}}){
try{
    const  {params} = context;
    console.log("in here in the insurance claim function")
    if(!params.userAddress){
        return NextResponse.json({error : 'No address Provided'}, {status : 400})
    }
    const events = await db.nft_events.findMany({
        where: {
          to: params.userAddress,
          nft_event: 'Sold',
        },
      });
    if(!events){
        return NextResponse.json({message : 'NO EVENTS FOUND'} , {status : 404});
      }
    return NextResponse.json(events, { status: 200 });
}catch(error){
    return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
}
}