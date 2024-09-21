import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { userAddress: string } }) {
    try {
      const { params } = context;
      
      if (!params.userAddress) {
        return NextResponse.json({ error: 'No address provided' }, { status: 400 });
      }
      const soldEvents = await db.nft_events.findMany({
        where: {
            to: params.userAddress,
            nft_event: 'Sold',
            loss_amount: { 
                gt: 0, 
            },
        },
        include: {
          nft: {
            select: {
                nft_price : true,
                nft_owner_address : true,
                nft_name : true,
                insurance: true,  
            },
          },
        },
      });
  
      return NextResponse.json(soldEvents, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }