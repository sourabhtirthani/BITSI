'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const CoinInsurance = () => {
    const [viewOnly , setViewOnly] = useState<boolean>(true);
    const [firstHandCoverageValue , setFirstHandCoverageValue] = useState('1 BTS = 14.65 ETH');
    const [secondHandCoverageValue , setSecondHandCoverageValue] = useState('1 BTS = 14.65 ETH');
    const [insurancePeriodValue , setInsurancePeriodValue] = useState('12 Months');
    const [insuranceGrowthRateValue , setInsuranceGrowthRateValue] = useState('1 BTS = 14.65 ETH');
    const [lowCoverageLimitValue , setLowCoverageLimitValue] = useState('6 Months');
    const [upperCoverageLimitValue , setUpperCoverageLimitValue] = useState('12 Months');
    // const [lowerThresholdPriceValue , setLowerThresholdPriceValue] = useState('1 BTS = 14.65 ETH')
    const handleEditClick = ()=>{
        setViewOnly(viewOnly => !viewOnly)
    }
  return (
    <div className='p-8 max-md:p-4 flex flex-col w-full'>
    <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
        <div className='flex flex-col gap-0.5'>
        <p className='font-manrope font-bold text-[24px] text-success-511'>Coin Insurace Parameters</p>
        <p className='text-white text-opacity-50 font-bold font-manrope text-[18px]'>Manage your Coin Insurance here</p>
        </div>
        <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>Connect</button>
    </div>
        <div className='flex flex-col mt-4 gap-10 w-3/4'>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>First Hand Coverage</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value={firstHandCoverageValue} onChange={(e)=>{setFirstHandCoverageValue(e.target.value)}} disabled = {viewOnly} />
            <div className='flex gap-1'>
                <Image src='/icons/akar-icons_info-fill.svg' height={18} width={18} alt='help text' />
                <p className='text-white font-montserrat font-bold text-[12px] text-opacity-60'>Insurance may change according to the coin parameters</p>
            </div>

            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>Second Hand Coverage</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value={secondHandCoverageValue} onChange={(e)=>{setSecondHandCoverageValue(e.target.value)}} disabled = {viewOnly} />
            <div className='flex gap-1'>
                <Image src='/icons/akar-icons_info-fill.svg' height={18} width={18} alt='help text' />
                <p className='text-white font-montserrat font-bold text-[12px] text-opacity-60'>Insurance may change according to the coin parameters</p>
            </div>

            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>Insurance Period</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value={insurancePeriodValue} onChange={(e)=>{setInsurancePeriodValue(e.target.value)}} disabled = {viewOnly} />
            <div className='flex gap-1'>
                <Image src='/icons/akar-icons_info-fill.svg' height={18} width={18} alt='help text' />
                <p className='text-white font-montserrat font-bold text-[12px] text-opacity-60'>Changes to increase in next few days</p>
            </div>

            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>Insurance Growth Rate</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value={insuranceGrowthRateValue} onChange={(e)=>{setInsuranceGrowthRateValue(e.target.value)}} disabled = {viewOnly} />

            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>BITSI Coin Low Coverage Limit</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value={lowCoverageLimitValue} onChange={(e)=>{setLowCoverageLimitValue(e.target.value)}} disabled = {viewOnly} />
            
            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>BITSI Coin Upper Coverage Limit</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value={upperCoverageLimitValue} onChange={(e)=>{setUpperCoverageLimitValue(e.target.value)}} disabled = {viewOnly} />

            </div>
            <div onClick={handleEditClick} className='flex gap-1 bg-success-511 text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit self-end items-center justify-center'>
                <Image src = '/icons/basil_edit-outline.svg' height={32} width={32} alt = 'edit' className={`${viewOnly == true ? '' : 'hidden'}`}/>{viewOnly == true ? 'Edit' : 'Save Changes'}
                </div>
        </div>
    </div>
  )
}

export default CoinInsurance