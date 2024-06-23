'use client'
import React from 'react'
import Link from 'next/link'

const InsuranceTermsButtonsAll = () => {
  return (
    <div className='md:self-center mt-20 max-md:mt-10 gap-10 flex max-lg:flex-col'>
                <div className='max-sm:gap-3 gap-10 flex'>
                <Link href='/terms-and-conditions'><button className='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance'>Purchase</button></Link>
                <Link href='/terms-and-conditions'><button className='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance'>Extend</button></Link>
                <Link href='/terms-and-conditions'> <button className='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance'>Policy</button></Link>
                </div>
                <div className='max-sm:gap-3 gap-10 flex'>
                <Link href='/terms-and-conditions'><button className='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5  max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance'>Claim</button></Link>
                <Link href='/terms-and-conditions'> <button className='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5  max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance'>Upgrade</button></Link>
                <Link href='/terms-and-conditions'> <button className='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5  max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance'>Unlock</button></Link>
                </div>
            </div>
  )
}

export default InsuranceTermsButtonsAll