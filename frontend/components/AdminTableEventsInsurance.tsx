'use client'
import  { Fragment, useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { InsuranceEventsAdminTable } from '@/types';
import { formatAddressUserZone } from '@/lib/utils';
import { isAfter, isBefore, isSameDay } from "date-fns" 
import { DateRange } from 'react-day-picker';

const AdminTableEventsInsurance = ({searchValue , selectedFilter , date} : {searchValue : string , selectedFilter : string , date : DateRange | undefined}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [allEvents , setAllEvents] = useState<InsuranceEventsAdminTable[]>([]);
    const [allEventsFiltered , setAllEventsFiltered] = useState<InsuranceEventsAdminTable[]>([]);
    useEffect(()=>{
        const getAllEvents = async()=>{
            try{
                const res = await fetch(`/api/admin/events/insurance` , {method : "GET" , next : {revalidate : 0} , } ,  )
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
        event.insurance.nftId.toString().includes(searchValue)
      );
      setAllEventsFiltered(filteredResults);
    }, [searchValue])

    useEffect(()=>{
      if(selectedFilter != ''){
        const filteredResultsByEvent = allEvents.filter(event=>event.eventname.toLowerCase().includes(selectedFilter.toLowerCase()));
        setAllEventsFiltered(filteredResultsByEvent)
      }
    } , [selectedFilter])

    useEffect(()=>{
      if(date != undefined && date?.from != undefined && date.to != undefined){
        const filterResultsByDate = allEvents.filter(event => {
          const eventDate = new Date(event.date) 
  
          
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
                <th className='p-2 max-sm:p-1'>Insurance-ID</th>
                <th className='p-2 max-sm:p-1'>Asset-ID</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Asset Type</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Owner</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
              </tr>
            </thead>
           
            <tbody className='overflow-y-auto overflow-x-auto overflow-visible'>
              
              {loaderState == false  && Array.isArray(allEventsFiltered) && allEventsFiltered.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <tr className='bg-success-512 text-center relative  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                      <td className='p-2 max-sm:p-3'>{new Date(item.date).toDateString()}</td>
                      <td className='p-2 max-sm:p-1'>{item.insuranceid}</td>
                      <td className='p-2 max-sm:p-1'>{item.insurance.nftId}</td>
                      <td className='p-2 max-sm:p-1'>{item.assetType}</td>
                      <td className='p-2 max-sm:p-1'>{item.eventname} </td>
                      <td  className='p-2 max-sm:p-1'>{formatAddressUserZone(item.insurance.currentOwner)}</td>
                      <td className='p-2 max-sm:p-1'>{item.insurance.expiration && new Date(item.insurance.expiration).toDateString() || '-'}</td>
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

export default AdminTableEventsInsurance