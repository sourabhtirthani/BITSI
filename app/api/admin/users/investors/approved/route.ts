import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(){
    try {
        const pendingInvestors = await db.user.findMany({
            where: {
                investorStatus: "Approved"
            },
            select: {
                id: true,
                email: true,
                investorStatus: true,
                createdAt: true,
                walletAddress : true,
                creditScore : true,
                name : true,
                country : true
            }
        });
        return NextResponse.json(pendingInvestors , {status : 200})
    } catch (error) {
        return NextResponse.json({error : "Internal server error"} , {status : 500})
    }
}