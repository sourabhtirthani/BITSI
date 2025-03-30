'use client'
import  { Fragment, useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { NftEventsResponseClaimUserZone } from '@/types';
import { formatAddressUserZone } from '@/lib/utils';
import { DateRange } from 'react-day-picker';
import { isAfter, isBefore, isSameDay } from "date-fns" 

const AdminTableEvents = ({searchValue , selectedFilter , date} : {searchValue : string , selectedFilter : string , date : DateRange | undefined}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [allEvents , setAllEvents] = useState<NftEventsResponseClaimUserZone[]>([]);
    const [allEventsFiltered , setAllEventsFiltered] = useState<NftEventsResponseClaimUserZone[]>([]);
    useEffect(()=>{
        const getAllEvents = async()=>{
            try{
                const res = await fetch(`/api/admin/events/nft` , {method : "GET" , next : {revalidate : 0} , } ,  )
                const resParsed = await res.json();
                setAllEvents(resParsed)
                setAllEventsFiltered(resParsed)
            }catch(error){
                console.log(`error fetching all the events`);
                console.log(error);
            }finally{
                setLoaderState(false);
            }
        }
        getAllEvents();
    }, [])

    useEffect(()=>{
      const filteredResults = allEvents.filter(event => 
        event.nft && event.nft.nft_name.toLowerCase().includes(searchValue.toLowerCase()) || event.nftId.toString().includes(searchValue)
      );
      setAllEventsFiltered(filteredResults);
    }, [searchValue])

    useEffect(()=>{
      if(selectedFilter != ''){
        const filteredResultsByEvent = allEvents.filter(event=>event.nft_event.toLowerCase().includes(selectedFilter.toLowerCase()));
        setAllEventsFiltered(filteredResultsByEvent)
      }
    } , [selectedFilter])

    useEffect(()=>{
      if(date != undefined && date?.from != undefined && date.to != undefined){
        const filterResultsByDate = allEvents.filter(event => {
          const eventDate = new Date(event.time) 
  
          
          if(date?.from && date?.to){
          const isWithinRange =
            (isSameDay(eventDate, date.from) || isAfter(eventDate, date.from)) && 
            (date.to ? (isSameDay(eventDate, date.to) || isBefore(eventDate, date.to)) : true) 
  
          return isWithinRange
          }else{
              return allEvents;
          }
        })
        setAllEventsFiltered(filterResultsByDate)
      }
    } , [date])
    return (
        <div className='max-h-[500px]  px-8 max-md:px-4 overflow-auto w-full  mb-20 table-body'>
          <table className='min-w-full text-left mt-4 border-spacing-20 overflow-x-auto'>
            <thead className='text-success-502 text-center font-semibold table-auto font-manrope text-[22px] max-sm:text-[10px] underline  '>
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
              </tr>
            </thead>
           
            <tbody className='overflow-y-auto overflow-x-auto overflow-visible'>
              
              {loaderState == false  && Array.isArray(allEventsFiltered) && allEventsFiltered.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <tr className='bg-success-512 text-center relative  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                      <td className='p-2 max-sm:p-3'>{new Date(item.time).toDateString()}</td>
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