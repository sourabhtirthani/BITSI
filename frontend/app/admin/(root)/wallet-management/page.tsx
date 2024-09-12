
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel'
import AdminWalletManagamenetTable from '@/components/AdminWalletManagamenetTable'
import { tableAdminWallets } from '@/constants'
import Image from 'next/image'
import React from 'react'

const WalletManagement = () => {
  return (
    <div className='p-8 max-md:p-4 w-full overflow-x-auto'>
        <div className='flex justify-between mb-14 max-md:mb-7 items-center w-full'>
            <p className='font-manrope font-bold text-[18px] text-success-511'>Wallets </p>
            {/* <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>Connect</button> */}
            <AdminAdressButtonForAdminPanel />
        </div>
        <AdminWalletManagamenetTable />
        
      
        </div>
  )
}

export default WalletManagement