import BitsiCoinCard from '@/components/BitsiCoinCard'
import { bitsiCoinCardData } from '@/constants'
import React from 'react'

const BitsiCoin = () => {
  return (
    <>
    <div className='navbar-space'></div>
    
    <section className='bg-hero-bitsi-coin bg-cover opacity-80 '>
        <div className='flex flex-col px-8 py-8 max-md:px-4 max-md:py-4 '>
            <h1 className='text-success-513 lg:text-[52px] text-[28px] font-semibold '>Introducing BITSI Coin: Your Gateway to the Future of Digital Finance!</h1>
            <p className='text-white font-manrope text-[22px] max-md:text-[16px] lg:w-4/6 font-semibold '>We are thrilled to announce that Bitsi Coin, the innovative cryptocurrency designed to revolutionize the digital finance landscape, is now available for purchase exclusively on our website!</p>
            <div className='grid grid-cols-2 max-md:grid-cols-1 max-w-fit max-md:gap-2'>
            <button className=' hover:bg-success-509 bg-success-506 px-4 py-3 w-fit mt-6 max-md:mt-3 rounded-xl font-bold text-black font-inter text-[16px] max-md:text-[12px]'>Buy Coin With Insurance</button>
            <button className='hover:bg-success-509 bg-black px-4 py-3 w-fit mt-6 max-md:mt-3 rounded-xl font-semibold text-white font-inter text-[16px] max-md:text-[12px]'>Buy Coin Without Insurance</button>
            </div>
        </div>
    </section>

    <section className='bg-success-503'>
        <h3 className='text-white font-manrope text-[32px] max-sm:text-[24px] font-semibold px-8 py-3 mt-14  max-sm:px-12 max-sm:mt-6'>Minted Coins / First Hand</h3>
        <div className='grid grid-cols-3 p-6 h-full max-lg:grid-cols-2 max-sm:grid-cols-1'>
    {bitsiCoinCardData.map((item)=>{
        return (
            <div className='p-2 ' key={item.id}>
                <BitsiCoinCard heading={item.heading} value={item.value} net={item.net} />
            </div>
        )
    })}
    </div>


    <h3 className='text-white font-manrope text-[32px] max-sm:text-[24px] font-semibold px-8 py-3 max-sm:px-12 max-sm:mt-6'>Second Hand</h3>
        <div className='grid grid-cols-3 p-6 h-full max-lg:grid-cols-2 max-sm:grid-cols-1'>
    {bitsiCoinCardData.map((item)=>{
        return (
            <div className='p-2' key={item.id}>
                <BitsiCoinCard heading={item.heading} value={item.value} net={item.net} />
            </div>
        )
    })}
    </div>

    </section>

   
    </>
  )
}

export default BitsiCoin