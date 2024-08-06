'use client'
import { tableMyHistory } from '@/constants'
import { NftEventGet } from '@/types';
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
// const getData = async(address : String) : Promise<NftEventGet[] | null>=>{
//     try{
//         const response = await fetch(`/api/events/nfts/${address}`);
//         const eventDetails : NftEventGet[] = await response.json();
//         return eventDetails;
//     }catch(error){
//         // throw new Error('error fetching events')
//         return 
//     }
// }
export default   function  MyHistoryUserzone({address , filterValue} : {address : string , filterValue : 'NFT' | 'Coins'}){
  const [eventDetails , setEventDetails] = useState<NftEventGet[]>([])
  const [loaderState , setLoaderState] = useState(false);
  useEffect(()=>{
    const getEventDetailsData = async()=>{
      try{
          const res = await fetch(`/api/events/nfts/${address}` , {method : "GET" , next : {revalidate : 0} , } ,  )
          const respos = await res.json();
          setEventDetails(respos);
          setLoaderState(true)
      }catch(error){
        console.log('error fetching data from the backend')
        console.log(error)
      }
    }
    getEventDetailsData()
  } , [])
    // let eventDetails = [];
    // try{
    //  eventDetails = await fetch(`/api/events/nfts/${address}` , {method : "GET" , next : {revalidate : 0}} ).then(res =>res.json().then(data => data as any[]));
    // }catch(error){
    //     return <div>Failed to load data.</div>;
    // }
//  const eventDetails : NftEventGet[] = await response.json();
// const eventDetails = await getData(address)
// const eventDetails = await getUserEvents(address)
// try {
//   const response = await fetch(`/api/events/nfts/${address}`);
//   const eventDetails = await response.json();

//   if (!eventDetails || eventDetails.length === 0) {
//     return (
//       <div>
//         No events found
//       </div>
//     );
//   }
  return (
  <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
    <table className='w-full text-left mt-4 border-spacing-20'>
      <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
        <tr>
          <th className='p-2 max-sm:p-1'>Date</th>
          <th className='p-2 max-sm:p-1' >MarketPlace</th>
          <th className='p-2 max-sm:p-1'>ID</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Insured</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Insurance&nbsp;Coverage</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Insurance&nbsp;Expiry</th>
          {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
        </tr>
      </thead>
     
      <tbody className='overflow-y-auto '>
        
        {loaderState == true && eventDetails && eventDetails.length > 0 && Array.isArray(eventDetails) && eventDetails.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                <td className='p-6 max-sm:p-3'>{}s</td>
                <td className='p-2 max-sm:p-1'>BITSI</td>
                <td className='p-2 max-sm:p-1'>{item.nftId}</td>
                <td className='p-2 max-sm:p-1'>{item.nft_event}</td>
                <td className='p-2 max-sm:p-1'>{item.nft_price} Matic</td>
                <td className='p-2 max-sm:p-1'>-</td>
                <td className='p-2 max-sm:p-1'>-</td>
                <td className='p-2 max-sm:p-1'>-</td>
                {/* <td className='p-2 max-sm:p-1'>{item.Compensation}</td> */}
               
                {/* <DropdownMyProfile setValue={setHistoryDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems}/> */}
              </tr>
              <tr>
                <td  className='h-5'></td>
              </tr>
            </React.Fragment>
          )
        })}
      </tbody>

    </table>
         {loaderState == false &&<LoaderComp /> }
  </div>) 

// }  catch (error) {
//   console.error('Error fetching events:', error);
//   return (
//     <div>
//       An error occurred
//     </div>
//   );
// }
}

// export default MyHistoryUserzone