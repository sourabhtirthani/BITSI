'use client'
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel';
import { readContract } from '@wagmi/core';
import { coinContractAbi, coinContractAddress } from '@/lib/coinContract';
import { config } from '@/config';
import React, { useEffect, useState } from 'react'
import { creditNoteContractABI, creditNoteContractAddress } from '@/lib/creditContract';
import { showToastUI } from '@/lib/utils';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { useWriteContract } from 'wagmi';

const Credit = () => {
    const [viewOnly, setViewOnly] = useState<boolean>(true);
    const [currentCoinPriceForCredit, setCurrentCoinPriceForCredit] = useState<number | ''>('');
    const { address , isConnected } = useAccount();
    const {writeContractAsync} = useWriteContract();

    const handleEditClick = async () => {
        try{
            if(viewOnly == true){
                setViewOnly(prev=>!prev)
                }else{
                    if(!isConnected){
                        showToastUI({title : "Error" , description : "Please Connect Wallet To Proceed" , operation : "fail"});
                        return;
                    }
                    const transaction = await writeContractAsync({
                        address : creditNoteContractAddress, 
                        abi : creditNoteContractABI,
                        functionName : 'setTokenPrice',
                        args : [BigInt(Number(currentCoinPriceForCredit) * 10**18)] 
                    })
                    showToastUI({title : "Success" , description : "Price of Coin Changed Successfully" , operation : "success"});
                }
        }catch(error){
            showToastUI({title : "Error" , description : "Error Changing the Price of Coin" , operation : "fail"});
        }
    }
    useEffect(() => {
        const getValueOfCurrentCoinPriceForCredit = async () => {
            try {
                const tokenPriceFromContract = await readContract(config, {
                    abi: creditNoteContractABI,
                    address: creditNoteContractAddress,
                    functionName: 'tokenPrice'
                })
                setCurrentCoinPriceForCredit(Number(tokenPriceFromContract) / 10 ** 18);
            } catch (error) {
                showToastUI({ title: "Error", description: 'Error Fetching Current Coin Price', operation: "fail" });
            }
        }
        getValueOfCurrentCoinPriceForCredit();
    }, [])

    return (
        <div className='bg-success-503 w-full   flex flex-col gap-12 p-8 max-md:p-4'>
            <div className='flex justify-between max-xl:justify-start max-xl:gap-4 items-center'>
                <p className='font-manrope font-bold text-[18px] text-success-511'>Credit</p>
                <AdminAdressButtonForAdminPanel />
            </div>

            <div className='flex flex-col mt-4 gap-10 w-3/4'>
                <div className='flex flex-col gap-3 '>
                    <h1 className='text-white font-bold text-[22px] font-manrope'>First Hand Coverage</h1>
                    <div className='relative'>
                        <p className='text-white text-[1rem] font-montserrat font-bold absolute right-3 top-[25%]'> MATIC</p>
                        <input type='number' className='bg-transparent no-spinners w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' value={currentCoinPriceForCredit} onChange={(e) => { setCurrentCoinPriceForCredit(Number(e.target.value)) }} disabled={viewOnly} />
                    </div>
                </div>
            <div onClick={handleEditClick} className='flex gap-1 bg-success-511 text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit self-end items-center justify-center'>
                <Image src='/icons/basil_edit-outline.svg' height={32} width={32} alt='edit' className={`${viewOnly == true ? '' : 'hidden'}`} />{viewOnly == true ? 'Edit' : 'Save Changes'}
            </div>
            </div>

        </div>
    )
}

export default Credit