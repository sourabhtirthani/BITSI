import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(request : Request, context :  {params : { userAddress: string}}){
try{
    const  {params} = context;
    if(!params.userAddress){
        return NextResponse.json({error : 'No address Provided'}, {status : 400})
    }
    const coinEvents = await db.coinInsuranceEvent.findMany({
        where : {
            insurance:{
                coin :{
                    userAddress : params.userAddress
                }
            }
        },
        include :{
            insurance :{
                select :{
                    startTime : true,
                    id : true,
                    expiration : true,
                    coverage : true,
                    coinsInsured : true
                }
            }
        }
    })
    
    return NextResponse.json(coinEvents, { status: 200 });
}catch(error){
    return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
}
}