'use client'
import { tableMyCompensation } from '@/constants'
import { CompensationDetails } from '@/types';
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';

const MyCompensationUserProfile = ({address} : {address : string}) => {
    const [loaderState, setLoaderState] = useState(true);
    const [compensationInfo , setCompensationInfo] = useState<CompensationDetails[]>([]);
    useEffect(()=>{
        const getDetailsOfCompensation = async()=>{
            try{
                if(address){
                const res = await fetch(`/api/compensation/${address}`, { method: "GET", next: { revalidate: 0 }, },)
                const compensationDetails = await res.json();
                setCompensationInfo(compensationDetails);
                }
                setLoaderState(false);
            }catch(error){
                console.log(`error occured while fetching compensation`)
                setLoaderState(false);
            }
        }
        getDetailsOfCompensation();
    } , [address])
  return (
    <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
    <table className='w-full text-center mt-4 border-spacing-20'>
      <thead className='text-success-502 font-semibold font-montserrat text-[22px] max-sm:text-[10px]   '>
        <tr>
          <th className='p-2  max-sm:p-1'>Request&nbsp;Date</th>
          <th className='p-2 max-sm:p-1' >Asset</th>
          <th className='p-2 max-sm:p-1'>Status</th>
          <th className='p-2 max-sm:p-1'>Loss Percentage</th>
          <th className='p-2 max-sm:p-1'>Compensation Amount </th>
        </tr>
      </thead>
      <tbody className='overflow-y-auto '>
        {loaderState == false && compensationInfo.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <tr className='bg-success-512 h-12 text-center secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                <td className='p-2 py-5 max-sm:p-1'>{new Date(item.requestDate).toDateString()}</td>
                <td className='p-2 max-sm:p-1'>NFT</td>
                <td className='p-2 max-sm:p-1'>{item.Status}</td>
                <td className='p-2 max-sm:p-1'>{item.lossPercent}%</td>
                <td className='p-2 max-sm:p-1'>{item.compensationAmount}</td>
              
              </tr>
              <tr>
                <td  className='h-6'></td>
              </tr>
            </React.Fragment>
          )
        })}
      </tbody>

    </table>
    {loaderState == true && <LoaderComp />}
  </div>
  )
}

export default MyCompensationUserProfile