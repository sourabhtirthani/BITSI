'use client'
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel'
import AdminBurnNftsTable from '@/components/AdminBurnNftsTable';
import Image from 'next/image';
import { useState } from 'react'

const BurnToken = () => {
    const [searchValue , setSearchValue] = useState('');
  return (
    <div className='p-8 max-md:p-4 w-full'>
        <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
            <p className='font-manrope font-bold text-[18px] text-success-511'>Burn NFTs </p>
            {/* <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '></button> */}
            <AdminAdressButtonForAdminPanel />
        </div>
        <div className='flex  mb-10'>
        <input placeholder='Search your NFTs....' type='text' className='rounded-xl focus:outline-none px-1 max-sm:text-[12px] md:text-[20px] rounded-r-none md:w-[353px] font-montserrat h-[68px]' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
          <Image src = '/icons/search-bg-yellow.svg' height={68} width={83}  alt = 'search icon' className=''/>
          </div>
          <AdminBurnNftsTable searchValue={searchValue} />
        </div>
  )
}

export default BurnToken