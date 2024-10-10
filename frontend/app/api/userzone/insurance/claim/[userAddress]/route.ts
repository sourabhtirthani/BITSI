import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { userAddress: string } }) {
    try {
      const { params } = context;
      
      if (!params.userAddress) {
        return NextResponse.json({ error: 'No address provided' }, { status: 400 });
      }
      // const soldEvents = await db.nft_events.findMany({
      //   where: {
      //       to: params.userAddress,
      //       nft_event: 'Sold',
      //       claim_requested : false,
      //       loss_amount: { 
      //           gt: 0, 
      //       },
      //       nft:{
      //         is_insured :true
      //       }
      //   },
      //   include: {
      //     nft: {
      //       select: {
      //           nft_price : true,
      //           nft_owner_address : true,
      //           nft_name : true,
      //           insurance: true,  
      //       },
      //     },
      //   },
      // });

      const claimsOfUser = await db.claims.findMany({
        where : {userAddress : params.userAddress,
          loss :{
            gt : 0
          },
          compensationGenerated : false
        }
      })
  
      return NextResponse.json(claimsOfUser, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }