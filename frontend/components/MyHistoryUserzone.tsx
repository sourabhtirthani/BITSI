'use client'
import { tableMyHistory } from '@/constants'
import {  NftEventsResponseClaimUserZone } from '@/types';
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { number } from 'zod';
import { useBalance  } from 'wagmi';
export default   function  MyHistoryUserzone({address , filterValue , orderFilter , priceFilter} : {address : string , filterValue : 'NFT' | 'Coins' , orderFilter : string , priceFilter : string}){
  const [historyDetails , setHistoryDetails] = useState<NftEventsResponseClaimUserZone[]>([]);
  const { data: balance} = useBalance({address : address as '0x${string}'});
  const [loaderState , setLoaderState] = useState(true);

  useEffect(()=>{
    const getHistoryData = async()=>{
      if(address){
        try{
          const res = await fetch(`/api/userzone/history/nfts/${address}` , {method : "GET" , next : {revalidate : 0} , } ,  )
          const resParsed = await res.json();
          setHistoryDetails(resParsed)
        }catch(error){
          console.log('error fetching data from the backend')
          console.log(error)
          
        }finally{
          setLoaderState(false)
        }
      }
    }
    getHistoryData();
  } , [address])

  useEffect(()=>{
    const sortDataBasedOnOrderOfDate = async()=>{
      

      if(orderFilter == 'Asc Order'){
        const sortedData = [...historyDetails].sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime());
        setHistoryDetails(sortedData);
      }else if(orderFilter == 'Desc Order'){
        const sortedData = [...historyDetails].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime());
        setHistoryDetails(sortedData);
      } else{

      }
    }
    sortDataBasedOnOrderOfDate();

  } , [orderFilter])

  useEffect(()=>{
    const sortDataBasedOnPrice = async()=>{
      if(priceFilter == 'Low to High'){
        const sortedData = [...historyDetails].sort((a, b) => a.nft_price - b.nft_price);
        setHistoryDetails(sortedData);

      }else if(priceFilter == 'High to Low'){
        const sortedData = [...historyDetails].sort((a, b) => b.nft_price - a.nft_price);
        setHistoryDetails(sortedData);
      }else{

      }
    }
    sortDataBasedOnPrice();
  } , [priceFilter])

  return (
  <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
    <table className='w-full text-left mt-4 border-spacing-20'>
      <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
        <tr>
          <th className='p-2 max-sm:p-1'>Date</th>
          <th className='p-2 max-sm:p-1'>ID</th>
          <th className='p-2 max-sm:p-1'>Name</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
          {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
        </tr>
      </thead>
     
      <tbody className='overflow-y-auto '>
        
        {loaderState == false  && Array.isArray(historyDetails) && historyDetails.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                <td className='p-6 max-sm:p-3'>{new Date(item.time).toDateString()}</td>
                <td className='p-2 max-sm:p-1'>{item.nftId}</td>
                <td className='p-2 max-sm:p-1'>{item.nft.nft_name}</td>
                <td className='p-2 max-sm:p-1'>{item.nft_event}</td>
                <td className='p-2 max-sm:p-1'>{item.nft_price} {balance?.symbol}</td>
                <td className='p-2 max-sm:p-1'>{ new Date(item.nft.insurance.expiration) > new Date() ? 'Yes' : 'No'}</td>
                <td className='p-2 max-sm:p-1'>{item.nft.insurance.coverage} {balance?.symbol}</td>
                <td className='p-2 max-sm:p-1'>{item.nft.insurance.expiration && new Date(item.nft.insurance.expiration).toDateString() || '-'}</td>
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