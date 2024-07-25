'use client'
import React from 'react'  // test componenet might or might not be included in the project
import { useAccount } from 'wagmi'
import { DialogBuy } from './DialogBuy';

const BuyOwnButtonWithNftId = ({ownerAddress , nameOfCollection , srcOfImage , nftName, nftPrice, nftRoyality , arrOfIds } : {ownerAddress : string , nameOfCollection : string , srcOfImage : string , nftName : string , nftPrice : string , nftRoyality : string , arrOfIds : string[] }) => {
    const {address , isConnected} = useAccount();
    if(!isConnected){
        return (
            <div className='w-full bg-red-500 flex justify-center rounded-xl text-white font-monserrat text-[22px]  mt-3 px-4 py-2'>Wallet Not Connected</div>
        )
    }
  return (
    <>
    {address == ownerAddress ?  <div className='w-full bg-red-500 flex justify-center rounded-xl text-white font-monserrat text-[22px]  mt-3 px-4 py-2'>Owned</div> :  <DialogBuy collectionName={nameOfCollection} ownerAddress={ownerAddress} imgSrc={srcOfImage} nameOfNft={nftName} nftPrice={nftPrice} royalty={nftRoyality} buttonName='Buy' lstOfItems={arrOfIds} nameOfClass='w-full bg-nft-text-gradient rounded-xl text-white font-monserrat text-[22px]  mt-3 px-4 py-2' currencyText='Matic' showSelectedItem = {true} totalItems={0} />}
    </>

  )
}

export default BuyOwnButtonWithNftId