import pool from "../database";

export const puteventToDb = async (event: string) => {
    const client = await pool.connect();
    try {
        console.log(`connected to the database`)
        const { from, to, time, price, assetId, assetType, tokensTransferred } = JSON.parse(event);
       
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
            const coinQuery = `SELECT * FROM "Coin" WHERE "userAddress" = '${to}';`;
            
           
            const coinResult = await client.query(coinQuery);
            
            let coinId;
            if (coinResult.rows.length === 0) {

                const insertCoinQuery = `
                INSERT INTO "Coin" ("userAddress", "totalCoins", "totalAmount", "unInsuredCoins")
                VALUES ('${to}', ${tokensTransferred}, ${price}, ${tokensTransferred}) RETURNING id;
            `;
                // console.log('in here on line number 61')
                const newCoinResult = await client.query(insertCoinQuery);
                coinId = newCoinResult.rows[0].id;
                // console.log(`in here on line number 64 and the coind is : ${coinId}`)
                // console.log('Created new Coin record for the user');
            } else {
                coinId = coinResult.rows[0].id;
                // console.log(`the id of the coin is : ${coinId}`)
                const updatedTotalCoins = coinResult.rows[0].totalCoins + tokensTransferred;
                const updatedUnInsuredCoins = coinResult.rows[0].unInsuredCoins + tokensTransferred;
                // console.log(`in here on line number 70 and then the updated total coins is : ${updatedTotalCoins} and updated un insured coins is : ${updatedUnInsuredCoins}`);
                const updateCoinQuery = `
                UPDATE "Coin" 
                SET "totalCoins" = ${updatedTotalCoins}, "unInsuredCoins" = ${updatedUnInsuredCoins} 
                WHERE "id" = '${coinId}' RETURNING id;
            `;
                const updatedCoinResult = await client.query(updateCoinQuery);
                // console.log(`the id from the updated coin result is : ${updatedCoinResult.rows[0].id}`);
                // console.log('Updated Coin record for the user');
            }
            if (coinId == null) {
                console.log(`coin id was found null that is why returning from the function`);
                return;
            }
            const insertCoinTransactionQuery = `
        INSERT INTO "CoinTransaction" ("coinsTransferred", "eventName", "price", "coinId")
        VALUES (${tokensTransferred}, 'Transfer',${price}, ${coinId});
    `;
            await client.query(insertCoinTransactionQuery);
            // console.log('Registered new CoinTransaction event for the user');

        }

        console.log(`successfully insrted into the events `);
        client.release();

    } catch (error) {
        console.log(`error inserting into the database the error is :`)
        console.log(error)
        client.release(true);
    }

}