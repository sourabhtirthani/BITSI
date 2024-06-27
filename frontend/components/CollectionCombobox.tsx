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

const collectionValues = [
  {
    value: "Collection1",
    label: "Collection1",
  },
  {
    value: "Collection2",
    label: "Collection2",
  },
  {
    value: "Collection3",
    label: "Collection3",
  },
  {
    value: "Collection4",
    label: "Collection4",
  },
  {
    value: "Collection5",
    label: "Collection5",
  },
]

export function CollectionCombobox({setCollectionValue} : { setCollectionValue: React.Dispatch<React.SetStateAction<string>> }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* button to run the combox here  */}<button id="collection" name="collection" className="w-full font-manrope font-bold text-[17px] bg-white  py-3">{value == "" ? 'Select From Collection' : value}</button>
      </PopoverTrigger>
      <PopoverContent className="w-full  bg-white p-0">
        <Command>
          <CommandInput placeholder="Search Or Create a new Collection" />
          <CommandList>
            <CommandEmpty  onClick={()=>{console.log('create a new Collection clicked')}}>+ Create a new Collection</CommandEmpty>
            <CommandGroup>
                <CommandItem>+ Create a new Collection</CommandItem>
              {collectionValues.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setCollectionValue(currentValue === value ? "" : currentValue) 
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
