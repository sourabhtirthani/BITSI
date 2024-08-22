import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(){
try{ 
    const compensation = await db.compensation.findMany({
        where : {
            Status : 'Pending'
        }
      });
      
   
      console.log(compensation)
        return NextResponse.json(compensation, { status: 200 });
}catch(error){
    return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
}
}