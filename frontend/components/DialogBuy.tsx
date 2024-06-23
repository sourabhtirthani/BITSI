import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buyNftDialogProps } from "@/types"
import  Checkbox  from "./Checkbox1"
import Link from "next/link"
import Image from 'next/image'

export function DialogBuy({totalItems , buttonName, showSelectedItem , nameOfClass , currencyText } : buyNftDialogProps ) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className= {nameOfClass}>{buttonName}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white ">
        <DialogHeader>
          <DialogTitle className="text-black font-montserrat  font-bold">Checkout</DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
          {!showSelectedItem &&( <p className="font-semibold text-black font-montserrat ">Total NFTs - {totalItems}</p>)}
          {showSelectedItem && (<>
            <p className="font-semibold text-black font-montserrat ">Selected Item:</p>
            <div className="flex items-center p-3 border-2 border-success-511 gap-3">
                <Image src = '/icons/nft-desc.png' height={63.48} width={70} alt="nft image" />
                <div className="flex flex-col gap-2">
                    <p className="text-black font-manrope font-bold text-[22px]">Minions Serious Eye</p>
                    <div className="flex">
                    <p className="text-black text-[12px] font-montserrat font-semibold">Royality&nbsp;</p>
                    <p className=" bg-nft-text-gradient bg-clip-text text-transparent text-[12px] font-montserrat font-semibold">35%&nbsp;</p>
                    <p className="text-black text-[12px] font-montserrat font-semibold">Collection&nbsp;</p>
                    <p className="bg-nft-text-gradient bg-clip-text text-transparent text-nft-text-gradient text-[12px] font-montserrat font-semibold">Luxury</p>
                    </div>
                </div>
            </div>
            </>
        )}
           <div className="flex items-center gap-2 ">
            <Checkbox className=" bg-success-521 checked:bg-success-521 "/>
            <p className="font-mulish text-[10px]">I agree to the <Link href = '/abcdr'><span className="underline text-success-522 font-bold">INSURANCE</span></Link></p>
           </div>

           <div className="flex flex-col border-2 border-success-511 p-4 gap-5">
            <div className="flex justify-between">
                <p className="text-black font-montserrat font-semibold">Your Balance</p>
                <p className="text-black font-montserrat font-semibold">0.55 {currencyText}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-black font-montserrat font-semibold">NFT Price</p>
                <p className="text-black font-montserrat font-semibold">0.9 {currencyText}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-black font-montserrat font-semibold">Insurance Price</p>
                <p className="text-black font-montserrat font-semibold">1.02 {currencyText}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-black font-montserrat font-semibold">Total Price</p>
                <p className="text-black font-montserrat font-semibold">1.11 {currencyText}</p>
            </div>
            <div className="self-center">
                <Link href='/abcdef'><button className="font-montserrat text-white font bold bg-nft-text-gradient py-4 px-28 text-[22px] font-bold rounded-xl ">Buy</button></Link>
            </div>
           </div>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        </div>
      </DialogContent>
    </Dialog>
  )
}
