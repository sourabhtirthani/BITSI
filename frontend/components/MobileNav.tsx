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
const MobileNav = () => {
  return (

    <Sheet>
      <SheetTrigger className=''>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </SheetTrigger>
      <SheetContent side='left' className="border-none bg-white">

        <div className="hidden max-md:flex flex-col h-full   ml-4 text-black text-[22px] gap-10 font-bold max-md:max-h-screen">
          <div className='flex gap-3 items-center'>
          <Image src = '/icons/bitsi.svg' height={65} width={65} alt='bitsi logo' />
          <h1 className='font-manrope text-black font-bold text-[34px]'>BITSI</h1>
          </div>
          <SheetClose asChild>
            <Link href="/" className='flex gap-3 border-r-4 border-success-525'><Image src = 'icons/side-bar-home-icon.svg' height={24} width={24} alt='icon' />Home</Link></SheetClose>
          <SheetClose asChild><Link href="/bitsi-nft" className='flex gap-3'><Image src = 'icons/side-bar-nft-icon.svg' height={24} width={24} alt='icon' />BITSI NFT</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/bitsi-coin" className='flex gap-3'><Image src = 'icons/side-bar-coin-icon.svg' height={24} width={24} alt='icon' />BITSI COIN</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/insurance" className='flex gap-3'><Image src = 'icons/side-bar-insurance-icon.svg' height={24} width={24} alt='icon' />Insurance</Link></SheetClose>
          <SheetClose asChild>
           
           
          <Link href="/about" className='flex gap-3'> <Image src = 'icons/side-bar-about-icon.svg' height={24} width={24} alt='icon' />About</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/my-profile" className='flex gap-3'><Image src = 'icons/side-bar-profile-icon.svg' height={24} width={24} alt='icon' />User Zone</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/kyc-auth" className='flex gap-3'><Image src = 'icons/side-bar-home-icon.svg' height={24} width={24} alt='icon' />Kyc</Link></SheetClose>
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default MobileNav