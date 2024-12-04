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
const DialogCoinProtection = ({buttonText , action , handleMethodCall , coinInsuranceId , setRefresh, dialogTitle , dialogDescription , loaderActionButton, numberOfCoins } : {buttonText: string , action : string ,handleMethodCall : (id : number , setRefresh : React.Dispatch<React.SetStateAction<boolean>> , numberOfCoins : number)=>void , coinInsuranceId : number , setRefresh : React.Dispatch<React.SetStateAction<boolean>> , dialogTitle : string , dialogDescription : string , loaderActionButton : boolean , numberOfCoins : number  }) => {
    const [open , setOpen] = useState<boolean>(false)
    // const [loaderBuy , setLoaderBuy] = useState(false);
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
                        <button onClick={()=>{handleMethodCall(coinInsuranceId , setRefresh , numberOfCoins)}} disabled={loaderActionButton} className={`${loaderActionButton == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderActionButton == true ? 'Loading..' : 'Proceed'}</button>
                        <button onClick={handleDecline} className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>

                    </div>
                </DialogFooter>
            
        </DialogContent>
            </Dialog>
  )
}
export default DialogCoinProtection
// export default DialogAdminCoinProtection