'use client'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { NftDataWithInsurace } from '@/types';
// order filter sorts the data by date 
const MyWalletNftUserzone = ({address , orderFilter , priceFilter} : {address : string , orderFilter : string , priceFilter : string}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [dataOfNftUserZone , setDataOfNftUserZone] = useState<NftDataWithInsurace[]>([])

    useEffect(()=>{
      const getDataOfNftOnLoad = async()=>{
        try{
          if(address){
            const responseFromServer = await  fetch(`/api/userzone/nfts/user/${address}`, { method: "GET", next: { revalidate: 0 }})
            const resInJson = await responseFromServer.json();
            setDataOfNftUserZone(resInJson);

          }
          setLoaderState(false)
        }catch(error){
          setLoaderState(false)
        }
      }
      getDataOfNftOnLoad();
    }, [address])

    useEffect(()=>{
      const sortDataBasedOnOrderOfDate = async()=>{
        

        if(orderFilter == 'Asc Order'){
          const sortedData = [...dataOfNftUserZone].sort((a, b) => new Date(a.nft_mint_time).getTime() - new Date(b.nft_mint_time).getTime());
          setDataOfNftUserZone(sortedData);
        }else if(orderFilter == 'Desc Order'){
          const sortedData = [...dataOfNftUserZone].sort((a, b) => new Date(b.nft_mint_time).getTime() - new Date(a.nft_mint_time).getTime());
          setDataOfNftUserZone(sortedData);
        } else{

        }
      }
      sortDataBasedOnOrderOfDate();

    } , [orderFilter])

    useEffect(()=>{
      const sortDataBasedOnPrice = async()=>{
        if(priceFilter == 'Low to High'){
          const sortedData = [...dataOfNftUserZone].sort((a, b) => a.nft_price - b.nft_price);
          setDataOfNftUserZone(sortedData);

        }else if(priceFilter == 'High to Low'){
          const sortedData = [...dataOfNftUserZone].sort((a, b) => b.nft_price - a.nft_price);
          setDataOfNftUserZone(sortedData);
        }else{

        }
      }
      sortDataBasedOnPrice();
    } , [priceFilter])
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
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {dataOfNftUserZone && Array.isArray(dataOfNftUserZone) && dataOfNftUserZone.map((item, index) => {
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
            {loaderState == true &&<LoaderComp /> }
          </div>
  )
}

export default MyWalletNftUserzone