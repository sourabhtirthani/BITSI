import BitsiCoinCard from '@/components/BitsiCoinCard'
import { CoinCheckOutDialog } from '@/components/CoinCheckOutDialog'
import { HomeFaq } from '@/components/HomeFaq'
import LineChartComp from '@/components/LineChartComp'
import { bitsiCoinCardData, coinBoxBuy, coinKeyFeatures, coinMaketTable } from '@/constants'
import { CoinBoxBuyProps, CoinMarketTableProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const BitsiCoin = () => {
    const currentYear = new Date().getFullYear();
    return (
        <>

            {/* bg-hero-image-bitsi-coin bg-cover */}
            <section className='bg-success-534 overflow-hidden'>
                <div className='w-full h-[100px] max-md:max-h-[50px]'></div>
                <div className='flex w-full h-full  p-8 max-md:p-4 overflow-clip'>
                    <div className='w-3/5 max-md:w-full flex items-center justify-center flex-col font-montserrat  text-white '>
                        <p className='text-[54px] max-sm:text-[32px]  font-bold'>Discover BITSI: A Secure and Growth-<span className='text-success-511'>Focused Digital Asset</span></p>
                        <p className='text-[21px]  font-normal'>BITSI offers investors enhanced stability and growth potential, combining innovative protection mechanisms with seamless accessibility across multiple platforms.</p>
                    </div>
                    <div className='flex w-2/5 max-md:hidden justify-center items-center'>
                        <Image src='/icons/hero-coin.png' height={500} width={500} alt='' className='max-lg:h-[350px] max-lg:w-[350px]' />
                    </div>
                </div>
            </section>

            <section className='bg-success-503'>

                <div className='p-8 max-md:p-4 mt-8 max-md:mt-4 font-montserrat text-white'>
                    <h1 className='font-montserrat text-success-511 font-bold text-[32px]'>Buy BITSI Coin here</h1>
                    <div className='flex flex-col gap-6 max-md:gap-3'>
                        <div className='rounded-xl overflow-x-auto w-full p-4 text-[20px] max-md:text-[10px] font-montserrat font-bold bg-success-512 secondary-shadow11'>
                            <table className='w-full '>
                                <thead className='text-left text-success-511   underline'>
                                    <tr>
                                        <th>Platform</th>
                                        <th>Type</th>
                                        <th>Current Price(BITSI)</th>
                                        <th>Market Scale</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className='text-white '>
                                    {coinMaketTable.map((item: CoinMarketTableProps, index: number) => {
                                        return (
                                            <tr key={index} >
                                                <td className='p-4 max-md:p-2'>{item.platform}</td>
                                                <td className='text-success-536 p-4 max-md:p-2'>{item.type}</td>
                                                <td className='p-4 max-md:p-2'> {item.price}</td>
                                                <td className='text-green-500'>{item.scale}</td>
                                                <td className=''>Trade&nbsp;Now </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                        <div className='flex w-full gap-6 max-md:gap-3 max-md:flex-col'>
                            <div className='flex flex-col max-md:w-full w-3/5 rounded-xl overflow-x-auto p-4 text-[20px] max-md:text-[10px]  font-bold bg-success-512 secondary-shadow11'>
                            </div>
                            <div className='flex flex-col max-md:w-full  gap-10 max-md:gap-5 w-2/5 rounded-xl overflow-x-auto text-white p-8 max-md:p-4 text-[22px] max-md:text-[11px]  bg-success-512 secondary-shadow11'>

                                {coinBoxBuy.map((item: CoinBoxBuyProps, index: number) => {
                                    return (
                                        <div key={index} className='flex gap-2 justify-between' style={{ borderBottomWidth: '0.0001px', borderColor: '#DDDDDD' }}>
                                            <p className='font-normal'>{item.key}</p>
                                            <p className='font-bold'>{item.value}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className=' max-md:mt-4 mt-8 flex w-full gap-6 max-md:gap-3 mb-4'>
                        <div className='w-3/5 max-md:w-full flex flex-col justify-center ' >
                            <p className='text-success-511 text-[32px] font-bold'>What is BITSI?</p>
                            <p className='font-normal text-[18px]'>BITSI is designed as a stable, growth-focused cryptocurrency that prioritizes investor security. With its unique protection mechanisms, BITSI offers an added layer of stability in a volatile market, making it ideal for those seeking steady, long-term growth. Its accessible design and innovative features set BITSI apart, providing a reliable, user-friendly investment option in the digital asset space.</p>
                            <div className='flex gap-8 max-md:flex-col w-full max-md:gap-2 mt-6 max-md:mt-3'>
                            <button className='bg-white rounded-xl  place-content-center py-3 max-md:py-1.5 md:w-3/12 text-black font-bold text-[16px] '>Buy Bitsi</button>
                            <button className='bg-black rounded-xl  place-content-center py-3 max-md:py-1.5 md:w-3/12  text-white font-bold text-[16px] '>Explore Us!</button>
                            </div>
                        </div>

                        <div className='w-2/5 max-md:hidden flex justify-center flex-col items-end overflow-x-clip  mt-20 '>
                        <div className='relative'>
                            <Image src='/icons/bitsi.svg' height={328} width={328} alt='' className='absolute right-2/4 z-10 bottom-1/4' />    
                            <Image src='/icons/bitsi.svg' height={328} width={328} alt='' className='z-50 sticky' /> </div>
                        </div>
                    </div>
                    <div className='mt-6 max-md:mt-3 flex flex-col items-center mb-10 max-md:mb-5'>
                        <h1 className='text-success-511 font-bold mb-5 max-md:mb-2.5 text-[32px]'>BITSI KEY FEATURES</h1>
                    <div className=' grid grid-cols-1 gap-8 max-md:gap-4'>
                        {coinKeyFeatures.map((item : CoinBoxBuyProps , index : number)=>{
                            return (
                                <div key={index} className='rounded-xl hover:bg-success-503 flex flex-col gap-6 max-md:gap-3 bg-success-512 secondary-shadow11 w-full p-8 max-md:p-4'>
                                    <p className='text-success-511 font-semibold text-[24px]'>{item.key}</p>
                                    <p className=' font-normal text-[18px]'>{item.value}</p>
                                    <button className='self-start py-3 px-4 font-bold text-[16px] text-success-511 bg-white rounded-full'>Show More</button>
                                </div>
                            )
                        })}
                        </div> 
                        </div>                 

                </div>
            <HomeFaq />
            </section>


        </>
    )
}

export default BitsiCoin