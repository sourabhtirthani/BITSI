'use client'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"
import { toast } from './ui/use-toast';
// , setLoaderActionButton : React.Dispatch<React.SetStateAction<boolean>>
const DialogGeneric = ({buttonText , handleMethodCall , id , setRefresh, dialogTitle , dialogDescription , loaderActionButton , handleRejectMethod} : {id : number , buttonText: string ,handleMethodCall : (id : number , setRefresh : React.Dispatch<React.SetStateAction<boolean>>)=>void , setRefresh : React.Dispatch<React.SetStateAction<boolean>> , dialogTitle : string , dialogDescription : string , loaderActionButton : boolean , handleRejectMethod : (id : number , setRefresh : React.Dispatch<React.SetStateAction<boolean>>)=>void}) => {
    const [open , setOpen] = useState<boolean>(false)
    // const [loaderBuy , setLoaderBuy] = useState(false); // also pass this open dialog and setopen dialog as prop 
    const handleDecline = ()=>{
        setOpen(false)
    }
  return (
    <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild >
                <button className='text-success-511 max-sm:text-[12px] hover:underline w-fit cursor-pointer px-4 font-semibold font-manrope text-[16px]'>{buttonText}</button>
            </DialogTrigger>
          
            <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
            <DialogHeader>
                <DialogTitle className="font-manrope">{dialogTitle}</DialogTitle>
            </DialogHeader>
            <DialogDescription>{dialogDescription}</DialogDescription>
                {/* <input placeholder='Enter Number of coins' type='number' name='numberOfCoins' required step='0.001' min='0' max={maxCoinsAvailable} className='p-3 no-spinners w-full rounded small-border ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.validity.rangeOverflow) { e.target.setCustomValidity(`Maximum of ${maxCoinsAvailable} coins are available of insurance`); } }} /> */}
                <DialogFooter>
                    <div className="flex gap-6 text-[20px]  text-black font-medium  ">
                        <button onClick={()=>{handleMethodCall(id , setRefresh)}} disabled={loaderActionButton} className={`${loaderActionButton == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderActionButton == true ? 'Loading..' : 'Proceed'}</button>
                        <button onClick={()=>{handleRejectMethod(id , setRefresh)}} className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>

                    </div>
                </DialogFooter>
            
        </DialogContent>
            </Dialog>
  )
}
export default DialogGeneric
// export default DialogAdminCoinProtection