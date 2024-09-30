"use client"

import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Image from "next/image"
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronDown } from "lucide-react"
import { AllEventsLstProps, DropDownAdminViewAnalyseFiltersProps } from "@/types"
import { AdminFilterViewAnalyseDateRangeFilter } from "./AdminFilterViewAnalyseDateRangeFilter"

export function DropDownAdminViewAnalyseFilters({allEventsLst , selectedFilter , setSelectedFilter, btnNameFirst , eventsInsuranceEvents , selectedTab} : DropDownAdminViewAnalyseFiltersProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  // const [openDialog , setOpenDialog] = React.useState(false)
  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
            <Image src = '/icons/sort-icon-filter.svg' height={50} width={50} alt = 'drowpdown'  />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white max-h-[200px] overflow-y-auto table-body">
        <DropdownMenuLabel>Filters</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className=" space-y-2  ">
        <div className="flex items-center justify-between space-x-4 px-4 ">
        <h4 className="text-[20px] font-semibold ">
         {btnNameFirst}
        </h4>
        
        <CollapsibleTrigger asChild className="flex flex-col">
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className="h-6 w-6" />
          </Button>
        </CollapsibleTrigger>
        </div>
        <CollapsibleContent className="space-y-2 flex flex-col ">
        {selectedTab == 'Nft Events' && <>
            {allEventsLst.map((item, index)=>{
                return (
                    <DropdownMenuRadioGroup key={index}  value={selectedFilter} onValueChange={setSelectedFilter} className="font-bold font-manrope">
                         <DropdownMenuRadioItem value={item.name}>{item.name}</DropdownMenuRadioItem>
                         </DropdownMenuRadioGroup>
                )
            })}
            </>}
            {selectedTab == 'Insurance Events' && <>
            {eventsInsuranceEvents.map((item, index)=>{
                return (
                    <DropdownMenuRadioGroup key={index}  value={selectedFilter} onValueChange={setSelectedFilter} className="font-bold font-manrope">
                         <DropdownMenuRadioItem value={item.name}>{item.name}</DropdownMenuRadioItem>
                         </DropdownMenuRadioGroup>
                )
            })}
            </>}
        </CollapsibleContent>
      
        </Collapsible>
        
       
         
       
        
        <DropdownMenuSeparator />
      </DropdownMenuContent>

    </DropdownMenu>
  )
}
