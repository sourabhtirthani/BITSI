'use client'
import AdminAdressButtonForAdminPanel from "@/components/AdminAdressButtonForAdminPanel"
import AdminTableEvents from "@/components/AdminTableEvents";
import Image from "next/image";
import { useState } from "react";


const Viewsandanalysisevents = () => {
  const [searchValue , setSearchValue] = useState('');
  return (
    <div className='bg-success-503 w-full   flex flex-col gap-12 p-8 max-md:p-4'>
      
    <div className='flex justify-between max-xl:justify-start max-xl:gap-4 items-center'>
        <p className='font-manrope font-bold text-[18px] text-success-511'>Views & Analysis - Events </p>
        <AdminAdressButtonForAdminPanel />
    </div>
    <div className='flex '>
        <input placeholder='Search your NFTs....' type='text' className='rounded-xl focus:outline-none px-1 max-sm:text-[12px] md:text-[20px] rounded-r-none md:w-[353px] font-montserrat h-[68px]' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
          <Image src = '/icons/search-bg-yellow.svg' height={68} width={83}  alt = 'search icon' className='' />
          </div>
          <AdminTableEvents />
    </div>
  )
}

export default Viewsandanalysisevents