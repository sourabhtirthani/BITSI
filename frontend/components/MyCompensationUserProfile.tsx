'use client'
import { tableMyCompensation } from '@/constants'
import { CompensationDetails } from '@/types';
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { compensateClaimed } from '@/actions/uploadNft';
import { useToast } from "@/components/ui/use-toast"


const MyCompensationUserProfile = ({address} : {address : string}) => {
    const [loaderState, setLoaderState] = useState(true);
    const [loaderForButton, setLoaderForButton] = useState(false);
    const [compensationInfo , setCompensationInfo] = useState<CompensationDetails[]>([]);
    const [refresh, setRefresh] = useState(false);
    const { toast } = useToast()
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
    } , [address, refresh])


    const handleCompensateClick = async(id : number)=>{
      try{
        setLoaderForButton(true);

        const claimUser = await compensateClaimed(id);
        toast({ title: "Operation Success", description: "Successfully claimed compensation", duration: 2000,
          style: {backgroundColor: '#4CAF50',color: 'white',fontFamily: 'Manrope', },});
        setRefresh(prev => !prev);

      }catch(error){
        console.log(error);
        console.log('in the error clause of handle comepnsate click')
        toast({ title: "ERROR", description: "SOMETHING WENT WRONG.", duration: 2000,
          style: {  backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, })
      }finally{
        setLoaderForButton(false);
      }
    }
  return (
    <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
    <table className='w-full text-center mt-4 border-spacing-20'>
      <thead className='text-success-502 font-semibold font-montserrat text-[22px] max-sm:text-[10px]   '>
        <tr>
          <th className='p-2  max-sm:p-1'>Request&nbsp;Date</th>
          <th className='p-2 max-sm:p-1' >AssetId</th>
          <th className='p-2 max-sm:p-1'>Status</th>
          <th className='p-2 max-sm:p-1'>Loss Percentage</th>
          <th className='p-2 max-sm:p-1'>Compensation Amount </th>
          <th className='p-2 max-sm:p-1'>Claim</th>
        </tr>
      </thead>
      <tbody className='overflow-y-auto '>
        {loaderState == false && compensationInfo.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <tr className='bg-success-512 h-12 text-center secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                <td className='p-2 py-5 max-sm:p-1'>{new Date(item.requestDate).toDateString()}</td>
                <td className='p-2 max-sm:p-1'>{item.assetId}</td>
                <td className='p-2 max-sm:p-1'>{item.Status}</td>
                <td className='p-2 max-sm:p-1'>{item.lossPercent}%</td>
                <td className='p-2 max-sm:p-1'>{item.compensationAmount}</td>
                <td  ><button disabled = {loaderForButton} onClick={()=>{handleCompensateClick(item.id)}}  className={`${loaderForButton == true ? 'disabled bg-slate-400 ' : 'bg-success-511 '} ${item.Status != 'Confirmed' ? 'hidden' : ''}   text-white     p-2 text-center  rounded-xl font-bold `}>{loaderForButton ? <div className="spinner "></div> : <p>Claim</p>}</button></td>
              
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