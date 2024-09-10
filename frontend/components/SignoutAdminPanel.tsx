'use client'
import React from 'react'
import { useToast } from "@/components/ui/use-toast"
import { signoutFromAdminPanel } from '@/actions/uploadNft'

const SignoutAdminPanel = () => {
    const { toast } = useToast()
    const handleClick = async()=>{
        try{
            await signoutFromAdminPanel();
            window.location.reload();
        }catch(error){
            console.log(`here`);
            console.log(error)
            toast({
                title: "Error Signing out",
                description: "Please try again later",
                duration: 2000,
                style: {
                  backgroundColor: '#900808',
                  color: 'white',
                  fontFamily: 'Manrope',
                },
              })
        }
    }
  return (
    <div><p onClick={handleClick} className='mb-7 cursor-pointer text-[18px] font-manrope self-start text-white font-bold '>Signout</p></div>
  )
}

export default SignoutAdminPanel