'use client'
import EditUserForm from '@/components/EditUserForm';
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';

const  EditProfile =  () => {
    const {address , isConnected} = useAccount();
    const [addr , setAddr] = useState('')
    const { push } = useRouter();
    useEffect(()=>{
setAddr(address as string)
    }, [address])

    useEffect(()=>{
      if(!isConnected){
        push('/')
      }
    } , [isConnected])
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