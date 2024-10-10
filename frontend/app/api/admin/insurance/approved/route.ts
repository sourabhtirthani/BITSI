import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
    try {
     const insuranceDetails = await db.insurance.findMany({
        where : {status  :"Approved"},
        select : {
            id:true,
            coverage:true,
            startTime:true,
            approved:true,
            nftId :true,
            currentOwner : true,
            status : true
        }
     })
  
      return NextResponse.json(insuranceDetails, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
  }