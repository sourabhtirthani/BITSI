// import client from "../database/index.js";
import pool from "../database/index.js";

export const buyEvent = async(from , to , time , price, nftId)=>{
    try{
        const client = await pool.connect();
        const nftEvent = 'buy';
        const nftEventForSold = 'Sold';

        const nftPriceQuery = `SELECT nft_price FROM "Nft" WHERE id = ${nftId};`;
        const nftPriceResult = await client.query(nftPriceQuery)
        if (nftPriceResult.rows.length === 0) {
            throw new Error('NFT not found');
        }
        const lastPrice = nftPriceResult.rows[0].nft_price;
        const lossAmount =  lastPrice - price;

    const insertQuery = `
    INSERT INTO "Nft_events" (nft_event, nft_price, "from", "to", time, "nftId" , asset_name)
    VALUES ('${nftEvent}', ${price}, '${from}', '${to}', '${time.toISOString()}', ${nftId} , 'NFT');`;


    const insertQuerySold = `INSERT INTO "Nft_events" (nft_event, nft_price, "from", "to", time, "nftId" , asset_name , loss_amount)
    VALUES ('${nftEventForSold}', ${price}, '${to}', '${from}', '${time.toISOString()}', ${nftId} , 'NFT' , ${lossAmount});`;

     await client.query(insertQuery);   
     await client.query(insertQuerySold);
     const updateQuery = `UPDATE "Nft" SET nft_owner_address = '${to}', up_for_sale = false , nft_price = ${price} WHERE id = ${nftId};`;
     await client.query(updateQuery);

      const updateInsuraceQuery = `UPDATE "Insurance"  SET "soldValue" = ${price} , "currentOwner" = ${to} WHERE "nftId" = ${nftId};`
      await client.query(updateInsuraceQuery);
      console.log(`successfully insrted into the events `);
      client.release(); 
    }catch(error){
        console.log(`error inserting into the database the error is :`)
        console.log(error)
        client.release(true);
    }
    
}