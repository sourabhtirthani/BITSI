import React from 'react'
import Image from "next/image";
import InsuraceContactUsBtn from '@/components/InsuraceContactUsBtn';
import Link from 'next/link';
import { ToolTipHoverEffect } from '@/components/TooltipHoverEffect';
import { DialogInsuranceOptions } from '@/components/DialogInsuranceOptions';


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
                <h1 className='font-poller-one text-[92px] max-md:text-[78px] max-sm:text-[44px] text-white'>BITSI PROTECTION</h1>
                <p className='text-[22px] max-sm:text-[14px] mt-3  text-white text-opacity-60'>BITSI Protection offers comprehensive coverage for a wide range of digital assets, including coins, NFTs, cryptocurrencies, Stocks and trades.</p>
                </div>
               <InsuraceContactUsBtn />
            </div>

            <div className='md:self-center mt-20 max-md:mt-10 gap-10 flex max-lg:flex-col'>
                <div className='max-sm:gap-3 gap-10 flex'>
                {/* <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Purchase' hoverInfo='purchase an nft' /></Link> */}
                {/* <Link href='/terms-and-conditions'> <ToolTipHoverEffect btnName='Policy' hoverInfo='Policy info' /></Link> */}
                {/* <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Extend' hoverInfo='extend infortmation' /></Link> */}
                <DialogInsuranceOptions  helpText='Buy a New Insurance Policy' buttonName='Purchase' redirectTo={['Coin' , 'NFTs' , '' ,'']} nameOfClass='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance' />
                {/* <DialogInsuranceOptions helpText='sample help text here' buttonName='Policy' redirectTo={['Coin' , 'NFTs' , '' ,'']} nameOfClass='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance' /> */}
                <DialogInsuranceOptions helpText='Increase the coverage of your existing insurance policy' buttonName='Upgrade' redirectTo={['Coin' , 'NFTs' , '' ,'']} nameOfClass='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance' />
                <DialogInsuranceOptions helpText='Extend the duration of your existing insurance policy' buttonName='Extend' redirectTo={['Coin' , 'NFTs' , '' ,'']} nameOfClass='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance' />
                </div>
                <div className='max-sm:gap-3 gap-10 flex'>
                {/* <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Claim' hoverInfo='Claim infortmation' /></Link> */}
                {/* <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Upgrade' hoverInfo='upgrade infortmation' /></Link> */}
                {/* <Link href='/terms-and-conditions'> <ToolTipHoverEffect btnName='Unlock' hoverInfo='unlock infortmation' /></Link> */}
                <DialogInsuranceOptions helpText='File a claim to receive compensation for a loss' buttonName='Claim' redirectTo={['Coin' , 'NFTs' , '' ,'']} nameOfClass='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance' />
                <DialogInsuranceOptions helpText='Unlock compensation coins' buttonName='Unlock' redirectTo={['Coin' , 'NFTs' , '' ,'']} nameOfClass='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance' />
                </div>
            </div>
            {/* <div className='md:self-center mt-14 max-md:mt-10 gap-10 flex max-lg:flex-col'>
            <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Trade Insurance ' hoverInfo='trade insurance info here' /></Link>
            <Link href='/terms-and-conditions'><ToolTipHoverEffect btnName='Insurance for Stock ' hoverInfo='Insurance for Stock  info here' /></Link>
            </div> */}

           
        </div>

        

        <div className='flex flex-col mt-22 max-md:mt-1  p-10 mb-6 max-md:mb-2 gap-8 max-md:gap-5'>
        <hr className=' mt-4 p-10 text-white ' />
        <h3 className='text-success-513 text-[22px]'>Secure Your Digital Assets with Bitsi Protection Today!</h3>
        <ol type='1'  className='flex  flex-col gap-5 max-md:gap-4'>
            <li  className='text-white underline text-[22px] font-manrope'>BITSI Coin Protection</li>
            <li className='text-white underline text-[22px] font-manrope'>BITSI Coin Long Term Protection</li>
            <li className='text-white underline text-[22px] font-manrope'>BITSI NFT Protection</li>
            <li className='text-white underline text-[22px] font-manrope'>Crypto Coins</li>
            <li className='text-white underline text-[22px] font-manrope'>Crypto Trade</li>
            <li className='text-white underline text-[22px] font-manrope'>Trade</li>
            <li className='text-white underline text-[22px] font-manrope'>Trade Protection</li>
            <li className='text-white underline text-[22px] font-manrope'>Protection for Stock</li>
        </ol>
        </div>

       
 
    <div className='mt-8 max-md:mt-4 p-10 mb-6 max-md:mb-2 flex flex-col gap-8 max-md:gap-5'>
    <h3 className='text-success-513 text-[22px]'>Discover How We Secure Your Assets</h3>
    <p className='font-manrope text-white md:text-[22px] font-thin'>BITSI Crypto&#39;s Protection Mechanism, through its innovative use of BITSI NFT, BITSI Coin, and a robust Insurance Mechanism, offers a secure and efficient way to navigate the complexities of the cryptocurrency world. Founded by Alex in 2024, the system aims to build trust and provide peace of mind to users, fostering a safer and more reliable digital economy.</p>
    </div>
    <div className='flex flex-col p-10 gap-8'>
    <h3 className='text-success-513 text-[22px]'>Protection Mechanism</h3>
    <p className='font-manrope text-white md:text-[22px] font-normal'>BITSI is the first cryptocurrency platform to offer protection for your assets. Our unique mechanism protects against hacks and ensures your account safely</p>
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
   

    </section>

    </>
  )
}

export default Insurance