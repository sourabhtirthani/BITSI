'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const ViewsAndAnalysis = () => {
    const [searchValue , setSearchValue] = useState('');
    const handleSearchClick = ()=>{
      console.log(searchValue);
    }
  return (
    <div className='bg-success-503 p-10 flex flex-col gap-12'>
        <h1 className='text-success-511 text-[18px] '>Views And Analysis</h1>
        <div className='flex gap-10'>
            <p className='font-manrope text-white text-[18px] max-sm:text-[12px] font-bold '>NFT Related</p>
            <p className='font-manrope text-white text-[18px] max-sm:text-[12px] font-bold '>COIN Related</p>
            <p className='font-manrope text-white text-[18px] max-sm:text-[12px] font-bold '>Insurance Related</p>
        </div>
      <div className='flex max-md:flex-col gap-10'>
        <div className='flex max-w-screen'>
        <input placeholder='Search your NFTs....' type='text' className='rounded-xl focus:outline-none px-1 max-sm:text-[12px] md:text-[20px] rounded-r-none md:w-[353px] font-montserrat h-[68px]' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
          <Image src = '/icons/search-bg-yellow.svg' height={68} width={83}  alt = 'search icon' className='' onClick={handleSearchClick}/>
          </div>

          <div className='flex gap-5'>
          <button className='bg-success-512 secondary-shadow11 text-[22px] max-md:text-[16px]  font-montserrat font-semibold p-4 max-md:p-2 flex items-center gap-2 text-white rounded-xl hover:bg-success-509  overflow-hidden'>
          Event<Image src = '/icons/arrow-down.svg' height={9.21} width={16} alt = 'drowpdown' className='mt-1' />
            </button>
            <button className='bg-success-512 secondary-shadow11 text-[22px] max-md:text-[16px]  font-montserrat font-semibold p-4 max-md:p-2 flex items-center gap-2 text-white rounded-xl hover:bg-success-509  overflow-hidden'>
          Price<Image src = '/icons/arrow-down.svg' height={9.21} width={16} alt = 'drowpdown' className='mt-1' />
            </button>
            <button className='bg-success-512 secondary-shadow11 text-[22px] max-md:text-[16px]  font-montserrat font-semibold p-4 max-md:p-2 flex items-center gap-2 text-white rounded-xl hover:bg-success-509  overflow-hidden'>
          Date<Image src = '/icons/arrow-down.svg' height={9.21} width={16} alt = 'drowpdown' className='mt-1' />
            </button>
          </div>
          </div>
    </div>
  )
}

export default ViewsAndAnalysis