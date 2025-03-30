import Image from 'next/image'
import React from 'react'

const NftCardAdmin = () => {
  return (
    <div className='hover:bg-success-509 flex flex-col gap-2   bg-success-512 rounded-2xl px-3 py-1  secondary-shadow11'>
        <div className='flex justify-between items-center gap-16'>
        <p className='font-manrope text-white text-opacity-60 text-[16px] '>BITSI NFT PRICE<span className="align-super text-[9px]">(First Hand)</span></p>
        <Image src = '/icons/bitsi.svg' height={37} width={37} alt='BITSI LOGO' />
        </div>
        <p className='text-white text[16px] font-manrope font-bold'>Current Price</p>
        <div className='flex gap-2'>
        <p className='text-white text-[30px] font-manrope font-bold'>1 BTS =  14.65</p>
        <Image src='/icons/ethereum.svg' height={29.32} width={18} alt='etherum' />
        </div>
        <Image src='/icons/edit-logo.svg' height={24} width={24} alt='edit logo' className='self-end mt-1 opacity-50' />
    </div>
  )
}

export default NftCardAdmin