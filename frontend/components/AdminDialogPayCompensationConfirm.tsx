'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useWriteContract , useAccount } from 'wagmi'
import { useToast } from "@/components/ui/use-toast"
import { compensateUser, declineCompensation } from "@/actions/uploadNft"
import { insuraceContractAddress, insuranceContractABI } from "@/lib/insuranceContract"
import { useState } from "react"
 
export function AdminDialogPayCompensationConfirm({amount , userAddress , idOfNft, compensationId} : {amount : number , userAddress : string , idOfNft : number , compensationId : number}) {
  const { writeContractAsync } = useWriteContract()
  const [open, setOpen] = useState(false)
  const {address} = useAccount();
  const [textPay , setTextPay] = useState('Pay')
  const [textDecline , setTextDecline] = useState('Decline')
  const { toast } = useToast();
  const [loaderForPay , setLoaderForPay] = useState(false);
  
    const handleClick = async()=>{
      try{
        setTextPay('Loading....')
      if(address != process.env.NEXT_PUBLIC_ADMIN_ADDRESS){
        toast({
          title: "Admin Wallet Not Connected", description: 'Only admins can claim compensation', duration: 2000,
          style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
        })
        console.log('in here')
        return;
      }
      const compensationPriceInWei = Number(Math.floor(parseFloat(amount.toString()) * 10 ** 18));
      console.log(`compensationId is ${compensationId}`)
      console.log(`compens price is : ${compensationPriceInWei} and price normal is ${amount}`)
      console.log(`user Address is : ${userAddress}`)
      const transaction = await writeContractAsync({
        address: insuraceContractAddress,
        abi: insuranceContractABI,
        functionName: 'approveCompensation',
        args: [idOfNft, compensationPriceInWei, userAddress], 
      });
      if(transaction){
      const res =   await compensateUser(compensationId)
       if(res.success){
        toast({title: "Operation Success",description: "Successfully Compensated the user",duration: 2000,
          style: {backgroundColor: '#4CAF50',color: 'white',fontFamily: 'Manrope',}})
       }
      }
      setOpen(false)
      // document.getElementById('closeDialog')?.click();
    }catch(error){
      console.log(error);
      toast({
        title: "Error in Compensation", description: 'Error compensating the user', duration: 2000,
        style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
      })
    }finally{
      setLoaderForPay(true);
      setOpen(false)
      setTextPay('Pay')
      window.location.reload();
    }
    }

    const handleDecline = async()=>{
      try{
        setTextDecline('Loading..')
        if(address != process.env.NEXT_PUBLIC_ADMIN_ADDRESS){
          toast({
            title: "Admin Wallet Not Connected", description: 'Only admins can claim compensation', duration: 2000,
            style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
          })
          console.log('in here')
          return;
        }
        const res = await declineCompensation(compensationId);
        if(res.success){
          toast({title: "Operation Success",description: "Successfully declined Compensation for the user",duration: 2000,
            style: {backgroundColor: '#4CAF50',color: 'white',fontFamily: 'Manrope',}})
         }
      }catch(error){
        console.log(error);
        toast({
          title: "Error occured", description: 'Error occured while declining the user ', duration: 2000,
          style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
        })
      }finally{
        setTextDecline('Decline')
        window.location.reload();
      }
    }
  return (
    <Dialog  open = {open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-success-511 text-[15px] font-bold font-manrope max-sm:text-[12px] max-sm:p-0.5">Compensate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-sm:max-w-[320px] bg-white">
        <DialogHeader>
          <DialogTitle>Compensation</DialogTitle>
        </DialogHeader>
          <DialogDescription className="overflow-x-auto ">
            You are about to pay compensation of {amount} to the user {userAddress}
          </DialogDescription>
        <DialogFooter>
            <div className="flex gap-6 text-[20px]  text-black font-bold font-manrope">
         <button onClick={handleClick} className="bg-success-531 px-8 rounded-xl">{textPay}</button>
        <DialogClose asChild>
         <button onClick={handleDecline}  className="bg-success-530 px-8 rounded-xl">{textDecline}</button>
            </DialogClose>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}