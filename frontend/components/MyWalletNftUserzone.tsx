'use client'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { MyWalletNftUserZone } from '@/types';

const MyWalletNftUserzone = ({address} : {address : string}) => {
    const [dataOfNft , setDataofNft] = useState<MyWalletNftUserZone[]>([]);
    const [loaderState , setLoaderState] = useState(true);
    useEffect(()=>{
        const getNftsOFUserData = async()=>{
            try{
                if(address){
                const res = await fetch(`/api/nfts/user/${address}`)
                const nftRes = await res.json();
                setDataofNft(nftRes);
            }
            setLoaderState(false)
            }catch(error){
                setLoaderState(false)
            }
        }
        getNftsOFUserData();
    },[address])
  return (
    <div className='max-h-[500px] px-8 max-md:px-4 overflow-y-auto mb-20 table-body'>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[16px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1' >Marketplace</th>
                  <th className='p-2 max-sm:p-1'>NFT&nbsp;ID</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>NFT&nbsp;Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Insurance</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Insurance&nbsp;Coverage</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Insurance&nbsp;Expiry</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {dataOfNft.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        {/* <td className='p-2 max-sm:p-1'><Image src={item.NFT} height={50} width={50} alt='img' /></td> */}
                        <td className='p-2 py-5 max-sm:p-1'>{new Date(item.nft_mint_time).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'>BITSI</td>
                        <td className='p-2 max-sm:p-1'>{item.id}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_price}</td>
                        <td className='p-2 max-sm:p-1'>{item.is_insured == false ? '-' : 'YES'}</td>
                        <td className='p-2 max-sm:p-1'>-</td>
                        <td className='p-2 max-sm:p-1'>-</td>
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