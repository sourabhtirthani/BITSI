'use client'
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
import { useState } from "react"

export function DialogBuy({totalItems , lstOfItems , buttonName, showSelectedItem , nameOfClass , currencyText , nameOfNft , imgSrc , collectionName , nftPrice , royalty } : buyNftDialogProps ) {
  // console.log(lstOfItems)
  // const numberArray: number[] = stringArray.map(Number);
  const [isLoading , setIsLoading] = useState(false);

  const handleBuyClick = async()=>{
    setIsLoading(true);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className= {nameOfClass}>{buttonName}</button>
      </DialogTrigger>
      <DialogContent  className="sm:max-w-[370px] bg-white ">
        <DialogHeader>
          <DialogTitle className="text-black font-montserrat  font-bold">Checkout</DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
          {!showSelectedItem &&( <p className="font-semibold text-black font-montserrat ">Total NFTs - {totalItems}</p>)}
          {showSelectedItem && (<>
            <p className="font-semibold text-black font-montserrat ">Selected Item:</p>
            <div className="flex items-center p-3 border-2 border-success-511 gap-3">
                <Image src = {imgSrc || ''} height={63.48} width={70} alt="nft image" className="w-[70px] h-[65px]" />
                <div className="flex flex-col gap-2">
                    <p className="text-black font-manrope font-bold text-[22px]">{nameOfNft}</p>
                    <div className="flex">
                    <p className="text-black text-[12px] font-montserrat font-semibold">Royality&nbsp;</p>
                    <p className=" bg-nft-text-gradient bg-clip-text text-transparent text-[12px] font-montserrat font-semibold">{royalty}%&nbsp;</p>
                    <p className="text-black text-[12px] font-montserrat font-semibold">Collection&nbsp;</p>
                    <p className="bg-nft-text-gradient bg-clip-text text-transparent text-nft-text-gradient text-[12px] font-montserrat font-semibold">{collectionName}</p>
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
                <p className="text-black font-montserrat font-semibold">{nftPrice} {currencyText}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-black font-montserrat font-semibold">Insurance Price</p>
                <p className="text-black font-montserrat font-semibold">1.02 {currencyText}</p>
            </div>
            <div className="flex justify-between">
                <p className="text-black font-montserrat font-semibold">Total Price</p>
                <p className="text-black font-montserrat font-semibold">1.11 {currencyText}</p>
            </div>
            <div className="self-center w-full">
                <button onClick={handleBuyClick} disabled = {isLoading}  className={`${isLoading ? 'bg-gray-300 ' : 'bg-nft-text-gradient '} font-montserrat w-full flex justify-center text-white font bold  py-4  text-[22px] font-bold rounded-xl `}>{isLoading ? <div className="spinner mr-2 "></div> : 'Buy' }</button>
            </div>
           </div>
          </DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  )
}
{/* <button onClick={handleMintNft} disabled={isLoading} className={` ${isLoading ? ' bg-gray-300 w-full flex justify-center' : 'bg-nft-text-gradient'} font-montserrat text-white font bold w-full py-4  text-[22px]  font-bold rounded-xl `}>{isLoading ? <div className="spinner mr-2 "></div> : 'Buy'}</button> */}