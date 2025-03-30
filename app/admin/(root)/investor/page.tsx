'use client'
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel';
import AdminTableInvestorList from '@/components/AdminTableInvestorList';
import React, { useState } from 'react'

const Investor = () => {
    const [selectedTab , setSelectedTab] = useState('Pending');
    const handleSelectPending = ()=>{
        setSelectedTab('Pending')
    }
    const handleSelectApproved = ()=>{
        setSelectedTab('Approved');
    }
  return (
        <div className='bg-success-503 w-full   flex flex-col gap-12 p-8 max-md:p-4'>
        <div className='flex justify-between max-xl:justify-start max-xl:gap-4 items-center'>
            <p className='font-manrope font-bold text-[18px] text-success-511'>Investors</p>
            <AdminAdressButtonForAdminPanel />
        </div>
        <div className='flex gap-10'>
            <p onClick={handleSelectPending}  className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Pending' ? 'border-b-2 border-orange-500 ' : ''} `}>Pending</p>
            <p onClick={handleSelectApproved} className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Approved' ? 'border-b-2 border-orange-500 ' : ''} `}>Approved</p>
        </div>
        <AdminTableInvestorList status={selectedTab} />
    </div>
  )
}

export default Investor