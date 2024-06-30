"use client"

import * as React from "react"
import { ChevronsUpDown, Plus, X , ChevronDown} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import Image from "next/image"
import { DropdownProps } from "@/types"
// { items , buttonName , setValue  }: { items: DropdownProps[]  , buttonName : string , setValue : Dispatch<SetStateAction<string>>}
export function CollapsibleBitsiNft({items , btnName , setValue } : { items: DropdownProps[]  , btnName : string , setValue : React.Dispatch<React.SetStateAction<string>>}) {
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
        <div className="flex items-center justify-between space-x-4 px-4">
        <h4 className="text-sm font-semibold">
         {btnName}
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent className="space-y-2">
      {items.map((item) => (
          <div key={item.id} className="flex gap-2 ">
            <div className="hover:bg-gray-500 flex gap-2">
            <Image src={item.icon} height={20} width={20} alt='logo' />
            <span onClick = {()=>{handleClick(item.name)}}>{item.name}</span></div>
          </div>
        ))}
      </CollapsibleContent>
    </Collapsible>
  )
}
