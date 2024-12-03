import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { userAddress: string } }) {
    try {
      const { params } = context;
      
      if (!params.userAddress) {
        return NextResponse.json({ error: 'No address provided' }, { status: 400 });
      }
      const currentDate = new Date();
      const allcoinInsuranceOfUser = await db.coinInsurance.findMany({
        where :{
            coin : {
                userAddress : params.userAddress
            },
            status : 'Active',
            is_extended : false
        }
      })
  
    //   if (!nftsOfUser.length) {
    //     return NextResponse.json({ message: 'No NFTs found' }, { status: 404 });
    //   }
  
      return NextResponse.json(allcoinInsuranceOfUser, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }