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

export function DialogInsuranceOptions({ buttonName, nameOfClass  } : {buttonName : string , nameOfClass : string} ) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className= {nameOfClass}>{buttonName}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white ">
        <DialogHeader>
          <DialogTitle className="text-black font-montserrat  font-bold mb-4">Choose anyone To proceed</DialogTitle>
          <DialogDescription >
          <DialogInsuranceRadioGroup />
          </DialogDescription>
        </DialogHeader>
        
      </DialogContent>
    </Dialog>
  )
}
