import Image from 'next/image'
import React from 'react'

const handleSubmit = async  ()=>{
    'use server'
    
    console.log('form submission server action here');
}
const  EditProfile = async () => {
  return (
    <>
    <div className='mt-40 overflow-hidden  flex max-md:flex-col max-md:gap-4  justify-center items-center mb-20'>
        <div className='bg-success-512 md:z-50  max-md:w-3/4 flex gap-4 max-md:p-10 p-20 flex-col items-center justify-center secondar-shadow11'>
            <p className='text-white text-[32px] font-manrope font-bold'>Profile Image</p>
            <Image src='/icons/profile-logo.png' height={200} width={200} alt='Profile Image' className='' />
            <p className='text-success-515 text-[32px] font-bold font-manrope'>Senorita Habudj</p>
            <p className='text-white text-[32px] font-bold font-manrope'>0xb1...iodhu00eF</p>
        </div>  
        <div className='md:relative md:right-[10%] max-md:w-3/4 md:items-end md:h-[651.92px] md:w-[823.22px]  bg-white p-20 max-md:p-10 flex flex-col '>
            <form action={handleSubmit} className='flex flex-col md:w-3/4 gap-6  mt-3 bg-transparent'>
            <p className='text-success-513 text-[30px] font-manrope self-start font-bold'>Edit Your Information</p>
                <input name = 'name' id='name' placeholder='Name*' className=' text-black font-manrope bg-transparent p-3 border-2 border-gray-400 rounded-xl' required/>
                <input name = 'Email' id='Email' placeholder='Email*' className=' text-black font-manrope bg-transparent p-3 border-2 border-gray-400 rounded-xl' required/>
                <input name = 'Whatsapp' id='Whatsapp' placeholder='Whatsapp' className=' text-black font-manrope bg-transparent p-3 border-2 border-gray-400 rounded-xl' required/>
                <input name = 'Address' id='Address' placeholder='Address' className=' text-black font-manrope bg-transparent p-3 border-2 border-gray-400 rounded-xl' required/>
                <input name = 'Bio' id='Bio' placeholder='Bio' className=' text-black font-manrope bg-transparent p-3 border-2 border-gray-400 rounded-xl' required/>
                <button type='submit' className='w-full bg-success-511 text-white font-manrope font-bold p-4 max-lg:p-2 text-[22px]'>Update&nbsp;Profile</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default EditProfile