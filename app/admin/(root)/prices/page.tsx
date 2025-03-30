'use client'
import Image from 'next/image'
import React, { useState } from 'react'

const Prices = () => {
  const [firstHandCoinPrice , setFirstHandCoinPrice] = useState('1 BTS = 14.65 ETH');
  const [firstHandNFTPrice , setFirstHandNFTPrice] = useState('1 BTS = 14.65 ETH');
  const [viewOnly , setViewOnly] = useState<boolean>(true);
  const [viewOnly1 , setViewOnly1] = useState<boolean>(true);

  const handleEditClick = ()=>{
    setViewOnly(viewOnly => !viewOnly)
}
const handleEditClick1 = ()=>{
  setViewOnly1(viewOnly1 => !viewOnly1)
}
  return (
    <div className='p-8 max-md:p-4 w-full'>
    <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
        <p className='font-manrope font-bold text-[18px] text-success-511'>BITSI COIN </p>
        <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>Connect</button>
    </div>
    <div className='flex flex-col mt-4 gap-8 w-3/4'>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>First Hand BITSI Coin Price</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value={firstHandCoinPrice} onChange={(e)=>{setFirstHandCoinPrice(e.target.value)}} disabled = {viewOnly} />

            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>Second Hand BITSI Coin Price</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value='1 BTS = 14.65 ETH'  disabled />
            <div className='flex gap-1'>
                <Image src='/icons/akar-icons_info-fill.svg' height={18} width={18} alt='help text' />
                <p className='text-white font-montserrat font-bold text-[12px] text-opacity-60'>Second hand price cannot be changed</p>
            </div>

            </div>
            <div onClick={handleEditClick} className='flex gap-1 bg-success-511 text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit self-end items-center justify-center'>
                <Image src = '/icons/basil_edit-outline.svg' height={32} width={32} alt = 'edit' className={`${viewOnly == true ? '' : 'hidden'}`}/>{viewOnly == true ? 'Edit' : 'Save Changes'}
                </div>
            </div>
            <div className='mt-10 flex flex-col'>
            <p className='font-manrope font-bold text-[18px] text-success-511'>BITSI NFT </p>
            </div>
            <div className='flex flex-col mt-4 gap-8 w-3/4'>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>First Hand NFT Coin Price</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value={firstHandNFTPrice} onChange={(e)=>{setFirstHandNFTPrice(e.target.value)}} disabled = {viewOnly1} />

            </div>
            <div className='flex flex-col gap-3'>
            <h1 className='text-white font-bold text-[22px] font-manrope'>Second Hand NFT Coin Price</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value='1 BTS = 14.65 ETH'  disabled />
            <div className='flex gap-1'>
                <Image src='/icons/akar-icons_info-fill.svg' height={18} width={18} alt='help text' />
                <p className='text-white font-montserrat font-bold text-[12px] text-opacity-60'>Second hand price cannot be changed</p>
            </div>

            </div>
            <div onClick={handleEditClick1} className='flex gap-1 bg-success-511 text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit self-end items-center justify-center'>
                <Image src = '/icons/basil_edit-outline.svg' height={32} width={32} alt = 'edit' className={`${viewOnly1 == true ? '' : 'hidden'}`}/>{viewOnly1 == true ? 'Edit' : 'Save Changes'}
                </div>
            </div>
    </div>
  )
}

export default Prices