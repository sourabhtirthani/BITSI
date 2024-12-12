'use client'
import { CoinHowItWorksProps } from '@/types'
import {useState} from 'react'

const CoinKeyFeatures = ({howItWorks , key , value} : {howItWorks : CoinHowItWorksProps[] , key : string , value : string}) => {
    const [showMore , setShowMore] = useState(false);
    return (
        <div  className='rounded-xl hover:bg-success-503 flex flex-col gap-6 max-md:gap-3 bg-success-512 secondary-shadow11 font-montserrat w-full p-8 max-md:p-4'>
            <p className='text-success-511 font-semibold text-[24px]'>{key}</p>
            <p className=' font-normal text-[18px]'>{value}</p>
            {showMore && <>
            <p className='text-success-511 font-semibold text-[24px]'>How it Works?</p>
            {howItWorks.map((item : CoinHowItWorksProps , index : number)=>{
                return (
                    <p key={index} className='font-bold text-white text-[18px]'>{item.heading}<span className='font-normal'> {item.data}</span></p>
                )
            })}</>}
            <button onClick={()=>{setShowMore(!showMore)}} className='self-start py-3 px-4 font-semibold text-[1rem] text-success-511 bg-black rounded-full'>{showMore ? 'See how it Works? ▲' : 'See how it Works? ▼'}</button> 
        </div>
    )
}

export default CoinKeyFeatures