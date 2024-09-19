// import client from "../database/index.js";
import pool from "../database/index.js";

export const buyEvent = async(from , to , time , price, nftId)=>{
    try{
        const client = await pool.connect();
        console.log('in the function of buy event ')
        const nftEvent = 'buy';
        const nftEventForSold = 'Sold';
    const insertQuery = `
    INSERT INTO "Nft_events" (nft_event, nft_price, "from", "to", time, "nftId" , asset_name)
    VALUES ('${nftEvent}', ${price}, '${from}', '${to}', '${time.toISOString()}', ${nftId} , 'NFT');`;


    const insertQuerySold = `INSERT INTO "Nft_events" (nft_event, nft_price, "from", "to", time, "nftId" , asset_name)
    VALUES ('${nftEventForSold}', ${price}, '${to}', '${from}', '${time.toISOString()}', ${nftId} , 'NFT');`;


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