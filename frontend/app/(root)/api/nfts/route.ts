import prisma from "@/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";


export async function GET(){
    try{
    const nfts = await prisma.nft.findMany({
        where : {
            up_for_sale : true
        },
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
    return new NextResponse(JSON.stringify({ nfts }), {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
          'Surrogate-Control': 'no-store',
        },
      });
}catch(error){
    console.log('error clause');
    return NextResponse.json({
        error : 'Inernal server error' 
    } , {status : 500})
}
}