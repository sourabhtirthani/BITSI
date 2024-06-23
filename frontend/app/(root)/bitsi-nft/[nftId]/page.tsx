// 'use client'
import { DialogBuy } from '@/components/DialogBuy';
import { detailsTabData, events, filterOptions } from '@/constants';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'

// recheck for server client

const NFTId = ({ params , searchParams }: { params: { nftId: string} , searchParams : { [key: string]: string | string[] | undefined }; } ) => {
  // const [arrowDetailsTab, setArrowDetialsTab] = useState(true);
  // const hadnleDetailsArrowClick = ()=>{
  //   setArrowDetialsTab(!arrowDetailsTab);
  // }
  let arrowDetailsTab =  true;

  return (
    <>
      <div className='navbar-space'></div>

      <section className='bg-success-503'>
        <div className='flex max-md:flex-col '>
          <div className='md:w-1/2 p-8 max-lg:p-4 max-md:p-2 '>
            <Image src='/icons/nft-desc.png' height={546} width={604} alt='NFT IMAGE' />
          </div>
          <div className='md:w-1/2  flex flex-col p-8 max-md:p-2 max-lg:p-4 '>
            <div className='flex justify-between items-center'>
              <h4 className='font-manrope font-semibold lg:text-[32px] max-md:text-[14px] md:text-[22px] text-success-513 '>Minions Serious EYE</h4>
              <Image src='/icons/shrae-icon.svg' height={32} width={31.72} alt='Share' />
            </div>
            <p className='text-success-516 text-[22px] text-opacity-40 max-md:text-[16px] font-montserrat font-semibold md:mt-8 max-md:mt-2'>Own a unique digital minion NFT! Each minion comes with distinct traits and exclusive artwork, making it a one-of-a-kind collectible on the blockchain.</p>
            <div className='flex justify-between md:mt-8 max-md:mt-4'>
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
            </div>
            <div className='mt-8 max-md:mt-3'>
              <p className='text-success-516 text-opacity-50  font-manrope text-[22px] max-md:text-[14px] font-semibold'>Current Price</p>
              <p className='text-white font-montserrat text-[22px] max-md:text-[14px] font-bold'>10 BITSI</p>
              {/* <button className='bg-success-513 py-2.5 mt-4 text-white text-[22px] px-20 rounded-xl'>Buy</button> */}
              <DialogBuy currencyText='BITSI' showSelectedItem = {true} totalItems={1} buttonName='Buy' nameOfClass='bg-success-513 py-2.5 mt-4 text-white text-[22px] px-20 rounded-xl hover:bg-success-509' />
            </div>
          </div>
        </div>
      </section>

      <section className='bg-success-503 p-8 max-md:p-2 md:gap-4 '>
        <p className='text-success-513 font-semibold font-manrope text-[28px] max-md:text-[20px] mb-8 max-md:mb-4'>Properties</p>
        <div className='flex gap-4 max-md:grid max-md:grid-cols-2 md:mb-6 max-md:mb-3'>
          <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
            <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]' >Royalities</p>
            <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>35%</p>
          </div>
          <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
            <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]'>Collection Name</p>
            <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>Galaxy</p>
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
        </div>

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
              <p className='text-success-517 text-[22px] font-semibold  max-md:text-[14px]'> 0xb1...iodhu00eF</p>
              </div>
              <div className='flex justify-between '>
              <p className='text-white text-[22px] font-semibold  max-md:text-[14px] '>Token Id</p>
              <p className='text-success-517 text-[22px] font-semibold  max-md:text-[14px]'> 1994</p>
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