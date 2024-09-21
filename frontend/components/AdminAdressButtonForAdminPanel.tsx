'use client'
import { formatAddressUserZone } from '@/lib/utils';
import  { useEffect } from 'react'
import { useAccount , useSwitchChain} from 'wagmi'
import { useWeb3Modal } from '@web3modal/wagmi/react';
import {  polygonAmoy, sepolia } from 'wagmi/chains'

const AdminAdressButtonForAdminPanel = () => {
    const {address , isConnected} = useAccount();
  const { open } = useWeb3Modal();
  const { switchChain } = useSwitchChain()
  const handleConnect = async () => {
    try {
      await open();
    } catch (error) { 
      console.error('Failed to connect wallet:', error);
    }
  };
  useEffect(()=>{

    if(isConnected){
       switchChain({ chainId: sepolia.id });
    }

  }, [isConnected , switchChain])
  return (
    <button onClick={handleConnect} className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>{address ? formatAddressUserZone(address) : 'Connect'}</button>
  )
}

export default AdminAdressButtonForAdminPanel