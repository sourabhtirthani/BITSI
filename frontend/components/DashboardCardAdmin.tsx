import React from 'react'
import Image from 'next/image'

const DashboardCardAdmin = ({}) => {
  return (
    <div className='hover:bg-success-509 flex flex-col gap-2   bg-success-512 rounded-2xl px-4 py-3   secondary-shadow11'>
        <div className='flex justify-between items-center gap-28 max-lg:gap-16'>
            <div className='flex flex-col'>
                <p className='text-[22px] text-white font-manrope font-bold '>BITSI COIN</p>
                <p className='text-[16px] text-white font-manrope font-normal'>Second hand price</p>
            </div>
            <div>
                <Image src = '/icons/bitsi.svg' height={54.35} width={55} alt='bitsi logo' />
            </div>
        </div>
        <p className='text-[13px] text-white font-normal text-opacity-60'>Current price</p>
        <div className='flex items-center mb-4'>
          <p className='font-manrope text-white text-[28px]'>1 BTS = 14.65</p>
          <Image src='/icons/ethereum.svg' height={29.32} width={18} alt='etherum' />
        </div>
    </div>
  )
}

export default DashboardCardAdmin