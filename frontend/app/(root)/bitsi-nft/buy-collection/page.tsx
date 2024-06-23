'use client'
import React, { useState , useEffect } from 'react'
import { useSearchParams ,useRouter } from 'next/navigation'
// import {  } from 'next/router'
import Image from "next/image";
import { buycollectionsTable } from '@/constants';
import { DialogBuy } from '@/components/DialogBuy';

const BuyCollection = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [ids, setIds] = useState<string[]>([]);
    const selectedItems: string[] = [];
    searchParams.forEach((item)=>{
        selectedItems.push(item);
    })
  return (
    <>
    <div className='navbar-space'></div>
    <section className='bg-success-503'>
        {/* <div className='px-8 py-1'>
            <p className='bg-success-513 rounded-xl w-fit px-3'>{selectedItems.length} Selected</p>
        </div> */}
        <div className='flex max-lg:flex-col '>
            
          <div className='lg:w-1/2 p-8 max-lg:p-4 max-md:p-2 '>
          <p className='bg-success-513 rounded-3xl font-bold font-manrope w-fit px-4 py-2 mb-3 text-[22px] text-white '>{selectedItems.length} Selected</p>
            <Image src='/icons/nft-desc.png' height={546} width={604} alt='NFT IMAGE' />
          </div>
          <div className='lg:w-1/2  flex flex-col p-8 max-md:p-2 max-lg:p-4 '>
            <div className='flex justify-between items-center'>
              <h4 className='font-manrope font-semibold lg:text-[32px] max-md:text-[14px] md:text-[22px] text-success-513 '>Minions Serious EYE</h4>
              <Image src='/icons/shrae-icon.svg' height={32} width={31.72} alt='Share' />
            </div>
            <p className='text-success-516 text-[22px] text-opacity-40 max-md:text-[16px] font-montserrat font-semibold md:mt-8 max-md:mt-2'>Own a unique digital minion NFT! Each minion comes with distinct traits and exclusive artwork, making it a one-of-a-kind collectible on the blockchain.</p>
            <div className='flex justify-between lg:mt-8 max-lg:mt-4'>
              <div className='flex flex-col gap-4 max-lg:gap-2'>
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
            <p className='text-success-513 font-semibold font-manrope text-[28px] max-md:text-[20px] mb-8 max-md:mb-4'>Properties</p>
            <div className='flex gap-4 max-md:grid max-md:grid-cols-2 md:mb-6 max-md:mb-3 items-center '>
          <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
            <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]' >Royalities</p>
            <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>35%</p>
          </div>
          <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
            <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]'>Collection Name</p>
            <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>Galaxy</p>
          </div>
          {/* <div>
          <button className='bg-success-513 py-2.5 mt-4 text-white text-[22px] px-20 rounded-xl'>Buy</button>
          </div> */}
        </div>
              
            </div>
          </div>
        </div>

        <div className='p-8'>
            <div className='flex   w-fit items-center sm:gap-32 max-sm:gap-20'>
                <div className='flex flex-col justify-between'>
            <p className='text-success-516 text-opacity-50  font-manrope text-[22px] max-md:text-[14px] font-semibold'>Total Price</p>
            <p className='text-white font-montserrat text-[22px] max-md:text-[14px] font-bold'>10 BITSI</p>  
            </div>
          {/* <button className='bg-success-513 py-2.5  text-white text-[22px] max-sm:px-10 px-20 rounded-xl'>Buy</button> */}
          <DialogBuy totalItems={selectedItems?.length} buttonName='Buy' showSelectedItem = {false} currencyText='BITSI' nameOfClass='bg-success-513 py-2.5  text-white text-[22px] max-sm:px-10 px-20 rounded-xl'/>
          </div>
          </div>

          <div className='max-h-[300px] mb-20 p-8  overflow-y-auto table-body '>
            <table className='w-full text-left mt-4 border-spacing-20  overflow-y-auto'>
              <thead className='text-success-502 font-semibold font-manrope text-[22px] max-sm:text-[10px] '>
                <tr className='sticky'>
                <th className='p-2 max-sm:p-1'>Collections</th>
                  <th className='p-2 max-sm:p-1'>NFT</th>
                  <th className='p-2 max-sm:p-1' >Price</th>
                </tr>
              </thead>
              <tbody className='rounded-3xl  overflow-y-auto '>
                {buycollectionsTable.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 h-[78px]   secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold rounded-3xl'>
                        <td className='p-2 max-sm:p-1'>{item.Collections}</td>
                        <td className='p-2 max-sm:p-1'>{item.NFT}</td>
                        <td className='p-2 max-sm:p-1'>{item.price} Bitsi</td>
                      </tr>
                      <tr>
                        <td  className='h-4'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
          </div>
      </section>

      
            
          
        
        
   
    </>
  )
}

export default BuyCollection