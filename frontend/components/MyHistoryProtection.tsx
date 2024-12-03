'use client'
import { tableInsurance } from '@/constants'
import { Fragment, useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { toast } from './ui/use-toast';
import { CoinEventsUserZoneHistory, UserZoneHistoryInsuranceEvent } from '@/types';

const MyHistoryProtection = ({ address, orderFilter, assetFilter }: { address: string, orderFilter: string, assetFilter: string }) => {
  const [loaderState, setLoaderState] = useState(true);
  const [loaderStateCoin, setLoaderStateCoin] = useState(true);

  const [insuranceEventsData, setInsuranceEventsData] = useState<UserZoneHistoryInsuranceEvent[]>([]);
  const [filteredInsuraceEvents, setFilteredInsuranceEvents] = useState<UserZoneHistoryInsuranceEvent[]>([]);
  const [insuranceEventsDataCoin, setInsuranceEventsDataCoin] = useState<CoinEventsUserZoneHistory[]>([]);
  const [filteredInsuraceEventsCoin, setFilteredInsuranceEventsCoin] = useState<CoinEventsUserZoneHistory[]>([]);

  useEffect(() => {
    const getHistoryDataInsuranceEvents = async () => {
      try {
        setLoaderState(true)
        const res = await fetch(`/api/userzone/history/insurance/nft/${address}`, { method: "GET", next: { revalidate: 0 }, },)
        const resInJson = await res.json();
        console.log(`the response in json is `)
        console.log(resInJson)
        setInsuranceEventsData(resInJson);
        setFilteredInsuranceEvents(resInJson);
      } catch (error) {
        console.log(error);
        toast({ title: "Error Fetching Data for nft", description: 'Please try again later', duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, })
      } finally {
        setLoaderState(false);
      }
    }
    getHistoryDataInsuranceEvents();
  }, [address])

  useEffect(() => {
    const getHistoryOfDataOfInsuranceEvents = async () => {
      try {
        setLoaderStateCoin(true);
        const res = await fetch(`/api/userzone/history/insurance/coin/${address}`, { method: "GET", next: { revalidate: 0 }, },)
        const resInJson = await res.json();
        console.log(`the response for coin in json is`)
        console.log(resInJson)
        setInsuranceEventsDataCoin(resInJson);
        setFilteredInsuranceEventsCoin(resInJson);
      } catch (error) {
        console.log(error);
        toast({ title: "Error Fetching Data for coin", description: 'Please try again later', duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, })
      } finally {
        setLoaderStateCoin(false)
      }
    }
    getHistoryOfDataOfInsuranceEvents();
  } , [address])

  useEffect(() => {
    const sortDataBasedOnOrderOfDate = async () => {


      if (orderFilter == 'Asc Order') {
        const sortedData = [...insuranceEventsData].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setFilteredInsuranceEvents(sortedData);
      } else if (orderFilter == 'Desc Order') {
        const sortedData = [...insuranceEventsData].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setFilteredInsuranceEvents(sortedData);
      } else {

      }
    }
    sortDataBasedOnOrderOfDate();

  }, [orderFilter])

  return (
    <div>
      <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
        <p className='text-success-511 text-[1.2rem] text-start px-4 font-semibold'>Nfts</p>
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
                    <td className='h-5'></td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>

        </table>
        {filteredInsuraceEvents.length == 0 && loaderState == false && (
          <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
        )}
        {loaderState == true && <LoaderComp />}

      </div>


      <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
        <p className='text-success-511 text-[1.2rem] text-start px-4 font-semibold'>Coins</p>
        <table className='w-full text-left mt-4 border-spacing-20'>
          <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
            <tr>
              <th className='p-2 max-sm:p-1'>Date</th>
              <th className='p-2 max-sm:p-1' >Asset</th>
             
              <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
              {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
            </tr>
          </thead>
          <tbody className='overflow-y-auto '>
            {loaderStateCoin == false && Array.isArray(filteredInsuraceEventsCoin) && filteredInsuraceEventsCoin.map((item, index) => {
              return (
                <Fragment key={index}>
                  <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                    <td className='p-6 max-sm:p-3'>{new Date(item.timestamp).toDateString()}</td>
                    <td className='p-2 max-sm:p-1'>Coin</td>
                    <td className='p-2 max-sm:p-1'>{item.eventName}</td>
                    <td className='p-2 max-sm:p-1'>{item.insurance.coverage}  </td>
                    <td className='p-2 max-sm:p-1'>{new Date(item.insurance.expiration).toDateString()} </td>
                  </tr>
                  <tr>
                    <td className='h-5'></td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>

        </table>
        {filteredInsuraceEventsCoin.length == 0 && loaderStateCoin == false && (
          <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
        )}
        {loaderStateCoin == true && <LoaderComp />}

      </div>
    </div>
  )
}

export default MyHistoryProtection