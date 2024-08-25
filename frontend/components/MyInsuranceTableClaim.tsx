'use client'
import { tableMyInsurance } from '@/constants'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { useAccount } from 'wagmi'
import { MyWalletNftUserZoneWithInsurace, NftEventGetInsurace } from '@/types';
import { generateCompensation } from '@/actions/uploadNft';
import { useToast } from "@/components/ui/use-toast"

const MyInsuranceTableClaim = () => {
  const { toast } = useToast()
  const { address } = useAccount();
  const [loaderForButton, setLoaderForButton] = useState(false);
  const [loaderState, setLoaderState] = useState(true);

  const [eventDetailsInsurace, setEventDetailsInsurace] = useState<NftEventGetInsurace[]>([]);
  useEffect(() => {
  const getEventDetailsData = async () => {
    try {
      if (address) {
        const res = await fetch(`/api/insurance/nfts/claim/${address}`, { method: "GET", next: { revalidate: 0 }, },)
        const respos = await res.json();
        // setEventDetails(respos);
        console.log('the response is ');
        console.log(respos)
        const uniqueNftIds = new Set(respos.map((item: any) => item.nftId));
        const nftIdString = Array.from(uniqueNftIds).map(nftId => `nftId=${nftId}`).join(',');
        const insuranceRes = await fetch(`/api/insurance/nfts/${nftIdString}`, { method: "GET", next: { revalidate: 0 }, },)
        const insuranceResponse = await insuranceRes.json();
        const insuranceMap = new Map<number, any>(insuranceResponse.map((item: { nftId: number }) => [item.nftId, item]));

        const combined = respos.map((event: any) => {

          const insurance = insuranceMap.get(event.nftId) || {};
          console.log(insurance)
          return {
            ...event,
            soldValue: insurance.soldValue || '-',
            coverage: insurance.coverage || '-',
            expiration: insurance.expiration || null,
          };
        });

        setEventDetailsInsurace(combined)

      }
      setLoaderState(false)
    } catch (error) {
      console.log('error fetching data from the backend')
      console.log(error)
      setLoaderState(false)
    }
  }
  
    getEventDetailsData()
  }, [address])

  const handleRequestClick = async (address: string, nftId: number, eventId: number , soldValue : number) => {
    setLoaderForButton(true);
    try {
      const formData = new FormData();
      formData.append('address', address);
      formData.append('nftId', nftId.toString());
      formData.append('eventId', eventId.toString());
      formData.append('soldValue' , soldValue.toString())   // this reflects the price of nft 
      const res = await generateCompensation(formData);
      if('error' in res){
        toast({
          title: "Error occured", description: res.error, duration: 2000,
          style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
          
        }
        else{
      toast({
        title: "Operation Success",
        description: "Please wait for us to view your request.",
        duration: 2000,
        style: {
          backgroundColor: '#4CAF50',
          color: 'white',
          fontFamily: 'Manrope',
        },
      });
    }
      setLoaderForButton(false);
    } catch (error) {
      toast({
        title: "ERROR",
        description: "SOMETHING WENT WRONG.",
        duration: 2000,
        style: {
          backgroundColor: '#900808',
          color: 'white',
          fontFamily: 'Manrope',
        },
      })
      setLoaderForButton(false);
    }
  }
  return (
    <div className='max-h-[700px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
      <table className='w-full text-left mt-4 border-spacing-20'>
        <thead className='text-success-502  text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline mb-10 '>
          <tr>
            <th className='p-2 max-sm:p-1'>Date</th>
            <th className='p-2 max-sm:p-1' >MarketPlace</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>ID</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
            <th className='p-2 max-sm:p-1 overflow-hidden '>Expiration</th>
            <th>Claim</th>
            {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
          </tr>
        </thead>
        <tbody className='overflow-y-auto '>
          {/* <p className='font-montserrat text-white mb-8 mt-8 font-bold text-[12px]'>Uninsured NFTs <span>({tableMyInsurance.length})</span></p> */}
          {loaderState == false && eventDetailsInsurace && eventDetailsInsurace.length > 0 && Array.isArray(eventDetailsInsurace) && eventDetailsInsurace.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <tr className='bg-success-512  text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                  <td className='p-2 py-6 max-sm:p-1'>{new Date(item.time).toDateString()}</td>
                  <td className='p-2 max-sm:p-1'>BITSI</td>
                  <td className='p-2 max-sm:p-1'>{item.nftId}</td>
                  <td className='p-2 max-sm:p-1'>{item.nft_event}</td>
                  <td className='p-2 max-sm:p-1'>{item.nft_price}  </td>
                  <td className='p-2 max-sm:p-1'>{new Date(item.expiration) > new Date() ? 'Yes' : 'No'}</td>
                  <td className='p-2 max-sm:p-1'>{item.coverage}</td>
                  <td className='p-2 max-sm:p-1'>{item.expiration && new Date(item.expiration).toDateString() || '-'}</td>
                  <td><button disabled = {loaderForButton} onClick={() => { handleRequestClick(item.to, item.nftId, item.id , item.nft_price) }} className={`${loaderForButton == true ? 'disabled bg-slate-400 ' : 'bg-success-511 '}text-white    p-2 text-center  rounded-xl font-bold `}>{loaderForButton ? <div className="spinner "></div> : <p>Request&nbsp;Claim</p>}</button></td>
                  {/* <td className='p-2 max-sm:p-1'>{item.Compensation}</td> */}

                  {/* <DropdownMyProfile setValue={setHistoryDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems}/> */}
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