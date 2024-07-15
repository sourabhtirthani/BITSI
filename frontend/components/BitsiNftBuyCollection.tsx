import React, { useState } from 'react'
import { CarouselNext, CarouselPrevious } from './ui/carousel'
import Image from 'next/image'

const BitsiNftBuyCollection = ({selectedItems , imgSource , current , count} : {selectedItems : number , imgSource : string , current : number , count : number}) => {
  // const [elements , setElements] = useState<string[]>([])
  let elements : string[]= [];
  for(let i =1 ; i<= count ; i++){
    if(i==current){
      elements[i] = '/icons/Ellipse_2163.svg'
    }else{
      elements[i] = '/icons/Ellipse_2164.svg'
    }
  }
  return (
    <>
    <div className='flex max-lg:flex-col '>

    <div className='lg:w-1/2 p-8 max-lg:p-4 max-md:p-2 '>
      <p className='bg-success-513 rounded-3xl font-bold font-manrope w-fit px-4 py-2 mb-3 text-[22px] text-white '>{selectedItems} Selected</p>
      
      <div className='relative'>
      <Image src= {imgSource} height={546} width={604} alt='NFT IMAGE' />
      <div className='absolute rounded-full ml-4 w-full max-w-[300px] max-sm:max-w-[250px] secondary-shadow11 items-center px-4  bg-gray-500 bg-opacity-45 flex bottom-3 py-2 justify-between'>
        <div className='flex flex-col items-center'>
          <p className='font-manrope text-white text-[20px] max-sm:text-[18px] '>4.25 ETH</p>
          <p className='text-white text-opacity-50 text-[14px] font-manrope max-sm:text-[13px]'>Floor Price</p>
        </div>
        <div className='bg-success-511 rounded-full p-2'>
        <Image src = '/icons/price-buy-col.svg' height={50} width={50} alt='icon'  /></div>
      </div>
      </div>
    </div>
    <div className='lg:w-1/2  flex flex-col p-8 max-md:p-2 max-lg:p-4 '>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-0'>
        <h4 className='font-manrope font-semibold lg:text-[32px] max-md:text-[14px] md:text-[22px] text-success-513 '>Minions Serious EYE</h4>
        <p className='text-white text-opacity-70 text-[22px] font-manrope font-semibold'>Collection - Luxury</p>
        </div>
          <Image src='/icons/mdi_delete.svg' height={32} width={31.72} alt='Share' />
      </div>
      <p className='text-success-516 text-[22px] text-opacity-40 max-md:text-[16px] font-montserrat font-semibold md:mt-8 max-md:mt-2'>Own a unique digital minion NFT! Each minion comes with distinct traits and exclusive artwork, making it a one-of-a-kind collectible on the blockchain.</p>
      {/* <div className='flex justify-between lg:mt-8 max-lg:mt-4'>
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
      </div> */}
      {/* <div className='mt-8 max-md:mt-3'>
        <p className='text-success-513 font-semibold font-manrope text-[28px] max-md:text-[20px] mb-8 max-md:mb-4'>Properties</p>
        <div className='flex gap-4 max-md:grid max-md:grid-cols-2 md:mb-6 max-md:mb-3 items-center '>
          <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
            <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]' >Royalities</p>
            <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>35%</p>
          </div>
          <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-3 hover:bg-success-509'>
            <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]'>Collection Name</p>
            <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent  font-montserrat text-[22px] max-md:text-[14px]'>Galaxy</p>
          </div>
          <div className="flex z-50 gap-4 items-center relative">
         
          
          
          </div>
        </div>

      </div> */}
    </div>
  </div>
      <div className='flex items-center py-2 mb-4 justify-center gap-2'>
      {elements.map((item , index)=>{
        return (
            <Image src={item} height={15} width={15} alt = 'image tag' key={index} />
        )
      })}
      </div>
  </>
  )
}

export default BitsiNftBuyCollection