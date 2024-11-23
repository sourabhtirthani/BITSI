import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { userAddress: string } }) {
    try {
      const { params } = context;
      
      if (!params.userAddress) {
        return NextResponse.json({ error: 'No address provided' }, { status: 400 });
      }
      const nftsOfUser = await db.nft.findMany({
        where: {
          nft_owner_address: { equals: params.userAddress },
          is_insured : false,
        },
        select: {
          id: true,
          nft_name: true,
          nft_price: true,
          nft_mint_time: true,
          is_insured: true,
          insurance: {
            select: {
              coverage: true,
              startTime: true,
              expiration: true,
              active: true,
              approved: true,
              currentOwner: true,
              status : true,
            }
          }
        }
      });
      return NextResponse.json(nftsOfUser, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }