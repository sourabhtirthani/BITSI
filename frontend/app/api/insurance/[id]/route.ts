import { NextResponse } from 'next/server';
import db from '@/db';

/**
 * Get a specific insurance request by ID
 */
export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        const request = await db.insuranceApprove.findUnique({
            where: { id: Number(params.id) },
        });

        if (!request) return NextResponse.json({ message: "Request not found" }, { status: 404 });

        return NextResponse.json(request, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}

/**
 * Update insurance request (approve/reject)
 */
export async function PUT(req: Request, { params }: { params: { id: string } }) {
    try {
        const { status } = await req.json();

        if (!["approved", "rejected"].includes(status)) {
            return NextResponse.json({ message: "Invalid status value" }, { status: 400 });
        }

        const updatedRequest = await db.insuranceApprove.update({
            where: { id: Number(params.id) },
            data: { status },
        });

        return NextResponse.json(updatedRequest, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error" }, { status: 500 });
    }
}
