import BitsiCoinCard from '@/components/BitsiCoinCard'
import { CoinCheckOutDialog } from '@/components/CoinCheckOutDialog'
import LineChartComp from '@/components/LineChartComp'
import { bitsiCoinCardData } from '@/constants'
import React from 'react'

const BitsiCoin = () => {
    const currentYear = new Date().getFullYear();
  return (
    <>
    <div className='navbar-space'></div>
    
    <section className='bg-hero-image-bitsi-coin bg-cover'>
        <div className='flex flex-col px-8 py-8 max-md:px-4 max-md:py-4 bg-black bg-opacity-40'>
            <h1 className='text-white lg:text-[52px] text-[28px] font-semibold '>Introducing BITSI Coin: Your Gateway to the Future of Digital Finance!</h1>
            {/* <p className='text-white font-manrope text-[22px] max-md:text-[16px] lg:w-4/6 font-semibold '>We are thrilled to announce that Bitsi Coin, the innovative cryptocurrency designed to revolutionize the digital finance landscape, is now available for purchase exclusively on our website!</p> */}
            <div className='w-5/6 mt-2'>
            <p className='text-white text-opacity-80 font-manrope font-extrabold text-[22px]'>We are incredibly excited to share that Bitsi Coin, the groundbreaking cryptocurrency set to transform the digital finance world, is now officially available for purchase exclusively on our website! This revolutionary digital currency is designed to redefine the way we think about finance, offering unparalleled security, speed, and efficiency. By purchasing Bitsi Coin, you are joining a cutting-edge financial movement that is poised to make significant impacts across the globe. Don’t miss your chance to be part of this financial revolution – visit our website today and secure your Bitsi Coins!</p>
            </div>
            <div className='grid grid-cols-2 max-md:grid-cols-1 max-w-fit max-md:gap-2'>
            <CoinCheckOutDialog withInsurnce = {false}/>
            <CoinCheckOutDialog withInsurnce = {true}/>
            {/* <button className=' hover:bg-success-509 bg-white px-4 py-4 w-fit mt-6 max-md:mt-3 rounded-3xl font-bold text-black font-inter text-[16px] max-md:text-[12px]'>Buy Coin With Insurance</button>
            <button className='hover:bg-success-509 bg-black px-4 py-4 w-fit mt-6 max-md:mt-3 rounded-3xl font-semibold text-white font-inter text-[16px] max-md:text-[12px]'>Buy Coin Without Insurance</button> */}
            </div>
            
            {/* <p className='text-white flex text-md mb-8 mt-8 max-sm:text-sm'>Copyright © {currentYear} &nbsp;<span className='font-bold'> BITSI Crypto Insurance Mechanism.</span> All Right reserved</p> */}
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

    <div className='p-8 flex flex-col'>
        <LineChartComp titleofChart='Sale Volume' />

        <div className='grid grid-cols-3 max-md:grid-cols-1 mt-20'>
            <div className='max-md:py-1'><LineChartComp titleofChart='Price' /></div>
            <div className='md:px-3 max-md:py-1'><LineChartComp titleofChart='Policy Coverage' /></div>
            <div className='max-md:py-1'><LineChartComp titleofChart='Volume of BITSI COIN'/></div>
        </div>
    </div>

    </section>

   
    </>
  )
}

export default BitsiCoin