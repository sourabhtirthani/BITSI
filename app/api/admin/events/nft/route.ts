import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
    try {
      const events = await db.nft_events.findMany({
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
    })
  
  
      return NextResponse.json(events, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }