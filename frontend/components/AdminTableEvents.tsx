'use client'
import  { Fragment, useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { NftEventsResponseClaimUserZone } from '@/types';
import { formatAddressUserZone } from '@/lib/utils';

const AdminTableEvents = () => {
    const [loaderState , setLoaderState] = useState(true);
    const [allEvents , setAllEvents] = useState<NftEventsResponseClaimUserZone[]>([]);
    useEffect(()=>{
        const getAllEvents = async()=>{
            try{
                const res = await fetch(`/api/admin/events/nft` , {method : "GET" , next : {revalidate : 0} , } ,  )
                const resParsed = await res.json();
                setAllEvents(resParsed)
            }catch(error){
                console.log(`error fetching all the events`);
                console.log(error);
            }finally{
                setLoaderState(false);
            }
        }
        getAllEvents();
    }, [])
    return (
        <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-auto  overflow-y-auto mb-20 table-body'>
          <table className='w-full text-left mt-4 border-spacing-20 overflow-x-auto'>
            <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
              <tr>
                <th className='p-2 max-sm:p-1'>Date</th>
                <th className='p-2 max-sm:p-1'>ID</th>
                <th className='p-2 max-sm:p-1'>Name</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>From</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>To</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
                {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
              </tr>
            </thead>
           
            <tbody className='overflow-y-auto overflow-x-auto'>
              
              {loaderState == false  && Array.isArray(allEvents) && allEvents.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <tr className='bg-success-512 text-center relative  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                      <td className='p-6 max-sm:p-3'>{new Date(item.time).toDateString()}</td>
                      <td className='p-2 max-sm:p-1'>{item.nftId}</td>
                      <td className='p-2 max-sm:p-1'>{item.nft.nft_name}</td>
                      <td className='p-2 max-sm:p-1'>{item.nft_event}</td>
                      <td  className='p-2 max-sm:p-1'>{formatAddressUserZone(item.from)}</td>
                      <td className='p-2 max-sm:p-1'>{formatAddressUserZone(item.to)}</td>
                      <td className='p-2 max-sm:p-1'>{item.nft_price} </td>
                      <td className='p-2 max-sm:p-1'>{ new Date(item.nft.insurance.expiration) > new Date() ? 'Yes' : 'No'}</td>
                      <td className='p-2 max-sm:p-1'>{item.nft.insurance.coverage} </td>
                      <td className='p-2 max-sm:p-1'>{item.nft.insurance.expiration && new Date(item.nft.insurance.expiration).toDateString() || '-'}</td>
                    </tr>
                    <tr>
                      <td  className='h-5'></td>
                    </tr>
                  </Fragment>
                )
              })}
            </tbody>
      
          </table>
               {loaderState == true &&<LoaderComp /> }
        </div>) 
}

export default AdminTableEvents