'use client'
import React, { useState } from 'react'
import Image from 'next/image'
const Minting = () => {
    const [coinValue , setCoinValue] = useState(1);

    const onPlusClick = ()=>{
        setCoinValue(coinValue+1);
    }
    const onSubtractClick = ()=>{
        if(coinValue <= 1){
            return;
        }
        setCoinValue(coinValue -1);

    }

    return (
        <div className='flex flex-col gap-12 p-10 '>
            <h1 className='text-success-511 text-[18px] '>Minting</h1>
            <div className='flex flex-col gap-4 '>
                <p className='text-white text-[16px] underline font-manrope font-semibold'>Introducing Mint NFT to Wallet</p>
                <p className='text-white font-manrope text-[16px] font-normal'>Minting an NFT (Non-Fungible Token) involves creating a unique digital asset on the blockchain. BITSI&apos;s platform provides an easy way to mint NFTs directly to your wallet. Follow these steps to mint an NFT on the BITSI website.</p>
                <button className='bg-white px-20 py-2 w-fit font-bold font-manrope'>Mint Now</button>
            </div>

            <div className='flex flex-col gap-4 '>
                <p className='text-white text-[16px] underline font-manrope font-semibold'>Introducing Mint Coin to Wallet</p>
                <p className='text-white font-manrope text-[16px] font-normal'>Minting an Coin involves creating a unique digital asset on the blockchain. BITSI&apos;s platform provides an easy way to mint Coin directly to your wallet.</p>
                <button className='bg-white px-20 py-2 w-fit font-bold font-manrope'>Mint Now</button>
            </div>
            <h1 className='text-success-511 text-[18px]'>Manage Wallets</h1>
            {/* <div>table for wallets</div> */}

            <div className='flex flex-col gap-4 '>
                <p className='text-white text-[16px] underline font-manrope font-semibold'>Mint NFt to Wallet</p>
                <div className='flex max-lg:flex-col gap-10 '>
                
                    <button className='bg-white xl:w-[234px] px-1 max-xl:px-10 flex items-center py-2 justify-center gap-1 font-bold font-manrope'>Upload Nft <Image src='/icons/upload-icon.svg' height={24} width={24} alt='upload' /></button>
                    <button className='bg-white xl:w-[234px] px-1 max-xl:px-10  py-2 flex gap-1 justify-center font-bold font-manrope'>Upload Collection <span><Image src='/icons/upload-icon.svg' height={24} width={24} alt='upload' /></span></button>
                    <button className='bg-success-511 xl:w-[234px] max-xl:px-10 px-1   py-2 text-black font-manrope font-bold rounded-3xl'>Mint</button>

                </div>
            </div>

            <div className='flex flex-col gap-4 '>
            <p className='text-white text-[16px] underline font-manrope font-semibold'>Mint Coin to Wallet</p>
            <p className='text-white text-[16px]  font-manrope font-semibold text-opacity-40'>Choose how many coins you want to mint to your wallet</p>
            <div className='flex max-md:flex-col max-md:items-center lg:gap-10 gap-4'>
            <div className='flex items-center justify-between bg-white w-fit max-sm:gap-24 gap-52  p-2'>
                <div className='flex justify-between items-center '>
                    <div className='flex items-center '>
                        <Image src='/icons/bitsi.svg' height={79.05} width={80} alt='bitsi logo' />
                        <p className='font-manrope text-black text-[22px] max-sm:text-[16px] font-bold'>BITSI&nbsp;Coin</p>
                    </div>
                    </div>
                    
                    <div className='flex items-center justify-center px-2'>
                        <p onClick={onPlusClick} className='text-black cursor-pointer font-black text-[30px] selection:bg-white'>+</p>
                        <div className='bg-black w-[30px] h-[35px] flex justify-center items-center'><p className='text-[22px] text-white font-manrope font-bold'>{coinValue}</p></div>
                        <p onClick={onSubtractClick} className='text-black cursor-pointer font-black text-[30px] selection:bg-white'>-</p>
                    </div> 
            </div>
            <div className='flex items-center w-full'>
            <button className='bg-success-511 xl:w-[234px] max-xl:px-10 px-1 py-2 max-md:w-full  text-black font-manrope font-bold rounded-3xl'>Mint</button>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Minting