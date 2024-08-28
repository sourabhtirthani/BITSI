import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
    try {
      const events = await db.nft_events.findMany({
        where: {
          asset_name: 'NFT',
        },
        include: {
          nft: {
            select: {
              nft_name: true,
              collection: {
                select: {
                  name: true, 
                },
              },
            },
          },
        },
      });
  
      if (!events || events.length === 0) {
        return NextResponse.json({ message: 'NO EVENTS FOUND' }, { status: 404 });
      }
  
      return NextResponse.json(events, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }