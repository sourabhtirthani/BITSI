"use client"
 
import * as React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Check, ChevronDown } from "lucide-react"
import Image from "next/image"
import { AdminWalletMintProps } from "@/types"
 

 
export function DropDownAdminWalletList({selectedOption , setSelectedOption , allData} : {selectedOption : string ,  setSelectedOption: (value: string) => void , allData : AdminWalletMintProps[]}) {
    // const [position, setPosition] = React.useState("")
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between  px-2 py-2 black-border bg-white">
        <button className="text-black max-md:text-[12px] font-manrope font-bold ">{selectedOption == "" ? <span>Select&nbsp;Wallet</span> : <span>{selectedOption}</span>}</button>
       <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:pr-28  bg-white font-manrope font-semibold ">
        <DropdownMenuLabel>Available Wallets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            {allData.map((item , index)=>{
                return (
                    <DropdownMenuRadioItem className="max-md:text-[12px]" value={item.address} key={index}>{item.address}</DropdownMenuRadioItem>
                )
            })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}