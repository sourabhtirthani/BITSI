"use client"
 
import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
 
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
 
const currencies = [
  {
    value: "MATIC",
    label: "MATIC",
  },
  {
    value: "USDT",
    label: "USDT",
  },
]

const ComboBoxPriceCurency = ({setCurrency} : {setCurrency :React.Dispatch<React.SetStateAction<string>>}) => {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("MATIC")
    return (
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[120px] flex items-center  h-[50.1px] font-bold  bg-white hover:bg-white justify-between" style={{borderRadius : '0.40rem'}}>
              {value}
              <ChevronDown className=" font-bold h-5 w-5 shrink-0 " />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-fit p-0 rounded-xl border-none">
            <Command>
             
              <CommandList>
               
                <CommandGroup className="bg-white w-[100px]  rounded-xl font-manrope font-bold">
                  {currencies.map((currency) => (
                    <CommandItem
                      key={currency.value}
                      value={currency.value}
                      onSelect={(currentValue) => {
                        setCurrency(currentValue === value ? currentValue : currentValue)
                        setValue(currentValue === value ? currentValue : currentValue)
                        setOpen(false)
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === currency.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {currency.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      )
    }

export default ComboBoxPriceCurency