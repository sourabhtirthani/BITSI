import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(request : Request, context :  {params : { userAddress: string}}){
try{
    const  {params} = context;
    if(!params.userAddress){
        return NextResponse.json({error : 'No address Provided'}, {status : 400})
    }
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    console.log(`this is the type of user wallet --> ${type}`)
    if(type == 'userwallet'){
        console.log('in here int he userwallet tpe ')
        const buyCoinTransactionsForUser = await db.coinTransactionEvent.findMany({
            where : {
                OR : [
                    {eventName : 'Buy'},
                    {eventName : 'Transfer'}
                ],
                to : params.userAddress
            }
        })
        // console.log(buyCoinTransactionsForUser)
        return NextResponse.json(buyCoinTransactionsForUser, { status: 200 });
    }
    if(type == 'protection'){
        console.log("params.userAddress",params.userAddress);   
        const buyCoinTransactionsForUser = await db.coinTransactionEvent.findMany({
            where : {
                eventName : 'Buy',
                to : params.userAddress,
                showInInsurance : true
            }
        })
         console.log(buyCoinTransactionsForUser,"buyCoinTransactionsForUser")
        return NextResponse.json(buyCoinTransactionsForUser, { status: 200 });
    }
    const coinTransactions = await db.coinTransactionEvent.findMany({
        where: {
            AND: [
                {
                    OR: [
                        { from: params.userAddress },
                        { to: params.userAddress }
                    ]
                },
                {
                    NOT: {
                        AND: [
                            { eventName: "Sell" },  // this is not included becuase the to is uniswap here and everytime we buy an event sell for uniswap automaticlly gets registered which should not be included in the table
                            { to: "0xec7BE89e9d109e7e3Fec59c222CF297125FEFda2" }
                        ]
                    }
                }
            ]
        }
    });
    // const coinTransactions = await db.coinTransactionEvent.findMany({
    //     where: {
    //         OR: [
    //             { from: params.userAddress },
    //             { to: params.userAddress }
    //         ],
    //         NOT: {
    //             eventName: 'sell',
    //             OR: [
    //                 { to: '0x3B2944D0E7a546166C2Ca93f05e830a6072a9382' },
    //                 { to: '0xec7BE89e9d109e7e3Fec59c222CF297125FEFda2' }
    //             ]
    //         }
    //     }
    // });
    // const coinTransactions = await db.coinTransactionEvent.findMany({
    //     where: {
    //         OR: [
    //             { from: params.userAddress },
    //             { to: params.userAddress }
    //         ],
    //         NOT: {
    //             AND: [
    //                 { eventName: 'sell' },
    //                 { to: '0x3B2944D0E7a546166C2Ca93f05e830a6072a9382' }
    //             ]
    //         }
    //     }
    // });
    console.log(coinTransactions)
    console.log(`in here in the coin transacitons`)
    return NextResponse.json(coinTransactions, { status: 200 });
}catch(error){
    return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
}
}