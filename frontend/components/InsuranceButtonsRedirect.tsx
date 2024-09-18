'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { useToast } from "@/components/ui/use-toast"

const InsuranceButtonsRedirect = ({buttonName ,helpText , redirectTo} : { buttonName : string , helpText : string , redirectTo : string}) => {
    const [hoverOn , setHoverOn] = useState(false)
    const {address , isConnected} = useAccount();
    const { toast } = useToast();
    const handleWalletNotConnected = async()=>{
        try{
            toast({ title: "Wallet Not Connected", description: "Please connect wallet in order to Continue", duration: 2000,
                style: {  backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, })
        }catch(error){
            console.log(error);
        }
    }
  return (
    <div className="relative" onMouseEnter={() => setHoverOn(true)} 
    onMouseLeave={() => setHoverOn(false)}>
    {hoverOn && <div className=" max-md:hidden absolute secondary-shadow11 -left-14 w-[250px] max-md:w-[0px] max-md:h-[0px] bottom-14 text-center shadow-md font-mono font-bold rounded-3xl py-2 px-4 w bg-white cursor-ponter"><p className="inline-block">{helpText}</p></div>}
    {isConnected ?  <Link href = {redirectTo} className='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance'>{buttonName}</Link> : 
  <button onClick={handleWalletNotConnected} className='bg-white text-black text-[22px] py-2 max-sm:py-1  px-5 max-sm:px-2 font-semibold rounded-3xl font-manrope add-hover-button-insurance'>{buttonName}</button>}
  </div>
  )
}

export default InsuranceButtonsRedirect