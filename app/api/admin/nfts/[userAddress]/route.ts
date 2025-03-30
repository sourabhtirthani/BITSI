import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { userAddress: string } }) {
    try {
      const { params } = context;
      
      if (!params.userAddress) {
        return NextResponse.json({ error: 'No address provided' }, { status: 400 });
      }
      const adminNfts = await db.nft.findMany({
        where : {
            nft_owner_address : params.userAddress
        }
      })
  
      return NextResponse.json(adminNfts, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }