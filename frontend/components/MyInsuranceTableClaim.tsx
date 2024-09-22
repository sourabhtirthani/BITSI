'use client'
import { tableMyInsurance } from '@/constants'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { useAccount } from 'wagmi'
import { MyWalletNftUserZoneWithInsurace,  NftEventsResponseClaimUserZone, } from '@/types';
import { generateCompensation } from '@/actions/uploadNft';
import { useToast } from "@/components/ui/use-toast"
import { DialogUserZoneProtection } from './DialogUserZoneProtection';
// the whole logic must be changed later not the most optimal partial is chnaged
const MyInsuranceTableClaim = () => {
  const { toast } = useToast()
  const { address } = useAccount();
  const [loaderForButton, setLoaderForButton] = useState(false);
  const [loaderState, setLoaderState] = useState(true);
  const [eventDetailsInsurance ,setEventDetailsInsurance] = useState<NftEventsResponseClaimUserZone[]>([]);
  const [refresh , setRefresh] =useState(false);
  useEffect(() => {
  const getEventDetailsData = async () => {
    try {
      if (address) {
        const claimDetails = await fetch(`/api/userzone/insurance/claim/${address}`, { method: "GET", next: { revalidate: 0 }, },)
        const claimDetailsJson = await claimDetails.json();
        setEventDetailsInsurance(claimDetailsJson);
      }
      setLoaderState(false)
    } catch (error) {
      console.log('error fetching data from the backend')
      console.log(error)
      setLoaderState(false)
    }
  }
  
    getEventDetailsData()
  }, [address , refresh])

  // const handleRequestClick = async (address: string, nftId: number, eventId: number , soldValue : number) => {
  //   setLoaderForButton(true);
  //   try {
  //     const formData = new FormData();
  //     formData.append('address', address); formData.append('nftId', nftId.toString()); formData.append('eventId', eventId.toString());
  //     formData.append('soldValue' , soldValue.toString())   // this reflects the price of nft 
  //     const res = await generateCompensation(formData);
  //     if('error' in res){
  //       toast({title: "ERROR",})
  //       }
  //       else{
  //     toast({title: "Operation Success",});
  //   }
  //     setLoaderForButton(false);
  //   } catch (error) {
  //     toast({title: "ERROR",})
  //     setLoaderForButton(false);
  //   }
  // }
  return (
    <div className='max-h-[700px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
      <table className='w-full text-left mt-4 border-spacing-20'>
        <thead className='text-success-502  text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline mb-10 '>
          <tr>
            <th className='p-2 max-sm:p-1'>Date</th>
            <th className='p-2 max-sm:p-1' >MarketPlace</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>ID</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Sold Price</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
            <th className='p-2 max-sm:p-1 overflow-hidden '>Expiration</th>
            <th className='p-2 max-sm:p-1 overflow-hidden '>Loss Amount</th>
            <th>Claim</th>
            {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
          </tr>
        </thead>
        <tbody className='overflow-y-auto '>
          {/* <p className='font-montserrat text-white mb-8 mt-8 font-bold text-[12px]'>Uninsured NFTs <span>({tableMyInsurance.length})</span></p> */}
          {loaderState == false && eventDetailsInsurance &&  Array.isArray(eventDetailsInsurance) && eventDetailsInsurance.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <tr className='bg-success-512  text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                  <td className='p-2 py-6 max-sm:p-1'>{new Date(item.time).toDateString()}</td>
                  <td className='p-2 max-sm:p-1'>BITSI</td>
                  <td className='p-2 max-sm:p-1'>{item.nftId}</td>
                  <td className='p-2 max-sm:p-1'>{item.nft_event}</td>
                  <td className='p-2 max-sm:p-1'>{item.nft_price}  </td>
                  <td className='p-2 max-sm:p-1'>{new Date(item.nft.insurance.expiration) > new Date() ? 'Yes' : 'No'}</td>
                  <td className='p-2 max-sm:p-1'>{item.nft.insurance.coverage}</td>
                  <td className='p-2 max-sm:p-1'>{item.nft.insurance.expiration && new Date(item.nft.insurance.expiration).toDateString() || '-'}</td>
                  <td className='p-2 max-sm:p-1'>{item.loss_amount ? item.loss_amount : '-'}  </td>
                  {/* <td><button disabled = {loaderForButton} onClick={() => { handleRequestClick(item.to, item.nftId, item.id , item.nft_price) }} className={`${loaderForButton == true ? 'disabled bg-slate-400 ' : 'bg-success-511 '}text-white    p-2 text-center  rounded-xl font-bold `}>{loaderForButton ? <div className="spinner "></div> : <p>Request&nbsp;Claim</p>}</button></td> */}
                  <td className='p-2 max-sm:p-1'><DialogUserZoneProtection buttonText='Request Claim' action='claim' setRefresh={setRefresh} assetId={item.nftId} assetName={item.nft.nft_name} insuranceId={item.nft.insurance.id} lossAmount={item.loss_amount} soldValue={item.nft_price} eventId={item.id} /></td>
                </tr>
                <tr>
                  <td className='h-5'></td>
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

export default MyInsuranceTableClaim