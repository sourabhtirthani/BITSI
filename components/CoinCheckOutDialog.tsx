'use client'
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useState } from "react"
import { useAccount, useWriteContract, useBalance } from 'wagmi';

export function CoinCheckOutDialog({withInsurnce} : {withInsurnce : boolean}) {
    const [quantity , setQuantity] = useState(1);
    const { address, isConnected } = useAccount();
    const { data: balance} = useBalance({address : address});

  return (
    <Dialog>
      <DialogTrigger asChild>
        {withInsurnce ? 
      <button className=' hover:bg-success-509 bg-white px-4 py-4 w-fit mt-6 max-md:mt-3 rounded-3xl font-bold text-black font-inter text-[16px] max-md:text-[12px]'>Buy Coin With Insurance</button>:
      <button className='hover:bg-success-509 bg-black px-4 py-4 w-fit mt-6 max-md:mt-3 rounded-3xl font-semibold text-white font-inter text-[16px] max-md:text-[12px]'>Buy Coin Without Insurance</button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[420px] bg-white py-2 px-4">
        <DialogHeader>
          <DialogTitle className="font-montserrat  text-black text-[22px] font-bold">Checkout</DialogTitle>
          <DialogDescription className="font-montserrat text-black font-normal text-[18px]">
            Selected Item:
          </DialogDescription>
        </DialogHeader>
       <div className="flex border-2 border-success-511 w-full justify-between px-3 ">
        <div className="flex gap-2 items-center">
            <Image src='/icons/bitsi.svg' height={80} width={80} alt="" />
            <p className="font-manrope text-[22px] font-bold text-black">BITSI COIN</p>
        </div>
        <div className="flex gap-2 items-center font-bold text-[18px]">
            <p onClick={() => setQuantity(prev => prev + 1)} className="text-black cursor-pointer">+</p>
            <p className="p-1 bg-black text-white w-[30px] font-manrope rounded-lg"> {String(quantity).padStart(2, '0')}</p>
            <p onClick={() => quantity > 1 && setQuantity(prev => prev - 1)} className="text-black cursor-pointer ">-</p>
        </div>
       </div>

       <div className="flex flex-col mb-5 border-2 gap-3.5 border-success-511 w-full justify-between text-[18px] p-5 text-black font-medium font-montserrat">
        <div className="flex justify-between">
            <p>Your Balance</p>
            <p className="font-bold">{balance?.formatted.slice(0, 10) ?? '-'} {balance?.symbol}</p>
        </div>
        <div className="flex justify-between">
            <p>Coin Price</p>
            <p className="font-bold">12 {balance?.symbol}</p>
        </div>
        {withInsurnce && 
        <div className="flex justify-between">
            <p>Insurance Price</p>
            <p className="font-bold">12 {balance?.symbol}</p>
        </div> }
        <div className="flex justify-between">
            <p>Total Price</p>
            <p className="font-bold">12  {balance?.symbol}</p>
        </div>
        {isConnected ?
        <button className="bg-nft-text-gradient py-3 rounded-xl mt-2 w-full text-white font-bold ">BUY</button> : 
        <button disabled className="cursor-no-drop bg-gray-400 py-3 rounded-xl mt-2 w-full  font-bold ">NO WALLET FOUND</button>}
       </div>
        
      </DialogContent>
    </Dialog>
  )
}
