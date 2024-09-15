'use client'
import { tableAdminViewAndAnalysis } from '@/constants'
import { AdminNftEventDetail } from '@/types'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp'

const AdminViewAndAnalyseNftRelated = ({searchValue} : {searchValue : string}) => {
    const [loaderInitial , setLoaderInitial] = useState(true);
    const [nftRelatedEvents , setNftRelatedEvents] = useState<AdminNftEventDetail[]>([])
    const [filteredNftRelatedEvents ,setFilteredNftRelatedEvents] = useState<AdminNftEventDetail[]>([])
    useEffect(()=>{
        const getAllNFtEvents = async()=>{
            try{
                const response = await fetch(`/api/admin/events/nft`, { method: "GET", next: { revalidate: 0 }, },)
                const responseOfEventsFormat = await response.json();
                console.log(responseOfEventsFormat)
                setNftRelatedEvents(responseOfEventsFormat);
                setFilteredNftRelatedEvents(responseOfEventsFormat)
            }catch(error){
                console.log('in here in the error clasue')
                
            }finally{
                setLoaderInitial(false);
            }
        }
        getAllNFtEvents();
    }, [])
    useEffect(()=>{
        if(searchValue == ''){
            setFilteredNftRelatedEvents(nftRelatedEvents)
        }else{
            const filteredEvents = nftRelatedEvents.filter(event =>
                event.nft.nft_name.toLowerCase().includes(searchValue.toLowerCase())
              );
              setFilteredNftRelatedEvents(filteredEvents)
        }
    } , [searchValue , nftRelatedEvents])
  return (
    
     <div className='max-h-[500px]  px-8 max-md:px-4 overflow-x-scroll max-xl:table-body xl:scrollbar-none overflow-y-auto mb-20 table-body'>
            <table className='w-full text-left mt-4  border-spacing-20'>
              <thead className='text-success-502  bg-success-511 font-semibold font-manrope text-[22px] max-sm:text-[10px]   '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1' >NFTID</th>
                  <th className='p-2 max-sm:p-1'>Name</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Collection</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Action</th>
                  {/* <th className='p-2 max-sm:p-1 overflow-hidden'>MarketPlace</th> */}
                  {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Price Difference</th> */}
                  {/* <th className='p-2 max-sm:p-1 overflow-hidden'>marketplace</th> */}
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {loaderInitial == false && Array.isArray(filteredNftRelatedEvents) &&  filteredNftRelatedEvents.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className=' w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-2 max-sm:p-1'>{new Date(item.time).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'>{item.nftId}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft.nft_name}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft.collection.name}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_price} ETH</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_event}</td>
                        {/* <td className='p-2 max-sm:p-1'>{item.MarketPlace}</td> */}
                        {/* <td className='p-2 max-sm:p-1'>{item.PriceDifference}</td> */}
                        {/* <td className='p-2 max-sm:p-1'>{item.marketplace}</td> */}
                       
                       
                      </tr>
                      <tr>
                        <td  className='h-4'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
            {loaderInitial == true && <LoaderComp />}
          </div>
          
  )
}

export default AdminViewAndAnalyseNftRelated