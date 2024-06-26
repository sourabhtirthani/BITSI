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
import { nftData } from "@/types"
// code is currently not used anywhere
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
]

export function AutoCOmpletePopover({filteredLstOfNfts , listOfNFts} : {filteredLstOfNfts : nftData[] , listOfNFts : nftData[]}) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-fit bg-red-300 hover:bg-red-600 justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Search For NFTs here"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search NFts..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
                <div className="bg-white">
            {listOfNFts.map((item , index)=>{
                return (
                    <CommandItem  key={index} className=" hover:bg-red-500">
                        <span  >{item.name}</span>
                    </CommandItem>
                )
            })}
            </div>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
