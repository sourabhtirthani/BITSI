import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request : Request , context :  {params : { userAddress: string}}){
    try{
        const  {params} = context;
        if(!params.userAddress){
            return NextResponse.json({
                error : 'No address Provided'
            }, {status : 400})
        }
        const user = await db.user.findUnique({
            where : {
                walletAddress : params.userAddress
            },
            select : {
                id : true,
            }
        })
        if(!user){
            return NextResponse.json({message : 'No user found'} , {status : 404});
        }
        return NextResponse.json({message : 'User exists'}, { status: 200 });
    }catch(error){
        return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
    } 
}