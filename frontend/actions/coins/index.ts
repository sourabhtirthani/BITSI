'use server'
import db from "@/db";

type CoinInsuranceReturnType = { success: boolean }
export const purchaseCoinInsurance = async(coinId : number , userAddress : string , totalCoinsToInsure : number) : Promise<CoinInsuranceReturnType> =>{
    try{
        const coin = await db.coin.findUnique({
            where : {id : coinId}
        })
        if(!coin){
            throw new Error('Coin Not Found');
        }
        if(coin.totalCoins < totalCoinsToInsure){
            throw new Error('Not Enough Coins');
        }
        if(coin.unInsuredCoins < totalCoinsToInsure){
            throw new Error('Not Enough Un Insured Coins');
        }
        const converageOfInsurance = (coin.totalAmount/coin.totalCoins) * totalCoinsToInsure;
            await db.coinInsurance.create({
                data : {
                    coinId : Number(coinId),
                    coinsInsured : totalCoinsToInsure,
                    coverage : converageOfInsurance,
                    startTime : new Date(),
                    expiration : new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000),
                    status : 'ApprovalPending',
                    is_extended : false
                }
            })
        return {success : true}
    }catch(error){
        console.log(error);
        throw new Error('Error Purchasing Coin Insurance');
    }
}

export const approvePurchaseCoinInsrance = async(coinInsuranceId : number) : Promise<CoinInsuranceReturnType> =>{
    try{
        const coinInsurance = await db.coinInsurance.findUnique({
            where : {id : coinInsuranceId},
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
        await db.$transaction(async (tx) => {
            await tx.coinInsurance.update({
                where : {id : coinInsuranceId},
                data : {
                    status : 'Approved',
                    expiration : new Date(Date.now() + 2 * 365 * 24 * 60 * 60 * 1000),
                    startTime : new Date()
                }
            })
            await tx.coin.update({
                where : {id : coinInsurance.coin.id},
                data : {
                    unInsuredCoins : coinInsurance.coin.unInsuredCoins - coinInsurance.coinsInsured
                }
            })
        })
        return {success : true}
    }catch(error){
        throw new Error('Error Purchasing Coin Insurance');
    }
}


export const purchaseCoinInsuranceAfterApproval = async(coinInsuranceId : number) =>{
    try{    
        const coinInsurance = await db.coinInsurance.findUnique({
            where : {
                id : coinInsuranceId
            }
        });
        if(!coinInsurance){
            throw new Error('No insurance found');
        }
        await db.$transaction(async (tx)=>{
            await tx.coinInsurance.update({
                where : {
                    id : coinInsuranceId
                },
                data : {
                    status : 'Active',
                    startTime : new Date(),
                    expiration : new Date(new Date().setFullYear(new Date().getFullYear() + 2))
                }
            })
            await tx.coinInsuranceEvent.create({
                data :{
                    eventName : 'Purchase',
                    insuranceId : coinInsuranceId
                }
            })
        })

    }catch(error){
        throw new Error('Error Purchasing Coin Insurance Policy');
    }
}

export const extendInsurance = async(coinInsuranceId : number): Promise<CoinInsuranceReturnType>=>{
    try{
        const currExpiration = await db.coinInsurance.findUnique({
            where : {
                id : coinInsuranceId
            },
            select : {
                expiration : true
            }
        })
        if(!currExpiration){
            throw new Error('Error extending insurance');
        }
        const newExpirationDate = new Date(currExpiration.expiration);
        newExpirationDate.setFullYear(newExpirationDate.getFullYear() + 1);
        await db.coinInsurance.update({
            where : {
                id : coinInsuranceId
            },
            data : {
               expiration : newExpirationDate,
               is_extended : true
            }
        })
        return {success : true}
    }catch(error){
        throw new Error('Error Extending Insurance');
    }
}