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
            <Link href="/">Home</Link></SheetClose>
          <SheetClose asChild><Link href="/bitsi-nft">BITSI NFT</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/bitsi-coin">BITSI COIN</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/insurance">Insurance</Link></SheetClose>
          <SheetClose asChild>
          <Link href="/about">About</Link></SheetClose>
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default MobileNav