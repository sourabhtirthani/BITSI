import { NextResponse } from "next/server";
import db from "@/db";

export async function GET(request : Request, context :  {params : { userAddress: string}}){
try{
    const  {params} = context;
    console.log("in here in the insurance claim function")
    if(!params.userAddress){
        return NextResponse.json({error : 'No address Provided'}, {status : 400})
    }
    const compensations = await db.compensation.findMany({
        where: {
          userAdress : params.userAddress,
          claimed : false
        },
        include :{
          claim : {
            select :{
              soldPrice : true
            }
          }
        }
      });
    return NextResponse.json(compensations, { status: 200 });
}catch(error){
    return NextResponse.json({ error : 'Internal server error' }, { status: 500 })
}
}