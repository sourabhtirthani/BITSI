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
import { showToastUI } from '@/lib/utils'
import { useAccount, useWriteContract } from 'wagmi'
import { creditNoteContractABI, creditNoteContractAddress } from '@/lib/creditContract'
import { readContract , waitForTransactionReceipt } from '@wagmi/core'
import { config } from '@/config'
import { increaseCreditScore } from '@/actions/users'
import { coinContractAbi, coinContractAddress } from '@/lib/coinContract'
import { getTransactionFromHash } from '@/lib/getTransactionFromHash'
// , setLoaderActionButton : React.Dispatch<React.SetStateAction<boolean>>
const DialogBuyCoinFromSpecificPlace = () => {
    const { address, isConnected } = useAccount();
    const { writeContractAsync } = useWriteContract()
    const [open, setOpen] = useState<boolean>(false)
    const [numberOfCoins, setNumberOfCoins] = useState<number | null>(null)
    const [loaderActionButton, setLoaderActionButton] = useState(false);

    const handleSubmitClick = async (event: React.SyntheticEvent) => {
        try {
            if (!address) {
                showToastUI({ title: "Error", description: 'Please Connect Wallet To Proceed', operation: "fail" });
                return;
            }
            event.preventDefault();
            setLoaderActionButton(true);
            const form = event.currentTarget as HTMLFormElement;
            const formData = new FormData(form);
            const quantityCoins = formData.get('quantityCoins') as string;
            console.log(quantityCoins)
            console.log('in here before')
            const tokenPriceFromContract = await readContract(config, {
                abi: creditNoteContractABI,
                address: creditNoteContractAddress,
                functionName: 'tokenPrice'
            })
            // const tokenPriceToBeSent = BigInt(tokenPriceFromContract as bigint); 
            // const valueToSend = BigInt(quantityCoins) * tokenPriceToBeSent;
            const tokenPrice = Number(tokenPriceFromContract as string)/10**18;
            // console.log(`the token price is : ${tokenPrice}`)
            const valueToSend = Number(quantityCoins) * tokenPrice;
            // console.log(`the value to be sent is : ${valueToSend}`)
            // const valueInWei = valueToSend * BigInt(10**18);  
            // const maxUint256 = BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935"); 
            // console.log(`the credit note contract address is : ${creditNoteContractAddress}`)
            // const approveTx = await writeContractAsync({
            //     address: coinContractAddress,
            //     abi: coinContractAbi,
            //     functionName: "approve",
            //     args: [creditNoteContractAddress,  maxUint256], 
            //   });
            //   const transactionReceipt = await waitForTransactionReceipt(config, {
            //     hash: approveTx, 
            //   })
            // //   await new Promise(resolve => setTimeout(resolve, 10000));
            //   await getTransactionFromHash(approveTx);
              console.log('in here after approve')
            const transaction = await writeContractAsync({
                address: creditNoteContractAddress,
                abi: creditNoteContractABI,
                functionName: 'buyTokens',
                args:  [BigInt(Number(quantityCoins))],
                value: BigInt(valueToSend*10**18)
            });
            
            if (transaction) {
                await increaseCreditScore(address as string, tokenPrice * Number(quantityCoins)); // this sets the new credit score
            }
        
            showToastUI({ title: "Success", description: 'Coins Purchased', operation: "success" });
        } catch (error) {
            console.log(error);
            showToastUI({ title: "Error", description: 'Error Purchasing Coins', operation: "fail" });
        } finally {
            setLoaderActionButton(false);
        }

    }
    // const [loaderBuy , setLoaderBuy] = useState(false); // also pass this open dialog and setopen dialog as prop 
    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild >
                <button className='hover:underline text-success-511'>Trade Now</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                <DialogHeader>
                    <DialogTitle className="font-manrope">Purchase Bitsi Coin</DialogTitle>
                </DialogHeader>
                <form className='flex flex-col w-full gap-3' onSubmit={handleSubmitClick}>
                    Please Enter the number of BITSI Coin you want to purchase
                    <input type='number' required min={1} id='quantityCoins' name='quantityCoins' placeholder='' className='no-spinners w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' value={numberOfCoins ?? ""} onChange={(event) => setNumberOfCoins(Number(event.target.value))} />
                    {/* <input type='number' name='mobile' placeholder='Mobile Number (Optional)' className='no-spinners ' /> */}

                    <DialogFooter>
                        <div className="flex gap-6 text-[20px]  text-black font-medium  ">
                            <button type='submit' disabled={loaderActionButton} className={`${loaderActionButton == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderActionButton == true ? 'Loading..' : 'Proceed'}</button>
                            <button onClick={() => { setOpen(false) }} className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>

                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
export default DialogBuyCoinFromSpecificPlace