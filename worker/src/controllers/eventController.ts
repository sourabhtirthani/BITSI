import pool from "../database";

export const puteventToDb = async(event : string)=>{
    const client = await pool.connect();
    try{
        console.log(`connected to the database`)
        const {from , to , time , price, nftId} = JSON.parse(event)
        const nftEvent = 'buy';
        const nftEventForSold = 'Sold';

        const nftPriceQuery = `SELECT nft_price , is_insured FROM "Nft" WHERE id = ${nftId};`;
        const nftPriceAndInsuredResult = await client.query(nftPriceQuery)
        if (nftPriceAndInsuredResult.rows.length === 0) {
            throw new Error('NFT not found');
        }
        const lastPrice = nftPriceAndInsuredResult.rows[0].nft_price;   // last price will be the buy price of the previous owner who is "from" here
        const lossAmount =  lastPrice - price;

    const insertQuery = `
    INSERT INTO "Nft_events" (nft_event, nft_price, "from", "to", time, "nftId" , asset_name)
    VALUES ('${nftEvent}', ${price}, '${from}', '${to}', '${time.toISOString()}', ${nftId} , 'NFT');`;


    const insertQuerySold = `INSERT INTO "Nft_events" (nft_event, nft_price, "from", "to", time, "nftId" , asset_name , loss_amount)
    VALUES ('${nftEventForSold}', ${price}, '${to}', '${from}', '${time.toISOString()}', ${nftId} , 'NFT' , ${lossAmount});`;

     await client.query(insertQuery);   
     await client.query(insertQuerySold);
     const updateQuery = `UPDATE "Nft" SET nft_owner_address = '${to}', up_for_sale = false , nft_price = ${price} WHERE id = ${nftId} AND status = 'Active';`;
     await client.query(updateQuery);
     if(nftPriceAndInsuredResult.rows[0].is_insured == true){   // if the nft is insured , delete the previous insurance , then generate claim if there is a loss
        const lossPercent = (lossAmount/lastPrice) * 100;
        const insuranceDetailsQuery = `SELECT coverage, expiration, "nftId" FROM "Insurance" WHERE "nftId" = ${nftId};`;
        const insuranceDetails = await client.query(insuranceDetailsQuery);
        if(insuranceDetails.rows.length > 0){
            const claimInsertQuery = `
            INSERT INTO "Claims" ("userAddress", "compensationGenerated", "expiration", "buyPrice", "soldPrice", "loss", "assetId", "coverage", "lossPercent") 
            VALUES ('${from}', ${false}, '${insuranceDetails.rows[0].expiration}', ${lastPrice}, ${price}, ${lossAmount}, ${nftId}, ${insuranceDetails.rows[0].coverage}, ${lossPercent});
        `;
        await client.query(claimInsertQuery);
    }
    const deleteExistingInsuranceQuery = `DELETE FROM "Insurance" WHERE "nftId" = ${nftId};`;
    await client.query(deleteExistingInsuranceQuery);
     }
      console.log(`successfully insrted into the events `);
      client.release(); 
    }catch(error){
        console.log(`error inserting into the database the error is :`)
        console.log(error)
        client.release(true);
    }
    
}