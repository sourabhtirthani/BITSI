'use client'
import React from 'react'
import Image from 'next/image';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link'
import { useAccount, useDisconnect } from "wagmi";
import { useWeb3Modal } from '@web3modal/wagmi/react';
import { usePathname } from 'next/navigation';

const MobileNav = () => {
  const {isConnected , address} = useAccount();
  const { disconnect } = useDisconnect()
  const currentPath = usePathname();

  const isActive = (path : string) => currentPath === path;

  const { open } = useWeb3Modal();
  const handleConnect = async () => {
    try {
      if(!isConnected){
      await open();
      }else{
        disconnect();
      }
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };
  return (

    <Sheet>
      <SheetTrigger className=''>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </SheetTrigger>
      <SheetContent side='left' className="border-none bg-white overflow-y-auto">

        <div className="hidden max-md:flex flex-col h-full   ml-4 text-black text-[22px] gap-10 font-bold max-md:max-h-screen">
          <div className='flex gap-3  items-center'>
          <Image src = '/icons/bitsi.svg' height={65} width={65} alt='bitsi logo' />
          <h1 className='font-manrope text-black font-bold text-[34px]'>BITSI</h1>
          </div>
          <SheetClose asChild>
            <Link href="/" className={`flex gap-3 ${isActive('/') ? 'border-r-4 border-success-525' : ''}`}><Image src = '/icons/side-bar-home-icon.svg' height={24} width={24} alt='icon' />Home</Link></SheetClose>
          <SheetClose asChild><Link href="/bitsi-nft" className={`flex gap-3 ${isActive('/bitsi-nft') ? 'border-r-4 border-success-525' : ''}    ` }><Image src = '/icons/nft-icon-userzone.svg' height={24} width={24} alt='icon' />BITSI NFT</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/bitsi-coin" className={`flex gap-3 ${isActive('/bitsi-coin') ? 'border-r-4 border-success-525' : ''}`}><Image src = '/icons/coin-icon-userzone.svg' height={24} width={24} alt='icon' />BITSI COIN</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/insurance" className={`flex gap-3  ${isActive('/insurance') ? 'border-r-4 border-success-525' : ''}`}><Image src = '/icons/incusrance-icon-userzone.svg' height={24} width={24} alt='icon' />Insurance</Link></SheetClose>
          <SheetClose asChild>
           
           
          <Link href="/about" className={`flex gap-3 ${isActive('/about') ? 'border-r-4 border-success-525' : ''}`}> <Image src = '/icons/side-bar-about-icon.svg' height={24} width={24} alt='icon' />About</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/my-profile" className={`flex gap-3 ${isConnected ? '' : 'hidden'} ${isActive('/my-profile') ? 'border-r-4 border-success-525' : ''}`}><Image src = '/icons/side-bar-profile-icon.svg' height={24} width={24} alt='icon' />User Zone</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/kyc-auth" className={`flex gap-3 ${isConnected ? '' : 'hidden'}  ${isActive('/kyc-auth') ? 'border-r-4 border-success-525' : ''} `}><Image src = '/icons/side-bar-home-icon.svg' height={24} width={24} alt='icon' />KYC</Link></SheetClose>

          <SheetClose asChild>
          <div onClick={handleConnect}  className='flex gap-3'><Image src={`${isConnected ? '/icons/disconnect-ison.svg' : '/icons/connect-icon.svg'}`} height={24} width={24} alt='user-icon' />
          <p className="">{isConnected ? 'Disconnect' : 'Connect'}</p></div></SheetClose>
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default MobileNav