// 'use client'
import { getNftWithIdAction } from '@/actions/uploadNft';
import { DialogBuy } from '@/components/DialogBuy';
import { detailsTabData, events, filterOptions } from '@/constants';
import { contractAddress } from '@/lib/contract';
import { formatAddressUserZone } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

// recheck for server client

const NFTId = async ({ params , searchParams }: { params: { nftId: string} , searchParams : { [key: string]: string | string[] | undefined }; } ) => {
  // const [arrowDetailsTab, setArrowDetialsTab] = useState(true);
  // const hadnleDetailsArrowClick = ()=>{
  //   setArrowDetialsTab(!arrowDetailsTab);
  // }
  const getNftRecord = await getNftWithIdAction(params.nftId);
  const idsArry : string[] = [params.nftId]
  let arrowDetailsTab =  true;

  return (
    <>
      <div className='navbar-space'></div>

      <section className='bg-success-503'>
        <div className=' p-8 max-md:p-4'>
          <div className='bg-success-512 flex max-md:flex-col  secondary-shadow11'>
          <div className='md:w-1/2 p-8 max-lg:p-4 max-md:p-2 '>
            <Image src={getNftRecord.record?.nft_image || ''} height={546} width={604} alt='NFT IMAGE' className='md:h-[546px]' />
          </div>
          <div className='md:w-1/2  flex flex-col p-8 max-md:p-2 max-lg:p-4 '>
            <div className='flex flex-col gap-3'>
              <h4 className='font-manrope font-semibold lg:text-[32px] max-md:text-[14px] md:text-[22px] text-success-513 '>{getNftRecord.record?.nft_name}</h4>
              <p className='text-white text-opacity-70 text-[22px] font-manrope font-semibold'>Collection - {getNftRecord.record?.nft_collection_name}</p>
              {/* <Image src='/icons/shrae-icon.svg' height={32} width={31.72} alt='Share' /> */}
            <p className='text-success-516 text-[22px]  max-md:text-[16px] font-montserrat font-semibold md:mt-8 max-md:mt-2'>{getNftRecord.record?.nft_description}</p>
            <div className=' rounded-full mt-5 w-full max-w-[300px] max-sm:max-w-[250px] secondary-shadow11 items-center px-4  bg-gray-500 bg-opacity-45 flex  py-2 justify-between'>
        <div className='flex flex-col items-center'>
          <p className='font-manrope text-white text-[20px] max-sm:text-[18px] '>{getNftRecord.record?.nft_price} ETH</p>
          <p className='text-white text-opacity-50 text-[14px] font-manrope max-sm:text-[13px]'>Floor Price</p>
        </div>
        <div className='bg-success-511 rounded-full p-2'>
        <Image src = '/icons/price-buy-col.svg' height={50} width={50} alt='icon'  /></div>
      </div>
      <DialogBuy collectionName={getNftRecord.record?.nft_collection_name} imgSrc={getNftRecord.record?.nft_image} nameOfNft={getNftRecord.record?.nft_name} nftPrice={getNftRecord.record?.nft_price} royalty={getNftRecord.record?.nft_royalties} buttonName='Buy' lstOfItems={idsArry} nameOfClass='w-full bg-nft-text-gradient rounded-xl text-white font-monserrat text-[22px]  mt-3 px-4 py-2' currencyText='Matic' showSelectedItem = {true} totalItems={0} />
            </div>
            {/* <div className='flex justify-between md:mt-8 max-md:mt-4'>
              <div className='flex flex-col gap-4 max-md:gap-2'>
                <p className='text-white font-montserrat font-semibold text-[22px] max-md:text-[14px]'>Owned By</p>
                <div className='flex gap-2'>
                  <Image src='/icons/profile-icon.svg' height={25} width={25} alt='profile' />
                  <p className='text-success-516 text-opacity-40  font-manrope text-[22px] max-md:text-[14px]'>User Name</p>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-white font-montserrat font-semibold text-[22px] max-md:text-[14px]'>Created By</p>
                <div className='flex gap-2'>
                  <Image src='/icons/profile-icon.svg' height={25} width={25} alt='profile' />
                  <p className='text-success-516 text-opacity-40  font-manrope text-[22px] max-md:text-[14px]'>User Name</p>
                </div>
              </div>
            </div> */}
            {/* <div className='mt-8 max-md:mt-3'>
              <p className='text-success-516 text-opacity-50  font-manrope text-[22px] max-md:text-[14px] font-semibold'>Current Price</p>
              <p className='text-white font-montserrat text-[22px] max-md:text-[14px] font-bold'>{getNftRecord.record?.nft_price} BITSI</p>
              <DialogBuy currencyText='BITSI' showSelectedItem = {true} totalItems={1} buttonName='Buy' nameOfClass='bg-success-513 py-2.5 mt-4 text-white text-[22px] px-20 rounded-xl hover:bg-success-509' />
            </div> */}
          </div>
        </div>
          </div>
      </section>

      <section className='bg-success-503 p-8 max-md:p-2 md:gap-4 '>
        {/* <p className='text-success-513 font-semibold font-manrope text-[28px] max-md:text-[20px] mb-8 max-md:mb-4'>Properties</p>
        <div className='flex gap-4 max-md:grid max-md:grid-cols-2 md:mb-6 max-md:mb-3'>
          <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
            <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]' >Royalities</p>
            <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>{getNftRecord.record?.nft_royalties}%</p>
          </div>
          <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
            <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]'>Collection Name</p>
            <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>{getNftRecord.record?.nft_collection_name}</p>
          </div>
        </div>

        <div className='mt-16 max-md:mt-8 flex flex-col gap-3'>
          <div className='flex justify-between bg-success-512  secondary-shadow11 p-4 max-md:p-2 hover:bg-success-509'>
            <div className='flex gap-1 items-center'>
              <Image src='/icons/arrow-up-down.svg' height={28} width={28} alt='arrow-up-down' />
              <p className='text-success-513 font-semibold font-manrope text-[22px] max-md:text-[14px]'>Item Activity</p>
            </div>
            <Image src='/icons/arrow-up-yellow.svg' height={24} width={24} alt='arrow' />
          </div>

          <div className='flex justify-between bg-success-512  secondary-shadow11 p-4 max-md:p-2 hover:bg-success-509'>
            <p className='text-success-502 text-opacity-50 font-semibold font-manrope text-[22px] max-md:text-[14px]'>Filter</p>
            <Image src='/icons/arrow-down1.svg' height={24} width={24} alt='arrow' />
          </div>
        </div>
        <div className='flex justify-between'>
          <div className='flex gap-5 items-center mt-3 p-2 flex-wrap '>
            {filterOptions.map((item, index) => {
              return (
                <div key={index} className='flex w-fit items-center bg-success-512 px-2 gap-1  secondary-shadow11 '>
                  <p className='font-montserrat text-white text-[22px] max-md:text-[14px]'>{item}</p>
                  <Image src='/icons/entypo_cross.svg' height={20} width={20} alt='Remove Filter' className='hover:bg-success-509' />
                </div>
              )
            })}
          </div>
          <div className='w-fit h-fit'>
            <button className='mt-3 p-2 text-red-500 hover:bg-success-512 rounded-xl '>Clear&nbsp;all</button>
          </div>
        </div>

        <div>
          <table className='w-full text-left mt-4 '>
            <thead className='text-success-502 text-opacity-50 font-semibold font-manrope text-[22px] max-md:text-[14px] bg-success-512  secondary-shadow11  '>
              <tr>
                <th className='p-4 max-md:p-2'>Event</th>
                <th className='p-4 max-md:p-2' >Price</th>
                <th className='p-4 max-md:p-2'>From</th>
                <th className='p-4 max-md:p-2 overflow-hidden'>To</th>
                <th className='p-4 max-md:p-2 overflow-hidden'>Date</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
           
                <tr key={index} >
                  <td className='text-success-511 text-[22px] font-semibold  max-md:text-[14px]  p-4 max-md:p-2' > {event.event}</td>
                  <td className='text-white text-[18px] max-md:text-[12px] font-light  p-4 max-md:p-2'>{event.price}</td>
                  <td className='text-white text-[18px] max-md:text-[12px] font-light  p-4 max-md:p-2'>{event.from}</td>
                  <td className='text-white text-[18px] max-md:text-[12px] font-light  p-4 max-md:p-2'>{event.to}</td>
                  <td className='text-white text-[18px] max-md:text-[12px] font-light   gap-1 p-4 max-md:p-2'>{event.date}</td>
                  
                </tr>
           
              ))}
            </tbody>
          </table>
        </div> */}

        <div className={`flex justify-between bg-success-512  secondary-shadow11 p-4 max-md:p-2  mt-6 max-md:mt-3 ${!arrowDetailsTab && 'mb-24 max-md:mb-14'}`}>
            <div className='flex gap-1 items-center'>
              <Image src='/icons/details-card-icon.png' height={28} width={28} alt='arrow-up-down' />
              <p className='text-success-513 font-semibold font-manrope text-[22px] max-md:text-[14px]'>Details</p>
            </div>
        <button ><Image src='/icons/arrow-up-yellow.svg' height={24} width={24} alt='arrow' className={` transform ${arrowDetailsTab ? 'rotate-180' : ''}`} /> </button>
           {/* this page might turn into server component later onClick={hadnleDetailsArrowClick} */}
          </div>

          {arrowDetailsTab && (<div className='flex flex-col justify-between p-4 mt-6 max-md:mt-3 gap-7 max-md:gap-4 mb-24 max-md:mb-14 '>
              <div className='flex justify-between'>
              <p className='text-white text-[22px] font-semibold  max-md:text-[14px] '>Contract Address</p>
              <p className='text-success-517 text-[22px] font-semibold  max-md:text-[14px]'>{formatAddressUserZone(contractAddress)}</p>
              </div>
              <div className='flex justify-between '>
              <p className='text-white text-[22px] font-semibold  max-md:text-[14px] '>Token Id</p>
              <p className='text-success-517 text-[22px] font-semibold  max-md:text-[14px]'>{getNftRecord.record?.id}</p>
              </div>
              {Object.entries(detailsTabData).map(([key, value], index)=>{
                return (
                  <div key={index} className='flex justify-between'>
                     <p className='text-white text-[22px] font-semibold  max-md:text-[14px] '>{key}</p>
                     <p className='text-white text-[22px] font-semibold  max-md:text-[14px]'>{value}</p>
                  </div>
                )
              })}
          </div>)}
          


      </section>

    </>


  )
}

export default NFTId;