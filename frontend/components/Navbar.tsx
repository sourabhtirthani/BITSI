'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import MobileNav from './MobileNav';
import DropdownNav from './DropdownNav';
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { useAccount } from 'wagmi';
import { formatAddress } from '@/lib/utils';



const Navbar = () => {
  const {address , isConnected} = useAccount();
  const { open } = useWeb3Modal();
  const handleConnect = async () => {
    try {
      await open();
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };
    const [isOpen, setIsOpen] = useState(false);
    const[selectedComp , setSelectedComp] = useState('');
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };



  return (
    <nav className='navbar w-full max-w-[3000px]'>
        <div className='flex items-center '>
    <Image className='logo ' src='/icons/bitsi.svg' alt='logo' width={100} height={100}  />
    <Image src = '/icons/animate-star.gif' height={50} width={50} alt ='sd' className='absolute top-0' />
    <Image src = '/icons/animate-star.gif' height={40} width={40} alt ='sd' className='absolute top-1 ml-12 max-md:hidden' />
    <Image src = '/icons/animate-star.gif' height={30} width={30} alt ='sd' className='absolute mt-10 ml-16 max-md:hidden' />
    <Image src = '/icons/animate-star.gif' height={30} width={30} alt ='sd' className='absolute mt-10 ml-16 max-md:mt-0 max-md:ml-6' />
    <Image src = '/icons/animate-star.gif' height={30} width={30} alt ='sd' className='absolute mt-10 ml-16 max-md:mt-8 max-md:ml-1' />
    <Image src = '/icons/animate-star.gif' height={30} width={30} alt ='sd' className='absolute mt-7 mr-10 max-md:hidden' />
    <Image src = '/icons/animate-star.gif' height={40} width={40} alt ='sd' className='absolute ml-[25px] mb-[30px] max-md:ml-[-10px] max-md:mb-[2px]' />
    <div className="hidden md:flex space-x-8  ml-3 text-yellow-300 font-manrope gap-20 xl:text-lg lg:text-[15px] md:text-[12px] max-xl:gap-7 max-lg:gap-0">
          <Link onClick={()=>{setSelectedComp('Home')}} href="/" className={`${selectedComp == 'Home' ? 'text-white' : 'text-yellow-300'} font-bold`}>Home</Link>
          <Link onClick={()=>{setSelectedComp('BitsiNft')}} href="/bitsi-nft" className={`${selectedComp == 'BitsiNft' ? 'text-white' : 'text-yellow-300'} font-bold`}>BITSI NFT</Link>
          <Link onClick={()=>{setSelectedComp('BitsiCoin')}} href="/bitsi-coin" className={`${selectedComp == 'BitsiCoin' ? 'text-white' : 'text-yellow-300'} font-bold`}>BITSI COIN</Link>
          <Link onClick={()=>{setSelectedComp('Insurance')}} href="/insurance" className={`${selectedComp == 'Insurance' ? 'text-white' : 'text-yellow-300'} font-bold`}>Insurance</Link>
          <Link onClick={()=>{setSelectedComp('About')}} href="/about" className={`${selectedComp == 'About' ? 'text-white' : 'text-yellow-300'} font-bold`}>About</Link>
        </div>
    </div>
    <div className="flex flex-end ml-auto gap-1 md:px-4 max-md:p-2">
        <button onClick={handleConnect} className="bg-white text-black px-3 py-2 xl:mr-6 rounded-full flex items-center max-md:mr-2 hover:bg-black duration-300">
         
          <span className='text-yellow-500 bg-curent flex items-center gap-1 '>
            <Image src = '/icons/wallet.svg' alt = 'wallet' height={34} width={34} className='max-md:h-[20px] max-md:w-[20px]' />
            {isConnected ? formatAddress(address) : 'Wallet'}</span>
        </button>
         {/* <MetaMaskProvider debug={false} sdkOptions={sdkOptions}>
          <ConnectWalletButton />
        </MetaMaskProvider> */}
        {/* <Image src= '/icons/hamburger-icon.svg' height={28} width={28} alt='hamburger' className='max-md:hidden' /> */}
        <DropdownNav />
        <div className="md:hidden  h-8 w-8 p-1 text-white ">
    <MobileNav/>
   </div>
        {/* <button onClick={toggleMenu} className="ml-4 text-white md:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button> */}
      </div>  
        
      {/* {isOpen &&(
        <MobileNav/>
      )} */}
      {/* {isOpen && (
        <ul className="md:hidden flex-col border-l border-gray-200 xl:flex w-[355px] xl:overflow-y-scroll !important">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/bitsi-nft">BITSI NFT</Link></li>
          <li><Link href="/bitsi-coin">BITSI COIN</Link></li>
          <li><Link href="/insurance">Insurance</Link></li>
          <li><Link href="/about">About</Link></li>
        </ul>
      )} */}
       
    </nav>
  )
}

export default Navbar

/* Frame 1000004627 */


