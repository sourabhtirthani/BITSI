import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
  try {
    const approvals = await db.insuranceApprove.findMany({});
    return NextResponse.json(approvals, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}