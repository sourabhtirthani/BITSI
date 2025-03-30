import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { userAddress: string } }) {
    try {
      const { params } = context;
      
      if (!params.userAddress) {
        return NextResponse.json({ error: 'No address provided' }, { status: 400 });
      }
      const coinsOfUser = await db.coin.findUnique({
        where : {
            userAddress : params.userAddress
        },
        include : {
            insurances : {
                where : {
                    status: {
                        in : ["ApprovalPending" , "Approved"]
                    }
                }
            }
        }
      })
      console.log("coinsOfUser ",coinsOfUser);
      return NextResponse.json(coinsOfUser, { status: 200 });
  
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }