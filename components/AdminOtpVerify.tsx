'use client'
import { AdminOtpBox } from '@/components/AdminOtpBox'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { useToast } from "@/components/ui/use-toast"

const AdminOtpVerify = () => {  
    const {address} = useAccount();
    const { toast } = useToast();
    const [value , setValue] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            // console.log(`address is  ${address as string}`)
            // console.log(` the prisec is ${process.env.NEXT_PUBLIC_ADMIN_ADDRESS}`)
            if (event.key === 'Enter' && value === '1234') {
                if(!address || address as string != process.env.NEXT_PUBLIC_ADMIN_ADDRESS){
                    toast({
                        title: "Access denied!", description: 'Only admins can access the panel', duration: 2000,
                        style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
                      })
                      console.log('in here')
                      return;
                }
                router.push('/admin/analytic-dashboard'); 
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [value, router]);
  return ( 
    <AdminOtpBox value={value} setValue={setValue}/>
    
  )
}

export default AdminOtpVerify