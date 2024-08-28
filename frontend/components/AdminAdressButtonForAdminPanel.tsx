'use client'
import { formatAddressUserZone } from '@/lib/utils';
import React from 'react'
import { useAccount} from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react';

const AdminAdressButtonForAdminPanel = () => {
    const {address} = useAccount();
    const {open} = useWeb3Modal();
    const handleConnect = async()=>{
        // await open();
    }
  return (
    <button onClick={handleConnect} className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>{address ? formatAddressUserZone(address) : 'Connect'}</button>
  )
}

export default AdminAdressButtonForAdminPanel