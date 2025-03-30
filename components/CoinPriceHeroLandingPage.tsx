import { CoinPriceHeroLandingPageProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const CoinPriceHeroLandingPage = ({headingText , amount , val} : CoinPriceHeroLandingPageProps ) => {
  return (
    <div className='bg-transparent flex flex-col w-fit overflow-hidden'>
        <p className='text-white font-manrope text-[16px] max-sm:text-[15px] font-bold'>{headingText}</p>
        <div className='flex gap-0.5 items-center'>
            <Image src = '/icons/bitsi.svg' height={50} width={49.4} alt = 'bitsi logo' />
            <p className='text-[20px] max-sm:text-[16px] lg:text-[28px] text-white font-manrope'>{amount}</p>
            <Image src = {`/icons/arrow-${val}.png`} height={20} width={20} alt = 'arrow-up' className='align-super self-start'/>
        </div>
    </div>
  )
}

export default CoinPriceHeroLandingPage