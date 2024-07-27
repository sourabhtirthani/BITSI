import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export async function GET(){
    try{
    const nfts = await prisma.nft.findMany({
        select: {
            id: true,
            nft_name : true,
            nft_price : true,
            nft_image : true,
            // nft_collection_id : true,
            nft_collection_name : true,
            nft_mint_time : true,
            nft_owner_address : true,
            collection : {
                select : {
                    image : true
                }
            }
        },
    });
    // revalidatePath('/bitsi-nft')
    return NextResponse.json({
        nfts 
    })
}catch(error){
    console.log('error clause');
    return NextResponse.json({
        error : 'Inernal server error' 
    } , {status : 500})
}
}