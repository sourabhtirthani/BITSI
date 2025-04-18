// import { approvePurchaseCoinInsrance } from "@/actions/coins";
import db from "@/db";
import { NextResponse } from "next/server";

export async function GET(request: Request, context: { params: { userAddress: string } }) {
  try {
    const { params } = context;

    if (!params.userAddress) {
      return NextResponse.json({ error: 'No address provided' }, { status: 400 });
    }
    const coinsOfUser = await db.coin.findUnique({
      where: {
        userAddress: params.userAddress
      },
      include: {
        insurances: {
          where: {
            status: {
              in: ["ApprovalPending", "Approved"]
            }
          }
        }
      }
    })
    console.log("coinsOfUser ", coinsOfUser);
    return NextResponse.json(coinsOfUser, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function POST(request: Request, context: { params: { userAddress: string } }) {
  try {
    console.log("POST request received!"); // Debugging

    const { params } = context; 
    const { userAddress } = params;
    const { status, id } = await request.json(); // Accepting `id` dynamically

    console.log(`Updating id: ${id} for userAddress: ${userAddress} with status: ${status}`); // Debugging

    if (!userAddress || !id) {
      return NextResponse.json({ error: "No address or id provided" }, { status: 400 });
    }
    if (![1, 2].includes(status)) {  // Only allowing status 1 & 2 (removed 3 as per your previous request)
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    const updatedCoin = await db.coin.update({
      where: {
        id,
        userAddress
      },
      data: { status },
    });

    await approvePurchaseCoinInsrance(id);
    return NextResponse.json({ message: "Status updated", updatedCoin }, { status: 200 });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error", details: error }, { status: 500 });
  }
}

export const approvePurchaseCoinInsrance = async(coinInsuranceId : number)=>{
  try{
      const coinInsurance = await db.coinInsurance.findFirst({
          where : {coinId : coinInsuranceId},
          include : {
              coin:{
                  select:{
                      id : true,
                      unInsuredCoins : true
                  }
              }
          }
      })
      if(!coinInsurance){
          throw new Error('Coin Insurance Not Found');
      }
     
      if(coinInsurance.status == 'Active'){
          throw new Error('Coin Insurance is already active');
      }
      const numberOfYears = Math.round((coinInsurance.expiration.getTime() - coinInsurance.startTime.getTime()) / (365 * 24 * 60 * 60 * 1000));
      console.log(`the number of years is : ${numberOfYears}`)
    
          await db.coinInsurance.update({
              where : {id : coinInsurance.id},
              data : {
                  status : 'Approved',
                  startTime : new Date(),
                  expiration : new Date(Date.now() + numberOfYears * 365 * 24 * 60 * 60 * 1000),
              }
          })
          await db.coin.update({
              where : {id : coinInsurance.coin.id},
              data : {
                  unInsuredCoins : coinInsurance.coin.unInsuredCoins - coinInsurance.coinsInsured
              }
          })
    
      return {success : true}
  }catch(error){
      throw new Error('Error Purchasing Coin Insurance');
  }
}