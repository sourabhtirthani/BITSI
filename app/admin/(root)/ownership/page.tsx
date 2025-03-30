'use client'

import AdminAdressButtonForAdminPanel from "@/components/AdminAdressButtonForAdminPanel";
import { toast } from "@/components/ui/use-toast";
import { contractABI, contractAddress } from "@/lib/contract";
import { readAddressFromContract } from "@/lib/contractRead";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";

const Ownership = () => {
    const [viewOnly , setViewOnly] = useState<boolean>(true);
    const {address , isConnected} = useAccount();
    const [loaderDuringSubmit , setLoaderDuringSubmit] = useState(false);
    const [currentOwnerAddress , setCurrentOwnerAddress] = useState('');
    const { writeContractAsync } = useWriteContract()

    useEffect(()=>{
        const getCurrentOwnerFromContract = async()=>{
            try{
                const res = await readAddressFromContract('owner');
                console.log(res)
                setCurrentOwnerAddress(res as string);

            }catch(error){

            }
        }
        getCurrentOwnerFromContract();
    }, [])

    const handleEditClick = ()=>{
        setViewOnly(false)
    }
    const handleCancelClick = ()=>{
        setViewOnly(true);
    }

    const handleFormSubmit = async(event: React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        try{
            setLoaderDuringSubmit(true);
        if(!isConnected){
            toast({ title: "No wallets Found", description: "Please connect to your admin wallet in order to continue", duration: 2000,
                style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',
                },
              })
              return;
        }
        const formData = new FormData(event.currentTarget);
        const  newOwnerAddress = formData.get("ownershipAddress") as string;
        if(!newOwnerAddress){
            toast({ title: "Address Not provided", description: "Please enter the address of new owner in order to continue", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',}, });
            return;
        }
        if(isConnected && address != currentOwnerAddress){
            toast({ title: "UNAUTHORIZED", description: "Only the owner can change the contract address", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',}, });
            return;
        }
        const transactionUpdateToken = await writeContractAsync({
            address: contractAddress,
            abi: contractABI,
            functionName: 'transferOwnership',
            args: [newOwnerAddress]
        });
        toast({ title: "Operation Success", description: "Changes will be reflected once the transaction is successful on the blockchain", duration: 4000,style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope',},});
        // setRefreshTokenValue(prev => !prev);

    }catch(error){
        toast({ title: "ERROR", description: "ERROR OCCURED", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',}, })

    }finally{
        setLoaderDuringSubmit(false);
        setViewOnly(true);
    }
    }
  return (
     <div className='p-8 max-md:p-4 w-full flex flex-col'>
        <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
        <div className='flex flex-col gap-0.5'>
        <p className='font-manrope font-bold text-[24px] text-success-511'>Ownership</p>
        <p className='text-white text-opacity-50 font-bold font-manrope text-[18px]'>Manage ownership of Contract</p>
        </div>
        <AdminAdressButtonForAdminPanel />
    </div>
        <form onSubmit={handleFormSubmit}>
          <div className='flex w-3/4 max-sm:w-full max-md:flex-col gap-2 flex-wrap mb-10'>
          <h1 className='text-white font-bold text-[22px]  font-manrope'>Current Owner</h1>
            <input className='bg-transparent w-full  border-2 border-white rounded-xl font-bold p-2 text-white text-[18px] ' defaultValue={currentOwnerAddress}  disabled = {viewOnly} required name='ownershipAddress'/>
            <div className='flex gap-1 items-center '>
                <Image src='/icons/akar-icons_info-fill.svg' height={18} width={18} alt='help text' />
                <p className='text-white font-montserrat font-bold text-[12px] text-opacity-60'>Please ensure you have a thorough understanding before proceeding with any changes to the ownership of the smart contract.</p>
            </div>
                </div>
                {viewOnly == true ? 
                <div onClick={handleEditClick} className='flex gap-1 h-[45px] bg-success-511 text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit self-end items-center justify-center'>
                  <Image src = '/icons/basil_edit-outline.svg' height={32} width={32} alt = 'edit' />Edit
                </div> :<div className='flex gap-2  self-end  h-[45px]  '>
                    <button onClick={handleCancelClick} className='bg-success-533 text-white font-manrope px-4 py-2 text-[18px] rounded-3xl font-bold'>Cancel</button>
                     <button disabled = {loaderDuringSubmit} className={`${loaderDuringSubmit ? 'bg-gray-400' : 'bg-success-511'}  text-white font-manrope text-18px font-bold py-2 px-4 cursor-pointer rounded-3xl w-fit items-center justify-center`} type='submit'>{loaderDuringSubmit ? 'Please Wait..' : 'Save Changes'}</button></div>
            }
                </form>
     </div>
  )
}

export default Ownership