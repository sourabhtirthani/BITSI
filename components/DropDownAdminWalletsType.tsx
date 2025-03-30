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
 

 
export function DropdownAdminWalletsType({selectedOption , setSelectedOption} : {selectedOption : string ,  setSelectedOption: (value: string) => void}) {
    // const [position, setPosition] = React.useState("")
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex justify-between  px-2 py-2 black-border">
        <button className="text-black font-manrope font-bold ">{selectedOption == "" ? <span>Select&nbsp;Type</span> : <span>{selectedOption} WALLET</span>}</button>
       <ChevronDown />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="pr-28 max-sm:pr-24 bg-white font-manrope font-semibold">
        <DropdownMenuLabel>Available&nbsp;Types</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selectedOption} onValueChange={setSelectedOption}>
          <DropdownMenuRadioItem value="MINT">MINT</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="COMPENSATION">COMPENSATION</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="OWNER">OWNER</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}