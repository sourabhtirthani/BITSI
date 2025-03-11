import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request : Request, context :  {params : { userAddress: string}}){
    try{
      const  {params} = context;
      // console.log(params.userAddress)
      console.log('in the api req')
        if(!params.userAddress){
            return NextResponse.json({
                error : 'No address Provided'
            }, {status : 400})
        }
        const user = await db.user.findUnique({
          where : {
            walletAddress : params.userAddress
          },
          include : {
            SupportTedCurrencies: {
              select : {
                code : true
              }
            }
          }
        });
       
        if(!user){
          return NextResponse.json({message : 'NO USERS FOUND'} , {status : 404});
        }
        return NextResponse.json(user, { status: 200 });
    
      }catch(error){
        // throw new Error('error getting details from database');
        return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
      }
}