import pool from "../database";



// TO DO : Sql Injection handling, transaction(roolback if failed) 
export const puteventToDb = async (event: string) => {
    const client = await pool.connect();
    try {
        console.log(`connected to the database`)
        const { from, to, time, price, assetId, assetType, tokensTransferred, salePrice} = JSON.parse(event);

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
            const coinResultForSeller = await client.query(coinQueryForSeller);
            let coinId;
            //dropping the field totalcoins from the schema will be implemented later
            if (coinResult.rows.length === 0) {  // this is the query where the coins are added to that account
                console.log(`the value of price is : ${price}`);
                const insertCoinQuery = `INSERT INTO "Coin" ("userAddress", "totalCoins", "totalAmount", "unInsuredCoins" , "updatedAt") VALUES ('${to}', ${tokensTransferred}, ${price}, ${tokensTransferred} , '${currentTimestamp.toISOString()}') RETURNING id;`;
                const newCoinResult = await client.query(insertCoinQuery);
                coinId = newCoinResult.rows[0].id;

            } else {

                // drop the field total coins from the schema it is unnecessary
                coinId = coinResult.rows[0].id;

                const updatedTotalCoins = coinResult.rows[0].totalCoins + tokensTransferred;
                const updatedUnInsuredCoins = coinResult.rows[0].unInsuredCoins + tokensTransferred;

                const updateCoinQuery = `UPDATE "Coin" SET "totalCoins" = ${updatedTotalCoins}, "unInsuredCoins" = ${updatedUnInsuredCoins},  "updatedAt" = '${currentTimestamp.toISOString()}'WHERE "id" = '${coinId}' RETURNING id;`;
                const updatedCoinResult = await client.query(updateCoinQuery);

            }
            if(coinResultForSeller.rows.length == 0){
                const insertCoinQueryForSeller = `INSERT INTO "Coin" ("userAddress", "totalCoins", "totalAmount", "unInsuredCoins" , "updatedAt") VALUES ('${from}', -${tokensTransferred}, -${price}, -${tokensTransferred}, '${currentTimestamp.toISOString()}') RETURNING id;`;
            const newCoinResultForSeller = await client.query(insertCoinQueryForSeller);
            const sellerCoinId = newCoinResultForSeller.rows[0].id;
            }else{
                let coinIdForSeller = coinResultForSeller.rows[0].id;
                const updatedTotalCoinsForSell = coinResultForSeller.rows[0].totalCoins - tokensTransferred;
                let updatedUnInsuredCoinsForSell = coinResultForSeller.rows[0].unInsuredCoins - tokensTransferred;
                // if(updatedUnInsuredCoinsForSell < 0){
                //     updatedUnInsuredCoinsForSell = 0;
                // }
                    // further logic will be implemented when more information is given
                const updateCoinQueryForSell = `UPDATE "Coin" SET "totalCoins" = ${updatedTotalCoinsForSell}, "unInsuredCoins" = ${updatedUnInsuredCoinsForSell},  "updatedAt" = '${currentTimestamp.toISOString()}'WHERE "id" = '${coinIdForSeller}' RETURNING id;`;
                const updatedCoinResultForSell = await client.query(updateCoinQueryForSell);
            }
            if (coinId == null) {
                console.log(`coin id was found null that is why returning from the function`); // dont remmeber why i did this
                return;
            }
            if (price == 0) {
                console.log(`from is : ${from} and to is ${to}`)
                // if(to == ' 0xe6F9F756ca735b7Ba7E9B1DaEcAE5228AFF0832f' || to == '0x3B2944D0E7a546166C2Ca93f05e830a6072a9382'){
                const priceForSell = salePrice ? Number(salePrice) : NaN;
                console.log(`price for sell found and it is : ${priceForSell}}`);
                if(!isNaN(priceForSell) && priceForSell !== 0){
                    // reduce the credit score here
                    console.log(`it was a sell event that is detected`)
                    const insertTransferQuery = `INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "price", "from" , "to") VALUES (${tokensTransferred}, 'Sell',${priceForSell} , '${to}', '${from}');`
                await client.query(insertTransferQuery)
                }else{
                const insertTransferQuery = `INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "price", "from" , "to") VALUES (${tokensTransferred}, 'Transfer',${price} , '${from}', '${to}');`
                await client.query(insertTransferQuery)
                }
            } else {
                console.log(`from is : ${from} and to is ${to}`)
                const insertCoinTransactionQuery = `INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "price" , "from" , "to") VALUES (${tokensTransferred}, 'Buy',${price} , '${from}', '${to}');`;
                const insertCoinTransactionQuerySold = `INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "price", "from" , "to") VALUES (${tokensTransferred}, 'Sell',${price} , '${to}', '${from}');`
                await client.query(insertCoinTransactionQuery);
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