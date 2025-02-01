import { NextResponse } from 'next/server'
import db from '@/db'

export async function GET(){
    try{
        const allCurrenncies = await db.supportTedCurrencies.findMany();
        return NextResponse.json(allCurrenncies , {status : 200});
    }catch(error){
        return NextResponse.json({message : "Internal server error"}, {status : 500})
    }
}