import { NextResponse } from 'next/server'
import db from '@/db'


/**
 * Get all insurance requests
 */
export async function GET() {
    try {
        const insuranceRequests = await db.insuranceApprove.findMany();
        return NextResponse.json(insuranceRequests, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

/**
 * Insert new insurance approval request
 */
export async function POST(req: Request) {
    try {
        const { address, amount, status } = await req.json();

        const newRequest = await db.insuranceApprove.create({
            data: { address, amount, status: status || "pending" },
        });

        return NextResponse.json(newRequest, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
