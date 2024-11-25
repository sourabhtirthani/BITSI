'use client'
import React , {useState} from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,

} from "@/components/ui/dialog"
import {  purchaseCoinInsurance } from '@/actions/coins';
import { toast } from './ui/use-toast';

const DialogPurcahseCoinInsurancePolicy = ({buttonText , insuranceType ,coindId, maxCoinsAvailable, userAddress , setRefresh} : {buttonText : string , insuranceType : 'new' | 'existing' , coindId : number , maxCoinsAvailable : number , userAddress : string , setRefresh : React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [open, setOpen] = React.useState(false);
    const [loaderBuy , setLoaderBuy] = useState(false);
    const handleFormSubmit = async (e: React.SyntheticEvent)=>{
        try{
        setLoaderBuy(true);
        e.preventDefault();
        const form = e.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        console.log(formData)
        console.log(`the value of the token is : ${formData.get('numberOfCoins')}`)
        const purchaseInsurance = await purchaseCoinInsurance(coindId , userAddress , Number(formData.get('numberOfCoins')));
            if(purchaseInsurance.success == true){
                toast({title: "Operation Success", description: "Successfully Purchased Policy", duration: 2000, style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope'}});
                setOpen(false);
                
            }
            setRefresh(prev => !prev);
        }catch(error){
            toast({title: "Error", description: "Error Purchasing Insurance", duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope'}})
            console.log(error);
        }finally{
            setLoaderBuy(false)
            setOpen(false);
        }
    }

    const handleDecline = ()=>{
        setOpen(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild >
                <button className='text-success-511 max-sm:text-[12px] hover:underline w-fit cursor-pointer px-4 font-semibold font-manrope text-[16px]'>{buttonText}</button>
            </DialogTrigger>
            {insuranceType == "new" && 
            <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                <DialogHeader>
                    <DialogTitle className="font-manrope">Purchase New Insurance Policy</DialogTitle>
                </DialogHeader>
                <DialogDescription>Purchasing a new insurance policy will result in the addition of insurance coverage for up to 2 years.</DialogDescription>
                <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 max-md:gap-2'>
                <DialogDescription>Please enter the number of coins you wish to purchase</DialogDescription>
                    <input placeholder='Enter Number of coins' type = 'number' name = 'numberOfCoins' required  step='0.001' min='0' max={maxCoinsAvailable}  className='p-3 no-spinners w-full rounded small-border ' onInput={(e : React.ChangeEvent<HTMLInputElement>)=>{if(e.target.validity.rangeOverflow){ e.target.setCustomValidity(` ${maxCoinsAvailable} coins are available of insurance`);}}} /> 
                <DialogFooter>
                    <div className="flex gap-6 text-[20px]  text-black font-medium  ">
                        <button type='submit' disabled={loaderBuy} className={`${loaderBuy == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Buy'}</button>
                        <button onClick={handleDecline} className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>

                    </div>
                </DialogFooter>
                </form>
            </DialogContent> 
}
        </Dialog>
    )
}

export default DialogPurcahseCoinInsurancePolicy