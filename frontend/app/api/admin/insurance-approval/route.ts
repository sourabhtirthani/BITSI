import { NextResponse } from "next/server";
import db from "@/db";

export async function GET() {
  try {
    const coinsOfUsers = await db.coin.findMany({
      where: {
        status: {
          not: 0, // Fetch records where status is NOT 0
        }
      },
      orderBy: {
        updatedAt: 'desc', // Order results by createdAt in descending order
      }
    });

    console.log("coinsOfUsers", coinsOfUsers);
    return NextResponse.json(coinsOfUsers, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
