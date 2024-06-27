import React from 'react'
import Image from "next/image";
import InsuraceContactUsBtn from '@/components/InsuraceContactUsBtn';
import InsuranceTermsButtonsAll from '@/components/InsuranceTermsButtonsAll';
import LineChartComp from '@/components/LineChartComp';

const Insurance = () => {
    
  return (
    <>
    <div className='navbar-space'>
    </div>

    {/* <section className='bg-hero-insurance bg-cover bg-no-repeat bg-current flex flex-col p-16 max-md:p-12'>
        <div className=' max-lg:px-12 max-md:px-2 px-20 py-10 max-md:py-3 '>
            <h2 className='text-success-513 font-manrope font-semibold lg:text-[64px] md:text-[48px] max-md:text-[28px] text-center'>&quot;Protect Your Investment with BITSI&#39;s Unique Insurance Mechanism&quot;</h2>
        </div>
        <div className=' px-20 max-md:px-1'>
        
        <p className='text-[34px] text-center font-manrope text-success-515 font-semibold max-md:text-[20px]'>“Discover How We Secure Your Assets”</p>
        </div>
    </section> */}
    

    <section className='bg-success-503'>
        <div className='flex flex-col mt-10 max-sm:mt-6 p-8 overflow-hidden'>
            <div className='flex max-md:flex-col'>
                <div className='md:w-2/3'>
                <h1 className='font-poller-one text-[98px] max-md:text-[78px] max-sm:text-[44px] text-white'>BITSI INSURANCE</h1>
                <p className='text-[22px] max-sm:text-[14px] mt-3 text-white text-opacity-60'>BITSI Insurance offers comprehensive coverage for a wide range of digital assets, including coins, NFTs, cryptocurrencies, Stocks and trades.</p>
                </div>
               <InsuraceContactUsBtn />
            </div>

            <InsuranceTermsButtonsAll />

           
        </div>

        

        <div className='flex flex-col mt-22 max-md:mt-1  p-10 mb-6 max-md:mb-2 gap-8 max-md:gap-5'>
        <hr className=' mt-4 p-10 text-white ' />
        <h3 className='text-success-513 text-[22px]'>Secure Your Digital Assets with Bitsi Insurance Today!</h3>
        <ol type='1'  className='flex  flex-col gap-5 max-md:gap-4'>
            <li  className='text-white underline text-[22px] font-manrope'>BITSI Coin Insurance</li>
            <li className='text-white underline text-[22px] font-manrope'>BITSI Coin Long Term Insurance</li>
            <li className='text-white underline text-[22px] font-manrope'>BITSI NFT Insurance</li>
            <li className='text-white underline text-[22px] font-manrope'>Crypto Coins</li>
            <li className='text-white underline text-[22px] font-manrope'>Crypto Trade</li>
            <li className='text-white underline text-[22px] font-manrope'>Trade</li>
            <li className='text-white underline text-[22px] font-manrope'>Trade Insurance</li>
            <li className='text-white underline text-[22px] font-manrope'>Insurance for Stock</li>
        </ol>
        </div>

       
 
    <div className='mt-8 max-md:mt-4 p-10 mb-6 max-md:mb-2 flex flex-col gap-8 max-md:gap-5'>
    <h3 className='text-success-513 text-[22px]'>Discover How We Secure Your Assets</h3>
    <p className='font-manrope text-white md:text-[22px] font-thin'>BITSI Crypto&#39;s Insurance Mechanism, through its innovative use of BITSI NFT, BITSI Coin, and a robust Insurance Mechanism, offers a secure and efficient way to navigate the complexities of the cryptocurrency world. Founded by Alex in 2024, the system aims to build trust and provide peace of mind to users, fostering a safer and more reliable digital economy.</p>
    </div>
    <div className='flex flex-col p-10 gap-8'>
    <h3 className='text-success-513 text-[22px]'>Insurance Mechanism</h3>
    <p className='font-manrope text-white md:text-[22px] font-normal'>BITSI is the first cryptocurrency platform to offer insurance for your assets. Our unique mechanism protects against hacks and ensures your account safely</p>
    </div>

    <div className='mt-8 p-10'>
        <div className='flex flex-col'>
            <p className='font-manrope text-[22px] font-semibold text-success-513 mb-8 ml-2'>How It Works?</p>
            <div className='grid md:grid-cols-3 max-md:grid-cols-1 max-md:place-items-center'>
            <div className=''>
                <Image src = '/icons/insurance-vid-img1.png' height={254} width={360} alt = "vid" />
            </div>
            <div className=''>
                <Image src = '/icons/insurance-vid-img2.png' height={254} width={360} alt = "vid" />
            </div>
            <div className=''>
                <Image src = '/icons/insurance-vid-img3.png' height={254} width={360} alt = "vid" />
            </div>
            </div>
        </div>

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

export default Insurance