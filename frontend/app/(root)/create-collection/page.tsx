'use client'
import FormLabel from '@/components/FormLabel'
import FormRow from '@/components/FormRow'
import { contractABI, contractAddress } from '@/lib/contract';
import Image from 'next/image';
import { useState } from 'react';
import { useAccount } from 'wagmi';

const CreateCollection =  () => {
    const { address , isConnected } = useAccount();
    const [fileError , setFileError] = useState(false);
    const [previewImage , setPreviewIage] = useState('/icons/default-nft-preview.png');
   
    const handleOnChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        if(e.target?.files?.[0]){
        const file = e.target?.files?.[0]
        const imgURL = URL.createObjectURL(file);
        setPreviewIage(imgURL)
        }
        
    }

    const handleSubmit = (formData:FormData)=>{
        const file = formData.get('collectionFile') as File;
        if(!file.name){
            setFileError(true);
            return;
        }
        console.log('submission logic here');
        console.log(formData.get('floorPrice'))
        setFileError(false);
    }
  return (
    <>
      <div className='navbar-space'>
      </div>
      <div className='md:p-8 p-4 bg-success-503 flex flex-col gap-10 max-md:gap-4'>
        <p className='text-white font-manrope font-semibold text-[28px] '>Create New Collection</p>
        <div className='flex flex-col gap-3'>
        <p className='font-bold text-[22px] font-manrope text-white '>Collection Icon*</p>
        <p className='font-semibold text-[16px] text-white text-opacity-65 font-manrope'>Upload your collection icon here, the uploaded picture should be look as icon it will reflect in the Main page.</p></div>
      
      <form className='w-full flex flex-col gap-6' action={(e)=>{handleSubmit(e)}}>
      <FormRow className=''>
                    
                    <input onChange={(e)=>{handleOnChange(e)}} type='file' name='collectionFile' className='hidden' id='collectionFile' accept=".jpg,.png,.svg,.gif"   />

                    <label  htmlFor="collectionFile" className='w-fit h-fit'>
                        <div className='flex justify-between'>  
                      <div className='  border-2 border-dashed px-14 max-sm:px-5 border-success-529 h-[212px] w-[462px] flex flex-col items-center justify-center max-sm:w-[212px] cursor-pointer'>
                       <p className='text-white font-mulish text-[22px] text-center text-opacity-66 '><span className='text-success-511 underline'>Upload</span> or drag and drop it here
                       Only .PNG, .JPG</p>
                       </div>
                       <Image src={previewImage} height={212} width={381} alt='image' className='max-w-[381px] max-h-[212px] overflow-hidden' />
                      </div>
                    </label>
                    {fileError && <p className='text-success-517 text-[11px] font-normal'>Please upload Image before Proceding</p>}
                  </FormRow>
                  <FormRow >
                  <FormLabel htmlFor='name' className='font-montserrat text-white  text-[22px] font-semibold'>Name Of Your Collection*</FormLabel>
                  <input id='name' name='name' type='text' required className='p-3 w-full  rounded' />
                  {/* {errorMessageName && <p className='text-success-517 text-[11px] font-normal'>{errorMessageName}*</p>} */}
                </FormRow>
                <FormRow >
                  <FormLabel htmlFor='floorPrice' className='font-montserrat text-white text-[22px] font-semibold '>Floor Price*</FormLabel>
                  <input  id='floorPrice' name='floorPrice' required type='number' step='0.01' min='0'  className='p-3 no-spinners w-full rounded' />
                  {/* {errorMessageName && <p className='text-success-517 text-[11px] font-normal'>{errorMessageName}*</p>} */}
                </FormRow>
                <FormRow >
                  <FormLabel htmlFor='description' className='font-montserrat text-white text-[22px] font-semibold'>Description*</FormLabel>
                  <input id='description' name='description' type='text'  className='p-8 w-full rounded' required />
                  <p className='text-white text-[18px] text-opacity-65 font-bold font-montserrat mt-2'>The description you added here will be shown in the NFT preview Section</p>
                  {/* {errorMessageName && <p className='text-success-517 text-[11px] font-normal'>{errorMessageName}*</p>} */}
                </FormRow>
                {/*  */}
    
                <button disabled = {!isConnected}  type='submit' className='disabled:bg-gray-400 text-white font-manrope flex flex-col items-center justify-center font-bold text-[20px] self-end mt-4 px-14 max-sm:px-7 py-2 bg-success-511 w-fit rounded-md'>{isConnected ? 'Create' : 'No Wallets Found'}</button>
      </form>
      </div>
      </>
  )
}

export default CreateCollection