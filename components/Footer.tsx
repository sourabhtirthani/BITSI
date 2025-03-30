import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <section className='bg-success-509'>
    <footer className="footer">
      {/* md:w-1/2 lg:w-1/3 */}
      
      <div className='w-fit flex lg:gap-x-[150px] md:gap-x-[80px] max-sm:flex-col justify-around sm:items-center md:py-2 ml-6  max-sm:ml-2 max-md:ml-4'>

        <div className='max-sm:mb-4'>
          <Image src='/icons/bitsi.svg' alt='logo' width={92} height={91} />
          <h4 className="text-md font-bold mt-2 max-md:mt-1  ">BITSI Cryptos Insurance Mechanism</h4>
          <p className='mt-4 max-md:mt-2 '>Sign up for the newsletter</p>
          <div className='relative flex justify-between '>
          <input placeholder='Enter your email...' className='rounded max-sm:w-fit w-[220px] mt-3 md:h-[25px] lg:h-[30px]' />
          <Image src = '/icons/send.svg' alt='send' height={18} width={18} className='relative top-2 right-14 max-md:right-24' />
          </div>
        </div>
        <div className=' flex flex-col md:gap-1 md:mb-12 max-sm:mb-4' >
          <p className='text-yellow-300 md:mb-5'>Services</p>
          <Link href='/services'>BITSI NFT</Link>
          <Link href='/services'>BITSI COIN</Link>
          <Link href='/services'>INSURANCE</Link>
        </div>

      </div>
    
      <div className=' flex justify-around lg:gap-x-[150px] md:gap-x-[80px] max-sm:flex-col '>
        <div className='flex flex-col md:gap-1  max-sm:flex-col max-sm:mb-4 ' >
          <p className='text-yellow-300 md:mb-5'>Quick Links</p>
          <Link href='/services'><p></p>About us</Link>
          <Link href='/services'>Contact Us</Link>
          <Link href='/services'>Privacy Policy</Link>
          <Link href='/services'>Terms and Conditions</Link>
        </div>
        <div className='flex flex-col md:gap-1  max-sm:flex-col max-sm:mb-1' >
          <p className='text-yellow-300 md:mb-5'>Contact us</p>
          
          <Link href='/services'><div className='flex gap-1'><Image src = '/icons/mail.svg' alt ='need help' width={17} height={17}/>info@gmail.com</div></Link>
          <Link href='/services'><div className='flex gap-1'><Image src = '/icons/contactus.svg' alt ='need help' width={15} height={15}/>Contact us</div></Link>
          <Link href='/services'><div className='flex gap-1'><Image src = '/icons/address.svg' alt ='need help' width={15} height={15}/>Laawa Street, Austin texas</div></Link>
          <Link href='/services'><div className='flex gap-1'><Image src = '/icons/webAddress.svg' alt ='need help' width={15} height={15}/>www.bitsi.com</div></Link>
          <Link href='/services'><div className='flex gap-1'><Image src = '/icons/needHelp.svg' alt ='need help' width={15} height={15}/>Need help</div></Link>
        </div>
      </div>
      
    </footer>
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

export default Footer