'use client'
import Dropdown from '@/components/Dropdown'
import { createAndSellNFT, topSellers } from '@/constants'
import Image from 'next/image'
import React, { useState } from 'react'


const About = () => {
    const daysFilter = [{id:1,name : 'Yesterday',icon : '/icons/user-icon.svg'}]
    const [filterValue , setFilterValue] = useState('')

    return (
        <>
            <section className='bg-about-us'>
                <div className='navbar-space'>

                </div>
                {/* <div className='relative h-full opacity-90 bg-success-503'> */}
                <div className='flex flex-col items-center bg-success-503 opacity-85'>
                    <h1 className='text-white font-poppins lg:text-[55px] md:text-[40px] text-center text-[30px] md:mt-16 mt-10'>About us </h1>
                    <p className='text-white lg:text-[22px] p-10 lg:max-w-[878px] md:max-w-[600px] lg:mb-8 mb-4 max-sm:p-4 text-center'>Our development services focus on creating unique and effective digital solutions that
                        enable your business to thrive in the competitive online world.</p>
                </div>
                {/* </div> */}
            </section>

            <section className='bg-success-503 overflow-hidden '>
                <div className='flex max-md:flex-col max-lg:items-center '>
                    <div className='xl:w-3/4 max:lg:w-1/2 mt-20 p-8 flex flex-col mb-5 md:mb-3 lg:mb-8 max-md:p-4'>
                        <h1 className='text-success-511 lg:text-[30px] md:text-[24px] sm:text-[14px] '>Founder & CEO -Alexander</h1>
                        <div className='flex gap-2 mt-3 items-center'>
                            <Image src='icons/bitsi.svg' height={28} width={28} alt='BITSI LOGO' />
                            <p className='text-white font-semibold font-manrope lg:text-[22px] md:text-[14px] sm:text-[8px]'>BITSI Cryptos Insurance&nbsp;Mechanism</p>
                        </div>
                        <p className='text-white mt-2 font-manrope lg:text-[22px] md:text-[14px] sm:text-[14px] font-thin'>
                            Founded by Alex in 2024, BITSI Cryptos Insurance Mechanism is a comprehensive system designed to provide financial security within the cryptocurrency space. The mechanism encompasses three main components: BITSI NFT, BITSI Coin, and the Insurance Mechanism itself.
                            Each of these categories plays a vital role in ensuring the stability and growth of the BITSI ecosystem.
                        </p>
                        <p className='text-success-511 mt-4'>Learn about our Insurance</p>
                    </div>
                        {/* max-md:hidden might add this property to the div that is in next line later */}
                    <div className='xl:w-1/4 max:lg:w-1/2 2xl:p-20 max-md:p-5 xl:p-5 max-lg:items-center mt-20 mr-20  max-custom-md1:hidden'>
                        <div className='bg-custom-radial-gradient h-[343.33px] w-[282.55px] lg:h-[300px] lg:w-[250px] xl:h-[300px] xl:w-[250px] md:h-[260px] md:w-[205px] 2xl:w-[282px] 2xl:h-[343.33px]'>
                            <Image src='/icons/Alex.png' height={343.33} width={282.55} alt = "Founder Image" className='relative bottom-7 animate-slide  ' />

                            {/* md:h-[260px] md:w-[205px] lg:h-[300px] lg:w-[250px] xl:h-[300px] xl:w-[250px] 2xl:w-[282px] 2xl:h-[343.33px] */}
                        </div>

                    </div>
                </div>
            </section>


            <section className='bg-success-503'>
                <div className='lg:mt-16 mt-8 flex justify-center'>
                <h1 className='text-white lg:text-[47px] max-lg:text-[35px] max-sm:text-[25px] font-montserrat font-semibold mb-14 lg:mb-24'>Create and sell your NFTs</h1>
                </div>

                <div className='grid grid-cols-3 max-md:grid-cols-1 p-8 max-md:p-4 '>
                {createAndSellNFT.map((item)=>{
                    return (
                        <div key={item.id} className='p-2 '>
                        <div  className='hover:bg-success-509 hover:animate-in  bg-success-512 add-border rounded-2xl  h-full secondary-shadow11'>
                            <Image src={item.icon} height={64.48} width={62} alt = "icon" className='relative left-[80%] bottom-[8%]' />
                            <p className='  text-success-511 text-[22px] max-md:text-[18px] px-2 font-manrope'>{item.step}</p>
                            <h3 className='text-white text-[30px] max-md:text-[28]  mb-2 font-montserrat p-2'>{item.heading}</h3>
                            <p className='p-4 text-white lg:text-[22px] md:text-[15px] max-md:text-[16px]  font-montserrat'>{item.content}</p>
                            <Image src = '/icons/arrow-right.svg' height={35} width={35} alt = 'arrow-right' className='mt-auto'/>
                            
                            </div>
                        </div>
                    )
                })}
                </div>

                <div className='lg:mt-16 mt-8 flex justify-between p-4 md:px-8 items-start'>
                <h1 className='text-success-511 lg:text-[47px] max-lg:text-[35px] max-sm:text-[25px] font-montserrat font-semibold mb-14 lg:mb-24'>Our Top Sellers</h1>
                <div className='h-fit'>
                <Dropdown buttonName='Today' items={daysFilter} setValue={setFilterValue} /></div>
                </div>

                <div className='grid grid-cols-4 max-sm:grid-cols-1 mb-20 max-md:mb-10 p-7 max-md:grid-cols-2 -mt-10 max-xl:grid-cols-3'>
                    {topSellers.map((item , index)=>{
                        return (
                            <div key={index} className='p-1 '>
                                <div className='bg-success-512 gap-2 py-3 px-5 flex items-center h-full hover:bg-success-509'>
                                    <p className='text-white  text-[28px] font-manrope font-bold'>{index +1}.</p>
                                    <div className='flex items-center gap-2 '>
                                        <Image src = {`/icons/${item.icon}.svg`} height={70} width={70} alt='profile-icon' />
                                        <div className='flex flex-col gap-2 '>
                                            <p className='text-[22px] text-white font-manrope font-bold'>{item.Name}</p>
                                            <p className='text-white font-manrope font-semibold text-opacity-60 text-[22px]'>{item.Metic} Metic</p>
                                        </div>
                                    </div>
                            </div>
                            </div>
                        )
                    })}
                </div>

            </section>

        </>
    )
}

export default About