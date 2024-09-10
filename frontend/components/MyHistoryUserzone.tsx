'use client'
import { tableMyHistory } from '@/constants'
import { NftEventGet, NftEventGetInsurace } from '@/types';
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { number } from 'zod';
import { useBalance  } from 'wagmi';
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
export default   function  MyHistoryUserzone({address , filterValue , orderFilter , priceFilter} : {address : string , filterValue : 'NFT' | 'Coins' , orderFilter : string , priceFilter : string}){
  // const [eventDetails , setEventDetails] = useState<NftEventGet[]>([])
  const [eventDetailsInsurace , setEventDetailsInsurace] = useState<NftEventGetInsurace[]>([]);
  const { data: balance} = useBalance({address : address as '0x${string}'});

  const [loaderState , setLoaderState] = useState(true);
  // const [nftIds , setNftIds] = useState([])
  useEffect(()=>{
    const getEventDetailsData = async()=>{
      try{
        if(address){
          const res = await fetch(`/api/events/nfts/${address}` , {method : "GET" , next : {revalidate : 0} , } ,  )
          const respos = await res.json();
          // setEventDetails(respos);
          const uniqueNftIds = new Set(respos.map((item: any) => item.nftId));
          const nftIdString = Array.from(uniqueNftIds).map(nftId => `nftId=${nftId}`).join(',');
          const insuranceRes = await fetch(`/api/insurance/nfts/${nftIdString}` , {method : "GET" , next : {revalidate : 0} , } ,  )
          const insuranceResponse = await insuranceRes.json();
          const insuranceMap = new Map<number, any>(insuranceResponse.map((item: { nftId: number }) => [item.nftId, item]));

          const combined = respos.map((event : any) => {
         
            const insurance = insuranceMap.get(event.nftId) || {};
            console.log(insurance)
            return {
              ...event,
              soldValue: insurance.soldValue || '-',
              coverage: insurance.coverage || '-',
              expiration: insurance.expiration || null,
            };
          });
         
          setEventDetailsInsurace(combined)
        
        }
          setLoaderState(false)
      }catch(error){
        console.log('error fetching data from the backend')
        console.log(error)
        setLoaderState(false)
      }
    }
    getEventDetailsData()
  } , [address])

  useEffect(()=>{
    const sortDataBasedOnOrderOfDate = async()=>{
      

      if(orderFilter == 'Asc Order'){
        const sortedData = [...eventDetailsInsurace].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        setEventDetailsInsurace(sortedData);
      }else if(orderFilter == 'Desc Order'){
        const sortedData = [...eventDetailsInsurace].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setEventDetailsInsurace(sortedData);
      } else{

      }
    }
    sortDataBasedOnOrderOfDate();

  } , [orderFilter])

  useEffect(()=>{
    const sortDataBasedOnPrice = async()=>{
      if(priceFilter == 'Low to High'){
        const sortedData = [...eventDetailsInsurace].sort((a, b) => a.nft_price - b.nft_price);
        setEventDetailsInsurace(sortedData);

      }else if(priceFilter == 'High to Low'){
        const sortedData = [...eventDetailsInsurace].sort((a, b) => b.nft_price - a.nft_price);
        setEventDetailsInsurace(sortedData);
      }else{

      }
    }
    sortDataBasedOnPrice();
  } , [priceFilter])

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
          <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
          {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
        </tr>
      </thead>
     
      <tbody className='overflow-y-auto '>
        
        {loaderState == false && eventDetailsInsurace && eventDetailsInsurace.length > 0 && Array.isArray(eventDetailsInsurace) && eventDetailsInsurace.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                <td className='p-6 max-sm:p-3'>{new Date(item.time).toDateString()}</td>
                <td className='p-2 max-sm:p-1'>BITSI</td>
                <td className='p-2 max-sm:p-1'>{item.nftId}</td>
                <td className='p-2 max-sm:p-1'>{item.nft_event}</td>
                <td className='p-2 max-sm:p-1'>{item.nft_price} {balance?.symbol}</td>
                <td className='p-2 max-sm:p-1'>{ new Date(item.expiration) > new Date() ? 'Yes' : 'No'}</td>
                <td className='p-2 max-sm:p-1'>{item.coverage}%</td>
                <td className='p-2 max-sm:p-1'>{item.expiration && new Date(item.expiration).toDateString() || '-'}</td>
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
         {loaderState == true &&<LoaderComp /> }
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