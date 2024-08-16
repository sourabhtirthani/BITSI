import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(request : Request, context :  {params : { userAddress: string}}){
try{
    const  {params} = context;
    if(!params.userAddress){
        return NextResponse.json({error : 'No address Provided'}, {status : 400})
    }
    const insurances = await db.insurance.findMany({
        where : {
            currentOwner :{ equals: params.userAddress}
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