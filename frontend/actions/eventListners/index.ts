import db from '../../db/index'
type eventListenerControllerType = { success: boolean }
export const eventListenerController = async(from : string , to : string , time : Date , price : any, nftId : number) : Promise<eventListenerControllerType>=>{
  try{
      
      console.log('in the function of buy event ')
      const nftEvent = 'buy';
      const nftEventForSold = 'Sold';
  
    await db.nft_events.create({
      data:{
        nft_event : nftEvent,
        nft_price : price,
        from : from,
        to : to,
        time : time.toISOString(),
        nftId : nftId,
        asset_name : 'NFT'
      }
    })

  
    await db.nft_events.create({
      data : {
        nft_event : nftEventForSold,
        nft_price : price,
        from : to,
        to : from,
        time : time.toISOString(),
        nftId : nftId,
        asset_name : 'NFT'
      }
    })

 
;
  await db.nft.update({
    where: {
      id: nftId,
    },
    data: {
      nft_owner_address: to,
      up_for_sale: false,
    },
  });
   

   
    await db.insurance.update({
      where: {
        nftId: nftId,
      },
      data: {
        soldValue: price,
        currentOwner: to,
      },
    });
    console.log(`successfully insrted into the events `);
    return {success : true}
  }catch(error){
    console.log(`error inserting into the database the error is :`)
    console.log(error)
    return{success : false}
      
  }
  
}