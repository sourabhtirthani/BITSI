"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Image from "next/image"
import { useRouter } from 'next/navigation';

const collectionValues = [
  {
    value: "Collection1",
    label: "Collection1",
    id: "1"
  },
  {
    value: "Collection2",
    label: "Collection2",
     id: "2"
  },
  {
    value: "Collection3",
    label: "Collection3",
     id: "3"
  },
  {
    value: "Collection4",
    label: "Collection4",
     id: "4"
  },
  {
    value: "Collection5",
    label: "Collection5",
     id: "5"
  },
]

export function CollectionCombobox({setCollectionValue , setCollectionId} : { setCollectionValue: React.Dispatch<React.SetStateAction<string>>, setCollectionId: React.Dispatch<React.SetStateAction<string>>  }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("");
  const { push } = useRouter();

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className="w-full">
        <div className="w-full flex justify-between px-3 bg-white">
        {/* button to run the combox here  */}<button id="collection" name="collection" className="font-manrope font-bold text-[17px] bg-white  py-3">{value == "" ? 'Select From Collection' : value}</button>
        <Image src = "/icons/CollectionDropDownIcon.svg"  height={9.21} width={16} alt="dropdown button"/></div>
      </PopoverTrigger>
      <PopoverContent className="w-full  bg-white p-0">
        <Command >
          <CommandInput placeholder="Search Or Create a new Collection" />
          <CommandList className="max-h-[150px]  overflow-y-auto table-body">
            <CommandEmpty className="relative flex hover:bg-gray-300 cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-accent data-[selected=true]:text-accent-foreground data-[disabled=true]:opacity-50"
             onClick={()=>{push('/create-collection')}}>+ Create a new Collection</CommandEmpty>
            <CommandGroup>
                <CommandItem onSelect={()=>{push('/create-collection')}}>+ Create a new Collection</CommandItem>
              {collectionValues.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setCollectionValue(currentValue === value ? "" : currentValue) 
                    setCollectionId(framework.id)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
