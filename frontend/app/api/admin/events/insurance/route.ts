import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
    try {
      const events = await db.insurance_events.findMany({
        include: {
            insurance: {
              select: {
                 expiration : true,
                 currentOwner : true,
                 nftId : true,
              },
            },
          },
    })
      return NextResponse.json(events, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }