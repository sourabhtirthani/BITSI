'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buyNftDialogProps } from "@/types"
import  Checkbox  from "./Checkbox1"
import Link from "next/link"
import Image from 'next/image'
import { DialogInsuranceRadioGroup } from "./DialogInsuranceRadioGroup"
import { useState } from "react"

export function DialogInsuranceOptions({ buttonName, nameOfClass , redirectTo , helpText} : {buttonName : string , nameOfClass : string , redirectTo : string[], helpText : string} ) {
  const [hoverOn , setHoverOn] = useState(false)
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="relative" onMouseEnter={() => setHoverOn(true)} 
          onMouseLeave={() => setHoverOn(false)}>
          {hoverOn && <div className="absolute secondary-shadow11 w-[250px] max-md:w-[0px] max-md:h-[0px] bottom-14 text-center shadow-md font-mono font-bold rounded-3xl py-2 px-4 w bg-white cursor-ponter"><p className="inline-block">{helpText}</p></div>}
        <button className= {nameOfClass}>{buttonName}</button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white ">
        <DialogHeader>
          <DialogTitle className="text-black font-montserrat  font-bold mb-4">Choose anyone To proceed</DialogTitle>
          <DialogDescription >
          <DialogInsuranceRadioGroup redirectTo={redirectTo} />
          </DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  )
}
