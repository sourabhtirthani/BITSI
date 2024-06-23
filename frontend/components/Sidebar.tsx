import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
  return (
   <div className='bg-success-523 flex flex-col p-4 max-w-[204px] w-[204px] h-fit justify-center items-center gap-9 max-sm:hidden'>
    <div className='flex items-center mt-4 gap-2 self-start'>
    <Image src = '/icons/bitsi.svg' height={44.46} width={45} alt='BITSI LOGO' />
    <h1 className='text-[20px] font-manrope font-bold text-white'>BITSI</h1>
    </div>
    <Link href= '/admin/coin-parameters'> <p className='text-[18px] font-manrope self-start text-white font-bold'>Coin Parameters</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope self-start text-white font-bold '>NFT Parameters</p></Link>
   <div className='self-start flex flex-col justify-center items-center w-full gap-3'>
    <Link href='/admin/minting' className='self-start'><p className='text-[18px] font-manrope  text-white font-bold'>Minting</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Admin Wallet</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>NFT Mint</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Coin Mint</p></Link>
    </div>

    <div className='self-start flex flex-col justify-center items-center w-full gap-3'>
    <p className='text-[18px] font-manrope self-start text-white font-bold'>View&nbsp;&&nbsp;Analysis</p>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>NFT</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Coin</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Insurance</p></Link>
    </div>
    <div className='self-start flex flex-col justify-center items-center w-full gap-3'>
    <p className='text-[18px] font-manrope self-start text-white font-bold'>Analytic&nbsp;Dashboard</p>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Numerics</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Graphs</p></Link>
    </div>
    
   </div>
  )
}

export default Sidebar