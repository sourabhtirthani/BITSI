'use client'
import { tableInsurance } from '@/constants'
import {Fragment, useEffect, useState} from 'react'
import LoaderComp from './LoaderComp';
import { toast } from './ui/use-toast';
import { UserZoneHistoryInsuranceEvent } from '@/types';

const MyHistoryProtection = ({address , orderFilter , assetFilter} : {address : string , orderFilter : string , assetFilter : string}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [insuranceEventsData , setInsuranceEventsData] = useState<UserZoneHistoryInsuranceEvent[]>([]);
    const [filteredInsuraceEvents , setFilteredInsuranceEvents] = useState<UserZoneHistoryInsuranceEvent[]>([]);

    useEffect(()=>{
        const getHistoryDataInsuranceEvents = async()=>{
            try{
                const res = await fetch(`/api/userzone/history/insurance/${address}` , {method : "GET" , next : {revalidate : 0} , } ,  )
                const resInJson = await res.json();
                setInsuranceEventsData(resInJson);
                setFilteredInsuranceEvents(resInJson);
            }catch(error){
                console.log(error);
                toast({ title: "Error Fetching Data", description: 'Please try again later', duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',  }, })
            }finally{
                setLoaderState(false);
            }
        }
        getHistoryDataInsuranceEvents();
    }, [address])
    useEffect(()=>{
        const sortDataBasedOnOrderOfDate = async()=>{
          
    
          if(orderFilter == 'Asc Order'){
            const sortedData = [...insuranceEventsData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            setFilteredInsuranceEvents(sortedData);
          }else if(orderFilter == 'Desc Order'){
            const sortedData = [...insuranceEventsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
            setFilteredInsuranceEvents(sortedData);
          } else{
    
          }
        }
        sortDataBasedOnOrderOfDate();
    
      } , [orderFilter])

  return (

    <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1' >Asset</th>
                  <th className='p-2 max-sm:p-1' >Asset-ID</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
                  {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {loaderState == false && Array.isArray(filteredInsuraceEvents) && filteredInsuraceEvents.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-6 max-sm:p-3'>{new Date(item.date).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'>{item.assetType}</td>
                        <td className='p-2 max-sm:p-1'>{item.insurance.nftId}</td>
                        <td className='p-2 max-sm:p-1'>{item.eventname}</td>
                        <td className='p-2 max-sm:p-1'>{item.insurance.coverage}  </td>
                        <td className='p-2 max-sm:p-1'>{new Date(item.insurance.expiration).toDateString()} </td>
                        {/* <td className='p-2 max-sm:p-1'>{item.Compensation}</td> */}
                       
                        {/* <DropdownMyProfile setValue={setHistoryDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems}/> */}
                      </tr>
                      <tr>
                        <td  className='h-5'></td>
                      </tr>
                    </Fragment>
                  )
                })}
              </tbody>

            </table>
            {loaderState == true && <LoaderComp />}
          </div>
  )
}

export default MyHistoryProtection