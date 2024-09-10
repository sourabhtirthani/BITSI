'use client'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { MyWalletNftUserZone, MyWalletNftUserZoneWithInsurace } from '@/types';
// order filter sorts the data by date 
const MyWalletNftUserzone = ({address , orderFilter , priceFilter} : {address : string , orderFilter : string , priceFilter : string}) => {
    const [dataOfNft , setDataofNft] = useState<MyWalletNftUserZone[]>([]);
    const [dataOfNftWithInsurance , setDataofNftWithInsurace] = useState<MyWalletNftUserZoneWithInsurace[]>([]);
    const [loaderState , setLoaderState] = useState(true);
    useEffect(()=>{
        const getNftsOFUserData = async()=>{
            try{
                if(address){
                const res = await fetch(`/api/nfts/user/${address}`)
                const nftRes = await res.json();
                // setDataofNft(nftRes);
                const uniqueNftIds = new Set(nftRes.map((item: any) => item.id));
          const nftIdString = Array.from(uniqueNftIds).map(id => `nftId=${id}`).join(',');
          const insuranceRes = await fetch(`/api/insurance/nfts/${nftIdString}` , {method : "GET" , next : {revalidate : 0} , } ,  )
          const insuranceResponse = await insuranceRes.json();
          const insuranceMap = new Map<number, any>(insuranceResponse.map((item: { nftId: number }) => [item.nftId, item]));

          const combined = nftRes.map((event : any) => {
         
            const insurance = insuranceMap.get(event.id) || {};
            // console.log(insurance)
            return {
              ...event,
              soldValue: insurance.soldValue || '-',
              coverage: insurance.coverage || '-',
              expiration: insurance.expiration || null,
            };
          });
         
          setDataofNftWithInsurace(combined)
            }
            setLoaderState(false)
            }catch(error){
                setLoaderState(false)
            }
        }
        getNftsOFUserData();
    },[address])

    useEffect(()=>{
      const sortDataBasedOnOrderOfDate = async()=>{
        

        if(orderFilter == 'Asc Order'){
          const sortedData = [...dataOfNftWithInsurance].sort((a, b) => new Date(a.nft_mint_time).getTime() - new Date(b.nft_mint_time).getTime());
          setDataofNftWithInsurace(sortedData);
        }else if(orderFilter == 'Desc Order'){
          const sortedData = [...dataOfNftWithInsurance].sort((a, b) => new Date(b.nft_mint_time).getTime() - new Date(a.nft_mint_time).getTime());
          setDataofNftWithInsurace(sortedData);
        } else{

        }
      }
      sortDataBasedOnOrderOfDate();

    } , [orderFilter])

    useEffect(()=>{
      const sortDataBasedOnPrice = async()=>{
        if(priceFilter == 'Low to High'){
          const sortedData = [...dataOfNftWithInsurance].sort((a, b) => a.nft_price - b.nft_price);
          setDataofNftWithInsurace(sortedData);

        }else if(priceFilter == 'High to Low'){
          const sortedData = [...dataOfNftWithInsurance].sort((a, b) => b.nft_price - a.nft_price);
          setDataofNftWithInsurace(sortedData);
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
                {dataOfNftWithInsurance && dataOfNftWithInsurance.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        {/* <td className='p-2 max-sm:p-1'><Image src={item.NFT} height={50} width={50} alt='img' /></td> */}
                        <td className='p-2 py-5 max-sm:p-1'>{new Date(item.nft_mint_time).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'>BITSI</td>
                        <td className='p-2 max-sm:p-1'>{item.id}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_name}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_price}</td>
                        <td className='p-2 max-sm:p-1'>{new Date(item.expiration) > new Date() ? 'Yes' : 'No'}</td>
                        <td className='p-2 max-sm:p-1'>{item.coverage}</td>
                        <td className='p-2 max-sm:p-1'>{item.expiration && new Date(item.expiration).toDateString() || '-'}</td>
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