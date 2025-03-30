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
    const [walletName , setWalletName] = React.useState('');
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between  px-2 py-2 black-border bg-white">
        <button className="text-black max-md:text-[12px] font-manrope font-bold ">{selectedOption == "" ? <span>Select&nbsp;Wallet</span> : <span>{walletName}</span>}</button>
       <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" bg-white font-manrope font-semibold ">
        <DropdownMenuLabel>Available Wallets</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedOption} onValueChange={setSelectedOption}>
            {Array.isArray(allData) && allData && allData.map((item , index)=>{
                return (
                  <div key={index} onClick={()=>{setWalletName(item.name)}} className="w-full pr-24 max-h-[220px] overflow-y-auto table-body">
                    <DropdownMenuRadioItem  className="max-md:text-[12px]" value={item.address} >{item.name}</DropdownMenuRadioItem>
                    </div>
                )
            })}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}