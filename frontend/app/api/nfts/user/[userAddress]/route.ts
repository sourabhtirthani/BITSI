import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request : Request, context :  {params : { userAddress: string}}){
    try{
      const  {params} = context;
        if(!params.userAddress){
            return NextResponse.json({
                error : 'No address Provided'
            }, {status : 400})
        }
        const nftsOfUser = await db.nft.findMany({
          where : {
            nft_owner_address : {equals : params.userAddress}
          },
          select : {
            nft_mint_time : true,
            id : true,
            is_insured : true,
            nft_price : true,
            
          }
        });
        if(!nftsOfUser){
          return NextResponse.json({message : 'NO NFTS FOUND'} , {status : 404});
        }
        return NextResponse.json(nftsOfUser, { status: 200 });
    
      }catch(error){
        return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
      }
}