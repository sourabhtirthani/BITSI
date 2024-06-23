'use client'
import React from 'react'

const InsuraceContactUsBtn = () => {
    const scrollToBottom = () => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      };
  return (
    <div className='md:w-1/3 items-start  justify-end  flex  w-fit md:p-8'>
    <button onClick={scrollToBottom} className='p-2 text-[22px] w-fit font-manrope text-white bg-success-511 font-bold rounded-xl px-4 mt-2 hover:bg-yellow-500'>CONTACT US</button>
    </div>
  )
}

export default InsuraceContactUsBtn