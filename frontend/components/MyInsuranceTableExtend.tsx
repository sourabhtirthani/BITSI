'use client'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { NftDataWithInsurace } from '@/types';
import { DialogUserZoneProtection } from './DialogUserZoneProtection';
// order filter sorts the data by date 
const MyInsuranceTableExtend = ({address} : {address : string}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [dataOfNftUserZoneExtend , setDataOfNftUserZoneExtend] = useState<NftDataWithInsurace[]>([])
    const [refresh , setRefresh] =useState(false);
    useEffect(()=>{
      const getDataOfNftOnLoad = async()=>{
        try{
          if(address){
            const responseFromServer = await  fetch(`/api/userzone/insurance/extend/${address}`, { method: "GET", next: { revalidate: 0 }})
            const resInJson = await responseFromServer.json();
            setDataOfNftUserZoneExtend(resInJson);
          }
          setLoaderState(false)
        }catch(error){
          setLoaderState(false)
        }
      }
      getDataOfNftOnLoad();
    }, [address , refresh])

  return (
    <div className='max-h-[500px] px-8 max-md:px-4 overflow-y-auto mb-20 table-body'>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[16px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1' >Marketplace</th>
                  <th className='p-2 max-sm:p-1'>NFT&nbsp;ID</th>
                  <th className='p-2 max-sm:p-1'>NFT&nbsp;Name</th>

                  <th className='p-2 max-sm:p-1 overflow-hidden'>NFT&nbsp;Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Extend</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {dataOfNftUserZoneExtend && Array.isArray(dataOfNftUserZoneExtend) && dataOfNftUserZoneExtend.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        {/* <td className='p-2 max-sm:p-1'><Image src={item.NFT} height={50} width={50} alt='img' /></td> */}
                        <td className='p-2 py-5 max-sm:p-1'>{new Date(item.nft_mint_time).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'>BITSI</td>
                        <td className='p-2 max-sm:p-1'>{item.id}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_name}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_price}</td>
                        <td className='p-2 max-sm:p-1'>{new Date(item.insurance?.expiration ?? 0) > new Date() ? 'Yes' : 'No'}</td>
                        <td className='p-2 max-sm:p-1'>{item.insurance?.coverage}</td>
                        <td className='p-2 max-sm:p-1'>{item.insurance?.expiration && new Date(item.insurance.expiration).toDateString() || '-'}</td>
                        <td className='p-2 max-sm:p-1'><DialogUserZoneProtection action='extend' setRefresh={setRefresh} assetId={item.id} assetName={item.nft_name} /></td>
                        {/* <td>
                        <DropdownMyProfile setValue={setNftDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems} itemsInsideTable={['Convert to BITSI Coin' , 'Claim Compensation']}/></td> */}
                      </tr>
                      <tr>
                        <td  className='h-5'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
                {dataOfNftUserZoneExtend.length == 0 && loaderState == false && (
                    <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
                )}
            {loaderState == true &&<LoaderComp /> }
          </div>
  )
}

export default MyInsuranceTableExtend