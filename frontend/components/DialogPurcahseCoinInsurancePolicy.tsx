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
import { set } from 'date-fns';
import { ChevronDown } from 'lucide-react';
//this component is so far used at only one place -> in the protection table in the purcahse seciton for coins
//this component only reqeusts for a new purchase for coin insurance
const DialogPurcahseCoinInsurancePolicy = ({    userAddress, setRefresh, transactionId, numberOfCoins, totalAmountSpent, setRefreshCoinInsurance }: {   userAddress: string, setRefresh: React.Dispatch<React.SetStateAction<boolean>> , transactionId : number, numberOfCoins : number , totalAmountSpent : number, setRefreshCoinInsurance : React.Dispatch<React.SetStateAction<boolean>>}) => {
  console.log("transactionId neww",transactionId);  
  const [open, setOpen] = React.useState(false);
    const [numberOfYears , setNumberOfOfYears] = useState(0);
    const [openDrowdown ,setOpenDropdown] = useState(false);

    const [loaderBuy, setLoaderBuy] = useState(false);


    const toggleDropdown = () => setOpenDropdown(!openDrowdown);

      const purchaseRequest = async (id: Number,address:String) => {
    
        try {
          const response = await fetch(`/api/userzone/insurance/purchase/coin/${address}`, {
            method: "POST",  // Ensure it's "POST"
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: 1, id: id }),
          });
    
          if (response.status) {
            //showToastUI({ title: "Success", description: "Request submitted successfully", operation: "success" });
          }
    
          console.log("Response Status:", response.status);
    
          const data = await response.json();
          console.log("Response Data:", data);
    
        } catch (error) {
          console.error("Fetch Error:", error);
        }
      };

    const requestHandleBuyNewCoinInsurancePolicy = async()=>{
        try{   
            setLoaderBuy(true);
            console.log("transactionId",transactionId);
            const requestPurchaseCoinInsurance = await purchaseCoinInsurance( userAddress , numberOfCoins ,totalAmountSpent, transactionId , numberOfYears);
            await purchaseRequest(transactionId,userAddress)
            if(requestPurchaseCoinInsurance.success == true){
                setRefresh(prev => !prev);
                setRefreshCoinInsurance(prev => !prev);
                toast({ title: "Operation Success", description: "Successfully Purchased Policy", duration: 2000, style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope' } });
                setOpen(false);

             }

        }catch(error){
            console.log(error)
            toast({title: "Error occured", description: 'Internal server error', duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},});
        }finally{
            setLoaderBuy(false);
        }
    }
    // const handleFormSubmit = async (e: React.SyntheticEvent) => {
    //     e.preventDefault();
    //     try {
    //         setLoaderBuy(true);
    //         const form = e.currentTarget as HTMLFormElement;
    //         const formData = new FormData(form);
    //         console.log(formData)
    //         console.log(`the value of the token is : ${formData.get('numberOfCoins')}`)
    //         // const getCurrentCoinDetails = await fetch(`https://api.dexscreener.com/latest/dex/tokens/0x628211398E10a014826bc7d943a39b2cE6126D72`, { method: 'GET' });
    //         // const getCurrentCoinDetailsParsed = await getCurrentCoinDetails.json();
    //         // const currentCoinPrice = getCurrentCoinDetailsParsed.pairs[0].priceUsd;
    //         const currentCoinPrice = 0.01625;
    //         const waitForRandomTransaction =  await getTransactionFromHashOnPolygon('0x03e1e800e92057ab38074e90932f1b1c8cc8d5a2b4b8c2727c8744aacf104e0e');
    //         console.log(waitForRandomTransaction);
    //         throw new Error('hello')
    //         const purchaseInsurance = await purchaseCoinInsurance(coindId, userAddress, Number(formData.get('numberOfCoins')), Number(currentCoinPrice));
    //         if (purchaseInsurance.success == true) {
    //             toast({ title: "Operation Success", description: "Successfully Purchased Policy", duration: 2000, style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope' } });
    //             setOpen(false);

    //         }
    //         setRefresh(prev => !prev);
    //     } catch (error) {
    //         toast({ title: "Error", description: "Error Purchasing Insurance", duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope' } })
    //         console.log(error);
    //     } finally {
    //         setLoaderBuy(false)
    //         setOpen(false);
    //     }
    // }

    // const handleFormSubmitExistingPolicy = () => {
    //     try {

    //     } catch (error) {
    //         console.log(`error in purchasing exisitng policy`);
    //         console.log(error)
    //     }
    // }

    const handleDecline = () => {
        setOpen(false);
    }

    const handleSelectYear = (years : number)=>{
        setNumberOfOfYears(years);
        setOpenDropdown(false);
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild >
                <button className='text-success-511 max-sm:text-[12px] hover:underline w-fit cursor-pointer px-4 font-semibold font-manrope text-[16px]'>Request</button>
            </DialogTrigger>
            
                <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                    <DialogHeader>
                        <DialogTitle className="font-manrope">Purchase New Insurance Policy</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>Click Purchase to submit your request. Upon approval, coverage of up to 2 years will be provided, with payment due after approval.</DialogDescription>
                    {/* <form onSubmit={handleFormSubmit} className='flex flex-col gap-4 max-md:gap-2'>
                        <DialogDescription>Please enter the number of coins you wish to purchase</DialogDescription>
                        <input placeholder='Enter Number of coins' type='number' name='numberOfCoins' required step='0.001' min='0' max={maxCoinsAvailable} className='p-3 no-spinners w-full rounded small-border ' onInput={(e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.validity.rangeOverflow) { e.target.setCustomValidity(`Maximum of ${maxCoinsAvailable} coins are available of insurance`); } }} />
                        <DialogFooter>
                            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
                                <button type='submit' disabled={loaderBuy} className={`${loaderBuy == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Purchase'}</button>
                                <button onClick={handleDecline} className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>

                            </div>
                        </DialogFooter>
                    </form> */}
                    <div className="relative inline-block text-left">
      {/* Dropdown Button */}

      <button
        onClick={toggleDropdown}
        className="px-4 py-2 relative text-black text-left  rounded-md shadow-md ring-1 ring-black  focus:outline-none focus:ring-2 focus:ring-black w-full "
      >
        {numberOfYears == 0 ? 'Select Duration' : numberOfYears + ' Years'}
        <ChevronDown className='absolute  right-0 top-[25%] text-black' />
      </button>

      
      <div
        className={`absolute right-0 mt-2 w-full bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-transform origin-top ${
          openDrowdown ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
        style={{ transformOrigin: "top", overflow: "hidden" }}
      >
        <div className="py-1">
          <button
            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            onClick={()=>{handleSelectYear(1)}}
          >
            1 Year
          </button>
          <button
            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            onClick={()=>{handleSelectYear(3)}}
          >
            3 Years
          </button>
          <button
            className="w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
            onClick={()=>{handleSelectYear(5)}}
          >
            5 Years
          </button>
        </div>
      </div>
    </div>
                    <DialogFooter>
                            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
                                <button onClick={requestHandleBuyNewCoinInsurancePolicy}  disabled={loaderBuy || numberOfYears == 0} className={`${loaderBuy == true || numberOfYears == 0 ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderBuy == true || numberOfYears == 0 ? loaderBuy == true ? 'Loading..' : 'Purcahse' : 'Purchase'}</button>
                                <button onClick={handleDecline} className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>
                            </div>
                        </DialogFooter>
                </DialogContent>
            
        </Dialog>
    )
}

export default DialogPurcahseCoinInsurancePolicy