'use client'
import Dropdown from '@/components/Dropdown'
import { nftMintingDropDown } from '@/constants'
import React, { useState } from 'react'

const CoinMinting = () => {
    const [wallet , setWallet] = useState('')
  return (
    <div className='p-8 max-md:p-4 w-full'>
    <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
        <p className='font-manrope font-bold text-[18px] text-success-511'>NFT MINTING </p>
        <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>Connect</button>
    </div>
    <div className='flex flex-col gap-3'>
        <p className='text-[18px] text-white font-montserrat font-bold '>Select Wallet*</p>
        <Dropdown items={nftMintingDropDown} arrowImage='/icons/arrow-dropdown.svg' showIcon = {false} buttonName='Select Your Wallet' setValue={setWallet} />
        <p className='text-[18px] text-white font-montserrat font-bold '>Coin</p>
        <input type='text' className='border-2 border-white w-full flex justify-between items-center bg-success-512 text-white  rounded-xl px-4 py-2' placeholder='Number Of Coins' />
        {/* <Dropdown items={nftMintingDropDown} showIcon = {false} buttonName='Coin' setValue={setWallet} /> */}
        <button className='bg-success-511 px-28 mt-8 self-end py-2 text-white font-bold text-[20px] w-fit rounded-3xl'>Mint</button>
    </div>

    {/* <div className='flex flex-col gap-3 mt-10'>
        <p className='text-[18px] text-white font-montserrat font-bold '>Select Wallet*</p>
        <Dropdown items={nftMintingDropDown} showIcon = {false} buttonName='Coin' setValue={setWallet} />
        <button className='bg-success-511 px-28 mt-8 self-end py-2 text-white font-bold text-[20px] w-fit rounded-3xl'>Mint</button>
    </div> */}
</div>
  )
}

export default CoinMinting