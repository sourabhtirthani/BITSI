import AdminOtpVerify from '@/components/AdminOtpVerify'
import Image from 'next/image'

const AuthHOME = () => {  
  return ( 
    <div className='bg-white  w-3/4 h-fit p-8 max-md:p-4 flex  justify-center max-sm:w-full'>
        <div className='flex flex-col items-center gap-3'>
            <h1 className='font-manrope  text-[38px] font-bold text-black'>Welcome To BITSI Admin Panl</h1>
            <p className='font-manrope text-black font-semibold text-[18px] '>Please enter the code that you received via mail</p>
            <div className='flex flex-col items-center gap-10 mt-10'>
            <Image src = 'icons/admin-lock-icon.svg' height={65} width={65} alt='icon'  />
            <AdminOtpVerify />
            <div className='flex gap-1 mt-3'>
                <p className='text-black font-manrope text-[18px] font-bold'>Didn&apos;t receive the code?</p>
                <p className='text-success-511 font-manrope text-[18px] font-bold underline'>Resend</p>
            </div>
            </div>
            </div>
    </div>
    
  )
}

export default AuthHOME