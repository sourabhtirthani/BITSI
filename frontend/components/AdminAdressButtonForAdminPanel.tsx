'use client'
import { formatAddressUserZone } from '@/lib/utils';
import React from 'react'
import { useAccount } from 'wagmi'

const AdminAdressButtonForAdminPanel = () => {
    const {address} = useAccount();
  return (
    <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>{address ? formatAddressUserZone(address) : 'Connect'}</button>
  )
}

export default AdminAdressButtonForAdminPanel