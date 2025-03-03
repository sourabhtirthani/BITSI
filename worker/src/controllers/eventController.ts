import pool from "../database";
import { getBalanceOfUser } from "../utils/blockchainUtils";


// TO DO : Used parameterized queries instead of string interpolation , transaction(roolback if failed) 


export const puteventToDb = async (event: string) => {
    const client = await pool.connect();
    try {
        console.log(`connected to the database`)
        const { from, to, time, price, assetId, assetType, tokensTransferred, salePrice } = JSON.parse(event);

        if (assetType == 'nft') {
            const nftEvent = 'buy';
            const nftEventForSold = 'Sold';

            const nftPriceQuery = `SELECT nft_price , is_insured FROM "Nft" WHERE id = ${assetId};`;
            const nftPriceAndInsuredResult = await client.query(nftPriceQuery)
            if (nftPriceAndInsuredResult.rows.length === 0) {
                throw new Error('NFT not found');
            }
            const lastPrice = nftPriceAndInsuredResult.rows[0].nft_price;   // last price will be the buy price of the previous owner who is "from" here
            const lossAmount = lastPrice - price;

            const insertQuery = `
    INSERT INTO "Nft_events" (nft_event, nft_price, "from", "to", time, "nftId" , asset_name)
    VALUES ('${nftEvent}', ${price}, '${from}', '${to}', '${time.toISOString()}', ${assetId} , 'NFT');`;


            const insertQuerySold = `INSERT INTO "Nft_events" (nft_event, nft_price, "from", "to", time, "nftId" , asset_name , loss_amount)
    VALUES ('${nftEventForSold}', ${price}, '${to}', '${from}', '${time.toISOString()}', ${assetId} , 'NFT' , ${lossAmount});`;

            await client.query(insertQuery);
            await client.query(insertQuerySold);
            const updateQuery = `UPDATE "Nft" SET nft_owner_address = '${to}', up_for_sale = false , nft_price = ${price} WHERE id = ${assetId} AND status = 'Active';`;
            await client.query(updateQuery);
            if (nftPriceAndInsuredResult.rows[0].is_insured == true) {   // if the nft is insured , delete the previous insurance , then generate claim if there is a loss
                const lossPercent = (lossAmount / lastPrice) * 100;
                const insuranceDetailsQuery = `SELECT coverage, expiration, "nftId" FROM "Insurance" WHERE "nftId" = ${assetId};`;
                const insuranceDetails = await client.query(insuranceDetailsQuery);
                if (insuranceDetails.rows.length > 0) {
                    const claimInsertQuery = `
            INSERT INTO "Claims" ("userAddress", "compensationGenerated", "expiration", "buyPrice", "soldPrice", "loss", "assetId", "coverage", "lossPercent") 
            VALUES ('${from}', ${false}, '${insuranceDetails.rows[0].expiration}', ${lastPrice}, ${price}, ${lossAmount}, ${assetId}, ${insuranceDetails.rows[0].coverage}, ${lossPercent});
        `;
                    await client.query(claimInsertQuery);
                }
                const deleteExistingInsuranceQuery = `DELETE FROM "Insurance" WHERE "nftId" = ${assetId};`;
                await client.query(deleteExistingInsuranceQuery);
            }


        }
        else if (assetType == 'coin') {
            
            const currentTimestamp = new Date();
            const coinQueryForOwner = `SELECT * FROM "Coin" WHERE "userAddress" = '${to}';`;
            const coinQueryForSeller = `SELECT * FROM "Coin" WHERE "userAddress" = '${from}';`;
            console.log(`the value of the price is : ${price}`)
            const coinResult = await client.query(coinQueryForOwner);
            
            let coinId;
            //dropping the field totalcoins from the schema will be implemented later
            if (coinResult.rows.length === 0) {  // this is the query where the coins are added to that account
                // adding coins to the account is not needed anymore drop the fields and remove the code because we are now directly getting the balance from the blockchain
                console.log(`the value of price is : ${price}`);
                
                const insertCoinQuery = `INSERT INTO "Coin" ("userAddress", "totalCoins", "totalAmount", "unInsuredCoins" , "updatedAt") VALUES ('${to}', ${tokensTransferred}, ${price}, ${tokensTransferred} , '${currentTimestamp.toISOString()}') RETURNING id;`;
                const newCoinResult = await client.query(insertCoinQuery);
                coinId = newCoinResult.rows[0].id;
               

            } else {
                
                // drop the field totalCoins, uninsuredCoins  from the schema it is unnecessary
                coinId = coinResult.rows[0].id;

                const updatedTotalCoins = coinResult.rows[0].totalCoins + tokensTransferred;
                const updatedUnInsuredCoins = coinResult.rows[0].unInsuredCoins + tokensTransferred;

                const updateCoinQuery = `UPDATE "Coin" SET "totalCoins" = ${updatedTotalCoins}, "unInsuredCoins" = ${updatedUnInsuredCoins},  "updatedAt" = '${currentTimestamp.toISOString()}'WHERE "id" = '${coinId}' RETURNING id;`;
                const updatedCoinResult = await client.query(updateCoinQuery);
                

            }

            const coinResultForSeller = await client.query(coinQueryForSeller);
            
            if (coinResultForSeller.rows.length == 0) {
                const insertCoinQueryForSeller = `INSERT INTO "Coin" ("userAddress", "totalCoins", "totalAmount", "unInsuredCoins" , "updatedAt") VALUES ('${from}', -${tokensTransferred}, -${price}, -${tokensTransferred}, '${currentTimestamp.toISOString()}') RETURNING id;`;
                const newCoinResultForSeller = await client.query(insertCoinQueryForSeller);
                const sellerCoinId = newCoinResultForSeller.rows[0].id;
                
            } else {
                let coinIdForSeller = coinResultForSeller.rows[0].id;
                const updatedTotalCoinsForSell = coinResultForSeller.rows[0].totalCoins - tokensTransferred;
                let updatedUnInsuredCoinsForSell = coinResultForSeller.rows[0].unInsuredCoins - tokensTransferred;
                // further logic will be implemented when more information is given
                const updateCoinQueryForSell = `UPDATE "Coin" SET "totalCoins" = ${updatedTotalCoinsForSell}, "unInsuredCoins" = ${updatedUnInsuredCoinsForSell},  "updatedAt" = '${currentTimestamp.toISOString()}'WHERE "id" = '${coinIdForSeller}' RETURNING id;`;
                const updatedCoinResultForSell = await client.query(updateCoinQueryForSell);
            }
            if (coinId == null) {
                console.log(`coin id was found null that is why returning from the function`); // dont remember why i did this
                return;
            }
            if (price == 0) {
                console.log(`from is : ${from} and to is ${to}`)
                // if(to == ' 0xe6F9F756ca735b7Ba7E9B1DaEcAE5228AFF0832f' || to == '0x3B2944D0E7a546166C2Ca93f05e830a6072a9382'){
                const priceForSell = salePrice ? Number(salePrice) : NaN;
                
                let creditPriceToReduce = salePrice ? Number(salePrice) : 0;
                console.log(`price for sell found and it is : ${priceForSell}}`);
                // sell logic starts here
                if (!isNaN(priceForSell) && priceForSell !== 0) {
                    console.log(`it was a sell event that is detected`)
                    const insertTransferQuery = `INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "price", "from" , "to") VALUES (${tokensTransferred}, 'Sell',${priceForSell} , '${from}', '${to}');`
                    await client.query(insertTransferQuery)
                    try{ 
                    // policy update during sell starts  here ***********************************************************************************************
                    const allInsurancePoliciesQuery = `SELECT "CoinInsurance"."id", "CoinInsurance"."coinId", "CoinInsurance"."coinsInsured", "CoinInsurance"."buyPricePerCoin",
                    "CoinInsurance"."coverage", "CoinInsurance"."expiration", "Coin"."userAddress", 
                    "CoinInsurance"."status" FROM "CoinInsurance" JOIN "Coin" ON "CoinInsurance"."coinId" = "Coin"."id" 
                    WHERE "Coin"."userAddress" = '${from}' AND "CoinInsurance"."status" = 'Active' ORDER BY "CoinInsurance"."startTime" ASC;`    // returns all the active policies of the user
                    
                    const allInsurancePoliciesResult = await client.query(allInsurancePoliciesQuery);
                    
                    if (allInsurancePoliciesResult.rows.length > 0) {
                            const currentBalanceOfUser =await getBalanceOfUser(from);
                            const originalBalanceOfUserBeforeSale = currentBalanceOfUser + tokensTransferred;
                            console.log(`the current balance of the user is : ${currentBalanceOfUser}`);
                            const totalCoinsInsuredQuery = `SELECT SUM("CoinInsurance"."coinsInsured") AS "total_coins_insured"
                            FROM "CoinInsurance"
                            JOIN "Coin" ON "CoinInsurance"."coinId" = "Coin"."id"
                            WHERE "Coin"."userAddress" = '${from}';`;
                            const totalCoinsInsuredResult = await client.query(totalCoinsInsuredQuery);
                            const totalCoinsInsured = totalCoinsInsuredResult.rows[0]?.total_coins_insured || 0;
                            let uninsuredCoins = Math.max(originalBalanceOfUserBeforeSale-totalCoinsInsured , 0);
                            let coinsToDeductFromInsuredPolicies = Math.max(0 , tokensTransferred - uninsuredCoins);
                            
                            if(coinsToDeductFromInsuredPolicies > 0){ // deduct from insured policies 
                                let deductions = [];
                                let claimsGenerated = [];
                                const coinsToDeduct = coinsToDeductFromInsuredPolicies;
                                let remainingCoinsToDeduct = coinsToDeduct;
                                for(let i = 0; i < allInsurancePoliciesResult.rows.length; i++){
                                    if(coinsToDeduct <= 0){
                                        break;
                                    }
                                    const policy = allInsurancePoliciesResult.rows[i];
                                    let policyDeduction = Math.min(remainingCoinsToDeduct, policy.coinsInsured);
                                    remainingCoinsToDeduct -= policyDeduction;
                                    
                                    const buyPrice = policyDeduction * policy.buyPricePerCoin;
                                    const sellPrice = policyDeduction * (tokensTransferred/Number(priceForSell));
                                    // if the priceDifference is negative, then the user has lost money 
                                    const priceDifference = sellPrice - buyPrice;  // do we also eliminate the policy if there is no loss?
                                    const lossPercent = (priceDifference / buyPrice) * 100;

                                    // updatting the insurance policy here
                                    const updatedCoinsInsured = policy.coinsInsured - policyDeduction;
                                    const newStatus = (updatedCoinsInsured === 0 && priceDifference < 0) ? 'Claimed' : policy.status;

                                    deductions.push({  // this is to keep track of all the policcies that were affected
                                        policyId : policy.id,
                                        deductedCoins : policyDeduction,
                                        coinsInsuredNew : updatedCoinsInsured,
                                    })
                                    // TO DO : BULK UPDATE
                                    await client.query(
                                        'UPDATE "CoinInsurance" SET "coinsInsured" = $1, "status" = $2 WHERE "id" = $3',
                                        [updatedCoinsInsured, newStatus, policy.id]
                                    );
                                    if(priceDifference < 0){ // user has lost money here
                                        await client.query(
                                            'INSERT INTO "CoinClaim" ("userAddress", "compensationGiven", "buyPrice", "sellPrice", "loss", "lossPercent", "coinInsuranceId", "createdAt") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                                            [from, false, buyPrice, sellPrice, Math.abs(priceDifference), Math.abs(lossPercent), policy.id, new Date()]
                                        );
                                        
                                        claimsGenerated.push({
                                            policyId: policy.id,
                                            loss: Math.abs(priceDifference),
                                            lossPercent: Math.abs(lossPercent)
                                        });
                                    }

                                }

                                
                            }

                    }
                }catch(error){

                }
                    // policy update end here

                    // above is the sell event;
                } else { 
                    // for transfer event of coinns
                    const insertTransferQuery = `INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "price", "from" , "to") VALUES (${tokensTransferred}, 'Transfer',${price} , '${from}', '${to}');`
                    await client.query(insertTransferQuery)
                    try{
                        // instead of making request everytime for each tranfer, we can also cache the response and use it for the next transfer
                        // caching time will be determined upon discussion
                        const getCurrentCoinDetails = await fetch(`https://api.dexscreener.com/latest/dex/tokens/0x94d58ceeceec489fc3c74556f8912608097ee3ab` , {method : 'GET'});
                        const getCurrentCoinDetailsParsed  =await getCurrentCoinDetails.json();
                        const currentCoinPrice = getCurrentCoinDetailsParsed.pairs[0].priceNative;
                        console.log(`the current coin price is : ${currentCoinPrice}`);
                        creditPriceToReduce = Number(currentCoinPrice) * Number(tokensTransferred);
                    }catch(error){
                        creditPriceToReduce = 0.001 * Number(tokensTransferred);
                        console.log(`in the catch block of the fetching the current coin price`);
                    }
                }

                const getCreditScoreQuery = `SELECT "creditScore" FROM "User" WHERE "walletAddress" = $1;`;
                const creditScoreResult = await client.query(getCreditScoreQuery, [from]);

                if (creditScoreResult.rows.length !== 0) {
                    const currentCreditScore = creditScoreResult.rows[0].creditScore;
                    console.log(`the current credit score is : ${currentCreditScore}`);
                    console.log(`the credit price to reduce is : ${creditPriceToReduce}`);
                    const newCreditScore = Math.max(0, currentCreditScore - creditPriceToReduce);
                    console.log(`the new credit score is : ${newCreditScore}`);
                    const updateCreditScoreQuery = `UPDATE "User" SET "creditScore" = $1 WHERE "walletAddress" = $2;`;
                    await client.query(updateCreditScoreQuery, [newCreditScore, from]);
                }
            }
            
            
            else {
                console.log(`from is : ${from} and to is ${to}`)
                // const insertCoinTransactionQuery = `INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "price" , "from" , "to") VALUES (${tokensTransferred}, 'Buy',${price} , '${from}', '${to}');`;
                const insertCoinTransactionQuery = `INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "price", "from", "to") VALUES ($1, 'Buy', $2, $3, $4);`;
                const insertCoinTransactionQuerySold = `INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "price", "from" , "to") VALUES (${tokensTransferred}, 'Sell',${price} , '${to}', '${from}');`
                await client.query(insertCoinTransactionQuery , [tokensTransferred, price, from, to]);
                // await client.query(insertCoinTransactionQuerySold); // not calling the sell event here 
            }


        }

        console.log(`successfully insrted into the events `);
        client.release();

    } catch (error) {
        console.log(`error inserting into the database the error is :`)
        console.log(error)
        client.release(true);
    }

}