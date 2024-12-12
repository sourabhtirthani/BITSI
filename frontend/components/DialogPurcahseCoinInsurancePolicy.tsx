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
import { purchaseCoinInsurance } from '@/actions/coins';
import { toast } from './ui/use-toast';
import { getTransactionFromHashOnPolygon } from '@/lib/getTransactionFromHash';

const DialogPurcahseCoinInsurancePolicy = ({ buttonText, insuranceType, coindId, maxCoinsAvailable, userAddress, setRefresh }: { buttonText: string, insuranceType: 'new' | 'existing', coindId: number, maxCoinsAvailable: number, userAddress: string, setRefresh: React.Dispatch<React.SetStateAction<boolean>> }) => {
    const [open, setOpen] = React.useState(false);
    const [loaderBuy, setLoaderBuy] = useState(false);
    const handleFormSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        try {
            setLoaderBuy(true);
            const form = e.currentTarget as HTMLFormElement;
            const formData = new FormData(form);
            console.log(formData)
            console.log(`the value of the token is : ${formData.get('numberOfCoins')}`)
            // const getCurrentCoinDetails = await fetch(`https://api.dexscreener.com/latest/dex/tokens/0x628211398E10a014826bc7d943a39b2cE6126D72`, { method: 'GET' });
            // const getCurrentCoinDetailsParsed = await getCurrentCoinDetails.json();
            // const currentCoinPrice = getCurrentCoinDetailsParsed.pairs[0].priceUsd;
            const currentCoinPrice = 0.01625;
            const waitForRandomTransaction =  await getTransactionFromHashOnPolygon('0x03e1e800e92057ab38074e90932f1b1c8cc8d5a2b4b8c2727c8744aacf104e0e');
            console.log(waitForRandomTransaction);
            throw new Error('hello')
            const purchaseInsurance = await purchaseCoinInsurance(coindId, userAddress, Number(formData.get('numberOfCoins')), Number(currentCoinPrice));
            if (purchaseInsurance.success == true) {
                toast({ title: "Operation Success", description: "Successfully Purchased Policy", duration: 2000, style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope' } });
                setOpen(false);

            }
            setRefresh(prev => !prev);
        } catch (error) {
            toast({ title: "Error", description: "Error Purchasing Insurance", duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope' } })
            console.log(error);
        } finally {
            setLoaderBuy(false)
            setOpen(false);
        }
    }

    const handleFormSubmitExistingPolicy = () => {
        try {

        } catch (error) {
            console.log(`error in purchasing exisitng policy`);
            console.log(error)
        }
    }

    const handleDecline = () => {
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
                    <DialogDescription>Click Purchase to submit your request. Upon approval, coverage of up to 2 years will be provided, with payment due after approval.</DialogDescription>
                    <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 max-md:gap-2'>
                        <DialogDescription>Please enter the number of coins you wish to purchase</DialogDescription>
                        <input placeholder='Enter Number of coins' type='number' name='numberOfCoins' required step='0.001' min='0' max={maxCoinsAvailable} className='p-3 no-spinners w-full rounded small-border ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.validity.rangeOverflow) { e.target.setCustomValidity(`Maximum of ${maxCoinsAvailable} coins are available of insurance`); } }} />
                        <DialogFooter>
                            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
                                <button type='submit' disabled={loaderBuy} className={`${loaderBuy == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Purchase'}</button>
                                <button onClick={handleDecline} className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>

                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            }

            {insuranceType == 'existing' &&
                <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                    <DialogHeader>
                        <DialogTitle className="font-manrope">Purchase This Policy</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Purchasing insurance policy will result in the addition of insurance coverage for up to 2 years.</DialogDescription>
                    <form onSubmit={handleFormSubmitExistingPolicy} className='flex flex-col gap-4 max-md:gap-2'>
                        <DialogDescription>Please enter the number of coins you wish to purchase</DialogDescription>

                        <DialogFooter>
                            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
                                <button type='submit' disabled={loaderBuy} className={`${loaderBuy == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Purchase'}</button>
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