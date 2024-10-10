import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { userAddress: string } }) {
    try {
      const { params } = context;
      
      if (!params.userAddress) {
        return NextResponse.json({ error: 'No address provided' }, { status: 400 });
      }
      const currentDate = new Date();
      const nftsOfUser = await db.nft.findMany({
        where: {
          nft_owner_address: params.userAddress,
          is_insured: true, 
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
              currentOwner: true
            }
          }
        }
      });
      const filteredNfts = nftsOfUser.filter(nft => 
        nft.insurance?.coverage && nft.nft_price > nft.insurance.coverage
      );

  
      return NextResponse.json(filteredNfts, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }