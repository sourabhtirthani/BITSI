import prisma from "@/db";
import { NextResponse } from "next/server";


export async function GET(){

    const nfts = await prisma.nft.findMany({
        select: {
            id: true,
            nft_name : true,
            nft_price : true,
            nft_image : true,
            nft_collection_name : true,
            
        },
    });
    return NextResponse.json({
        nfts 
    })
}