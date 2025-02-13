'use server'
import db from "@/db";

type CoinInsuranceReturnType = { success: boolean }
export const purchaseCoinInsurance = async(userAddress : string , totalCoinsToInsure : number , totalAmount : number, coinTransactionId : number , numberOfYears : number) : Promise<CoinInsuranceReturnType> =>{
    try{
        // console.log(`this is the coins id : ${coinId}`)
        const coin = await db.coin.findUnique({
            where : {userAddress : userAddress}, 
            select : {
                id : true
            }
        })
        if(!coin){
            console.log('in here in the not of coin place bro')
            throw new Error('Coin Not Found');
        }
        // if(coin.totalCoins < totalCoinsToInsure){
        //     throw new Error('Not Enough Coins');
        // }
        // if(coin.unInsuredCoins < totalCoinsToInsure){
        //     throw new Error('Not Enough Un Insured Coins');
        // }
        // const converageOfInsurance = (coin.totalAmount/coin.totalCoins) * totalCoinsToInsure;
        // const coverageOfInsurance = ((totalCoinsToInsure*marketPricePerCoin) * 80)/100;\
        // console.log(`the total coins to insure is : $${totalCoinsToInsure} and the market price per coin is : ${marketPricePerCoin}`)
        // const coverageOfInsurance = totalCoinsToInsure*marketPricePerCoin
        // console.log(`the total coverage that came amount has now become : ${coverageOfInsurance}`)
        await db.$transaction(async (tx) => {
            await tx.coinInsurance.create({
                data : {
                    coinId : coin.id,
                    coinsInsured : totalCoinsToInsure,
                    coverage : totalAmount,
                    startTime : new Date(),
                    expiration : new Date(Date.now() + numberOfYears * 365 * 24 * 60 * 60 * 1000),
                    status : 'ApprovalPending',
                    is_extended : false
                }
            })
            await tx.coinTransactionEvent.update({
                where : {id : coinTransactionId},
                data : {
                    showInInsurance : false
                }
            })

        })
        return {success : true}
    }catch(error){
        console.log(error);
        console.log('in here')
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
        const numberOfYears = Math.round((coinInsurance.expiration.getTime() - coinInsurance.startTime.getTime()) / (365 * 24 * 60 * 60 * 1000));
        console.log(`the number of years is : ${numberOfYears}`)
        await db.$transaction(async (tx) => {
            await tx.coinInsurance.update({
                where : {id : coinInsuranceId},
                data : {
                    status : 'Approved',
                    startTime : new Date(),
                    expiration : new Date(Date.now() + numberOfYears * 365 * 24 * 60 * 60 * 1000),
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


export const purchaseCoinInsuranceAfterApproval = async(coinInsuranceId : number, marketPricePerCoin : number , numberOfYears : number) =>{
    try{    
        const coinInsurance = await db.coinInsurance.findUnique({
            where : {
                id : coinInsuranceId
            }
        });

        if(!coinInsurance){
            throw new Error('No insurance found');
        }
        // const coverageOfInsurance = ((coinInsurance.coinsInsured*marketPricePerCoin) * 80)/100;
        const coverageOfInsurance = coinInsurance.coinsInsured*marketPricePerCoin;
        await db.$transaction(async (tx)=>{
            await tx.coinInsurance.update({
                where : {
                    id : coinInsuranceId
                },
                data : {
                    status : 'Active',
                    startTime : new Date(),
                    expiration : new Date(new Date().setFullYear(new Date().getFullYear() + numberOfYears))
                    // coverage : coverageOfInsurance

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

export const extendInsuranceForCoin = async(coinInsuranceId : number): Promise<CoinInsuranceReturnType>=>{
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
        await db.$transaction(async (tx) => {
            await tx.coinInsurance.update({
                where : {
                    id : coinInsuranceId
                },
                data : {
                   expiration : newExpirationDate,
                   is_extended : true
                }
            })
            await tx.coinInsuranceEvent.create({
                data : {
                    eventName : 'Extend',
                    insuranceId : coinInsuranceId,
                    
                }
            })
        })
        return {success : true}
    }catch(error){
        throw new Error('Error Extending Insurance');
    }
}

export const upgradeInsuranceForCoin = async(coinInsuranceId : number , address : string): Promise<CoinInsuranceReturnType>=>{
    try{
        const currCoverage = await db.coinInsurance.findUnique({
            where : {
                id : coinInsuranceId
            },
            select : {
                coverage : true
            }
        })
        if(!currCoverage){
            throw new Error('Error upgrading insurance');
        }
        const coverrageToDeductFromCreditScore = currCoverage.coverage * 0.2;


        const newCoverage = currCoverage.coverage +  (currCoverage.coverage * 0.2);
        await db.$transaction(async (tx)=>{
            await tx.coinInsurance.update({
                where : {
                    id : coinInsuranceId
                },
                 data : {
                    is_upgraded : true,
                    coverage : newCoverage
                }
            })

            await tx.coinInsuranceEvent.create({
                data : {
                    eventName : 'Upgrade',
                    insuranceId : coinInsuranceId
                }
            })
        });

        // await db.user.update({
        //     where: { walletAddress: address },
        //     data: {
        //         creditScore: {
        //             decrement: coverrageToDeductFromCreditScore
        //         }
        //     }
        // });
        await db.$executeRaw`UPDATE "User" SET "creditScore" = GREATEST("creditScore" - ${coverrageToDeductFromCreditScore}, 0) WHERE "walletAddress" = ${address};`;
        
        return {success : true}
    }catch(error){
        console.log(error);
        throw new Error('Error Upgrading Insurance');
    }
}