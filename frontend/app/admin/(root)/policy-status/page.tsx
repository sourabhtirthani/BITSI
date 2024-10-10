'use client'
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel'
import AdminTablePolicyStatus from '@/components/AdminTablePolicyStatus';
import React, { useState } from 'react'

const ApproveInsurance = () => {
  const [selectedTab , setSelectedTab] = useState('Pending');
  return (
    <div className='p-8 max-md:p-4 w-full overflow-x-auto scrollbar-thin'>
        <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
            <p className='font-manrope font-bold text-[18px] text-success-511'>Policy Status</p>
            <AdminAdressButtonForAdminPanel />
        </div>
        <div className='flex gap-10'>
            <p onClick={()=>{setSelectedTab('Pending')}} className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Pending' ? 'border-b-2 border-orange-500 ' : ''} `}>Pending</p>
            <p onClick={()=>{setSelectedTab('Approved')}}  className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Approved' ? 'border-b-2 border-orange-500 ' : ''} `}>Approved</p>
            <p onClick={()=>{setSelectedTab('Active')}}  className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Active' ? 'border-b-2 border-orange-500 ' : ''} `}>Active</p>
        </div>
        <AdminTablePolicyStatus selectedTab={selectedTab} />
    </div>
  )
}

export default ApproveInsurance