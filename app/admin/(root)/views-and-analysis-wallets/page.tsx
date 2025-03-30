'use client'
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel'
import { useState } from 'react';

const Viewsandanalysiswallets = () => {
  const [selectedTab , setSelectedTab] = useState('Mint Wallet');
  const handleSelectMintWallet = ()=>{
    setSelectedTab('Mint Wallet')
  }
  const handleSelectOwnerWallet = ()=>{
    setSelectedTab('Owner Wallet');
  }
  const handleSelectCompensationWallet = ()=>{
    setSelectedTab('Compensation Wallet')
  }
  return (
    <div className='bg-success-503 w-full   flex flex-col gap-12 p-8 max-md:p-4'>
        <div className='flex justify-between max-xl:justify-start max-xl:gap-4 items-center'>
            <p className='font-manrope font-bold text-[18px] text-success-511'>Views & Analysis - Wallets </p>
            <AdminAdressButtonForAdminPanel />
        </div>
      <div className='flex gap-10'>
            <p onClick={handleSelectMintWallet}  className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Mint Wallet' ? 'border-b-2 border-orange-500 ' : ''} `}>Mint Wallet</p>
            <p onClick={handleSelectOwnerWallet} className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Owner Wallet' ? 'border-b-2 border-orange-500 ' : ''} `}>Owner Wallet</p>
            <p onClick={handleSelectCompensationWallet} className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Compensation Wallet' ? 'border-b-2 border-orange-500 ' : ''} `}>Compensation Wallet</p>
        </div>
        </div>
  )
}

export default Viewsandanalysiswallets