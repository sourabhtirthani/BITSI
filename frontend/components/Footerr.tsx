import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Footerr = () => {
    const currentYear = new Date().getFullYear();
  return (
    <section className='bg-success-509'>

        <div className='flex max-md:flex-col justify-between sm:p-8  max-md:p-4 gap-2'>
            {/* <div className=' flex flex-col items-center'> */}
            {/* sm:ml-20 sm:mt-10 sm:mb-20 */}
            <div className='flex flex-col'>
            <Image src='/icons/bitsi.svg' alt='logo' width={92} height={91} />
          <h4 className="text-[18px] font-bold mt-2 max-md:mt-1 font-manrope  text-white  ">BITSI&nbsp;Crypto&apos;s&nbsp;Insurance Mechanism</h4>
          <p className='mt-4 max-md:mt-2 font-poppins text-white text-[15px] font-normal'>Sign up for the newsletter</p>
          <div className=' flex  items-center '>
          <input placeholder='Enter your email...' className='rounded max-sm:w-fit w-[220px] mt-3 md:h-[25px] lg:h-[30px]' />
          <Image src = '/icons/send.svg' alt='send' height={18} width={18} className=' relative right-5 mt-3' />
          </div>
          </div>
            {/* </div> */}

            <div className='flex flex-col gap-2 mt-8 max-lg:hidden max-md:flex md:mr-8'>
            <p className='text-yellow-300 md:mb-5 font-bold  font-manrope text-[20px]'>Services</p>
          <Link href='/services' className='font-poppins text-white text-[16px]'>BITSI NFT</Link>
          <Link href='/services' className='font-poppins text-white text-[16px]'>BITSI COIN</Link>
          <Link href='/services' className='font-poppins text-white text-[16px]'>INSURANCE</Link>
            </div>

            <div className='flex flex-col gap-2 mt-8 ' >
          <p className='text-yellow-300 md:mb-5 font-bold font-manrope text-[20px]'>Quick Links</p>
          <Link href='/services' className='font-poppins text-white text-[16px]'>About us</Link>
          <Link href='/services' className='font-poppins text-white text-[16px]'>Contact Us</Link>
          <Link href='/services' className='font-poppins text-white text-[16px]'>Privacy Policy</Link>
          <Link href='/services' className='font-poppins text-white text-[16px]'>Terms and Conditions</Link>
        </div>


        <div className='flex flex-col md:gap-1  max-sm:flex-col max-sm:mb-1 mt-8' >
          <p className='text-yellow-300 md:mb-5 font-bold font-manrope text-[20px]'>Contact us</p>
          
          <Link href='/services' className='font-poppins text-white text-[16px]'><div className='flex gap-1'><Image src = '/icons/mail.svg' alt ='need help' width={17} height={17}/>info@gmail.com</div></Link>
          <Link href='/services' className='font-poppins text-white text-[16px]'><div className='flex gap-1'><Image src = '/icons/contactus.svg' alt ='need help' width={15} height={15}/>Contact us</div></Link>
          <Link href='/services' className='font-poppins text-white text-[16px]'><div className='flex gap-1'><Image src = '/icons/address.svg' alt ='need help' width={15} height={15}/>Laawa Street, Austin texas</div></Link>
          <Link href='/services' className='font-poppins text-white text-[16px]'><div className='flex gap-1'><Image src = '/icons/webAddress.svg' alt ='need help' width={15} height={15}/>www.bitsi.com</div></Link>
          <Link href='/services' className='font-poppins text-white text-[16px]'><div className='flex gap-1'><Image src = '/icons/needHelp.svg' alt ='need help' width={15} height={15}/>Need help</div></Link>
        </div>

        </div>
        <div className='flex items-center justify-center gap-3 max-sm:gap-2 mb-2 '>
      <Image src = '/icons/instagram.svg' alt='instaicon' height={19} width={19} />
      <Image src = '/icons/facebook.svg' alt='instaicon' height={15} width={8} />
      <Image src = '/icons/youtube.svg' alt='instaicon' height={19} width={19} />
      <Image src = '/icons/linkedin.svg' alt='instaicon' height={19} width={19} />

    </div>
        <hr className='h-px bg-white border-1 mt-1 max-sm:hidden'/>
        <p className='text-white flex text-md mb-1 justify-center max-sm:text-sm'>Copyright © {currentYear} &nbsp;<span className='font-bold'> BITSI Crypto Insurance Mechanism.</span> All Right reserved</p>
    </section>
  )
}

export default Footerr