import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(request : Request, context :  {params : { userAddress: string}}){
try{
    const  {params} = context;
    if(!params.userAddress){
        return NextResponse.json({error : 'No address Provided'}, {status : 400})
    }
    const coinTransactions = await db.coinTransactionEvent.findMany({
        where:{
            OR :[
                {from : params.userAddress},
                {to : params.userAddress}
                
            ]
        }
    })
    console.log(coinTransactions)
    console.log(`in here in the coin transacitons`)
    return NextResponse.json(coinTransactions, { status: 200 });
}catch(error){
    return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
}
}