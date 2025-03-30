"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, X , ChevronDown} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Image from "next/image"
import { DropdownProps } from "@/types"
// { items , buttonName , setValue  }: { items: DropdownProps[]  , buttonName : string , setValue : Dispatch<SetStateAction<string>>}
export function CollapsibleBitsiNft({items , btnName , setValue , insuranceFilters = false } : { items: DropdownProps[]  , btnName : string , setValue : React.Dispatch<React.SetStateAction<string>> , insuranceFilters? : boolean}) {
  const [isOpen, setIsOpen] = React.useState(false)
  const handleClick = (nameToSet : string)=>{
    setValue(nameToSet);
  }
  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className=" space-y-2"
    >
        <div className="flex items-center justify-between space-x-4 px-4 ">
        <h4 className="text-[20px] font-semibold ">
         {btnName}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="space-y-2 ">
      {!insuranceFilters && items.map((item) => (
          <div key={item.id} className="flex gap-2 hover:bg-gray-800 hover:rounded-2xl hover:text-white">
            <div className=" flex gap-2 px-2">
            <Image src={item.icon} height={20} width={20} alt='logo' />
            <span className="text-[13px] cursor-pointer" onClick = {()=>{handleClick(item.name)}}>{item.name}</span></div>
          </div>
        ))}
        {insuranceFilters && (
         <RadioGroup >
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-2 ml-1 hover:bg-gray-800 hover:rounded-2xl hover:text-white">
           
            <RadioGroupItem value={Number(item.id).toString()} id={Number(item.id).toString()} />
            <Label htmlFor={Number(item.id).toString()} className="text-black font-manrope text-[13px] cursor-pointer">{item.name}</Label>
            
          </div>
        ))}
        </RadioGroup>)
        }
      </CollapsibleContent>
    </Collapsible>
  )
}
