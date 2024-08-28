'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { tableAdminViewAndAnalysis } from '@/constants';
import AdminViewAndAnalyseNftRelated from '@/components/AdminViewAndAnalyseNftRelated';
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel';

const ViewsAndAnalysis = () => {
    const [searchValue , setSearchValue] = useState('');
    const handleSearchClick = ()=>{
      console.log(searchValue);
    }
    const [selectedTab , setSelectedTab] = useState('NFT Related');


    const handleNftRelatedClick = ()=>{
      setSelectedTab('NFT Related');
    }
    const handleCoinRelatedClick = ()=>{
      setSelectedTab('Coin Related');
    }
    const handleInsuraceRelatedClick = ()=>{
      setSelectedTab('Insurace Related');
    }


  return (
    <div className='bg-success-503 w-full   flex flex-col gap-12 p-8 max-md:p-4'>
      
        <div className='flex justify-between max-xl:justify-start max-xl:gap-4 items-center'>
            <p className='font-manrope font-bold text-[18px] text-success-511'>Views & Analysis </p>
            <AdminAdressButtonForAdminPanel />
        </div>
       
        <div className='flex gap-10'>
            <p onClick={handleNftRelatedClick}  className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'NFT Related' ? 'border-b-2 border-orange-500 ' : ''} `}>NFT Related</p>
            <p onClick={handleCoinRelatedClick} className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Coin Related' ? 'border-b-2 border-orange-500 ' : ''} `}>COIN Related</p>
            <p onClick={handleInsuraceRelatedClick} className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Insurace Related' ? 'border-b-2 border-orange-500 ' : ''} `}>Insurance Related</p>
        </div>
      <div className='flex max-md:flex-col  gap-10'>
        <div className='flex justify-between max-w-screen'>
          <div className='flex '>
        <input placeholder='Search your NFTs....' type='text' className='rounded-xl focus:outline-none px-1 max-sm:text-[12px] md:text-[20px] rounded-r-none md:w-[353px] font-montserrat h-[68px]' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
          <Image src = '/icons/search-bg-yellow.svg' height={68} width={83}  alt = 'search icon' className='' onClick={handleSearchClick}/>
          </div>
          <div>
          {/* drop down here */}
          </div>
          </div>
          </div>
           
          {(selectedTab == 'NFT Related') && <AdminViewAndAnalyseNftRelated searchValue = {searchValue} />}
    </div>
  )
}

export default ViewsAndAnalysis