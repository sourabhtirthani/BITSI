import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
    try {
     const coinInsuranceDetails = await db.coinInsurance.findMany({
        where : {status : "ApprovalPending"},
        include : {
            coin : {
              select : {
                id  : true,
                totalCoins : true,
                unInsuredCoins : true,
                totalAmount : true,
                createdAt : true,
                userAddress : true
              }
            }
        }
     })
  
      return NextResponse.json(coinInsuranceDetails, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }