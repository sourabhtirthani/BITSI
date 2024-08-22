import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(request : Request, context :  {params : { nftIds: string}}){
try{
    const  {params} = context;
    console.log('in the nftIds function')
    if(!params.nftIds){
        return NextResponse.json({error : 'No address Provided'}, {status : 400})
    }

    const nftIdArray = params.nftIds.split(',');
    const nftIdNumbers = nftIdArray.map(item => Number(item.split('=')[1]));
  
    const insurances = await db.insurance.findMany({
        where : {
            nftId :{  in: nftIdNumbers,}
        },
    })
    if(!insurances){
        return NextResponse.json({message : 'NO EVENTS FOUND'} , {status : 404});
      }
    return NextResponse.json(insurances, { status: 200 });
}catch(error){
    return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
}
}