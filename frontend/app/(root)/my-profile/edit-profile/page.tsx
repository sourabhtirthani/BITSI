'use client'
import EditUserForm from '@/components/EditUserForm';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';

const  EditProfile =  () => {
    const {address , isConnected} = useAccount();
    const [addr , setAddr] = useState('')
    useEffect(()=>{
setAddr(address as string)
    }, [address])
  return (
    <>
    {address && isConnected ?
   <EditUserForm addressOfUser={addr as string}/> : 
   <>
   <div className='navbar-space'></div>
   <div className='text-white h-full flex items-center justify-center mb-40 mt-40 font-montserrat text-[40px] text-center'>Please connect wallet to continue</div>
   </>
   }
    </>
  )
}

export default EditProfile