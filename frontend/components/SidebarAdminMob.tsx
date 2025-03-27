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
const SidebarAdminMob = () => {

  return (

    <Sheet>
      <SheetTrigger className=''>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="white">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
        </svg>
      </SheetTrigger>
      <SheetContent side='left' className="border-none bg-white overflow-y-auto">

        <div className="hidden max-md:flex flex-col h-full   ml-4 text-black text-[22px] gap-10 font-bold max-md:max-h-screen">
          <div className='flex gap-3 items-center'>
            <Image src='/icons/bitsi.svg' height={65} width={65} alt='bitsi logo' />
            <h1 className='font-manrope text-black font-bold text-[34px]'>BITSI</h1>
          </div>
          <SheetClose asChild>
            <Link href="/admin/analytic-dashboard" className='flex gap-3 border-r-4 border-success-525'>Analytic dashboard</Link></SheetClose>
          <SheetClose asChild><Link href="/admin/wallet-management" className='flex gap-3'>Wallets</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/prices" className='flex gap-3'>Prices</Link></SheetClose>
          {/* <SheetClose asChild>
          <Link href="/admin/minting" className='flex gap-3'>MINTING</Link></SheetClose> */}
          <SheetClose asChild>


            <Link href="/admin/nft-minting" className='flex gap-3'> NFT MINTING</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/coin-minting" className='flex gap-3'>COIN MINTING</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/coin-insurance" className='flex gap-3'>COIN INSURANCE</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/nft-insurance" className='flex gap-3'>NFT INSURANCE</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/views-and-analysis" className='flex gap-3'>View & Analyse</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/views-and-analysis" className='flex gap-3'>View & Analyse</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/compensation" className='flex gap-3'>Compensation</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/policy-status" className='flex gap-3'>Policy Status</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/ownership" className='flex gap-3'>Ownership</Link></SheetClose>
          <SheetClose asChild>
            <Link href="/admin/insurance-approval" className='flex gap-3'>Insurance Approve</Link></SheetClose>
        </div>
      </SheetContent>
    </Sheet>

  )
}

export default SidebarAdminMob