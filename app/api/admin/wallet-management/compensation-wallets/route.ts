import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
    try {
      const allAddedWallets = await db.adminWallet.findMany({
        where : {
            type : 'COMPENSATION'
        }
      });
      return NextResponse.json(allAddedWallets, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }