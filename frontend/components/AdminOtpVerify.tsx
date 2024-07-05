'use client'
import { AdminOtpBox } from '@/components/AdminOtpBox'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const AdminOtpVerify = () => {  
    const [value , setValue] = useState('');
    const router = useRouter();
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Enter' && value === '1234') {
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