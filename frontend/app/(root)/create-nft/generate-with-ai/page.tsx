'use client'
import Button from '@/components/Button'
import { CollectionCombobox } from '@/components/CollectionCombobox'
import FormLabel from '@/components/FormLabel'
import FormRow from '@/components/FormRow'
import HeroNft from '@/components/HeroNft'
import InputText from '@/components/InputText'
import Image from 'next/image'
import React, { useState } from 'react'

const GenrateWithAi = () => {
  const [preview, setPreview] = useState<string>('/icons/default-nft-preview.png');
  const [collection , setColleciton] = useState('');
  const [collectionId , setCollectionid] = useState('')
  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData)
    console.log(formData.get('name'))
    
  }
  return (
    <>
      <div className='navbar-space'>

      </div>
      <HeroNft />

      <section className='bg-success-503'>
      <form onSubmit={handleSubmit}>
        <div className='flex max-sm:flex-col'>
          <div className='sm:w-1/2 md:p-8 max-md:p-2 flex flex-col '>
            <p className='text-[22px] font-montserrat font-semibold text-white'>Generate an AI Image</p>
            <p className='text-[22px] font-montserrat font-normal text-white text-opacity-50'>Select the image you want to genetare a AI Filter to that</p>
            <button className='bg-AI-gradient w-fit self-center mt-4 px-10 text-[16px] font-manrope font-semibold py-3 rounded-3xl'>Generate Now</button>

            <div className='mt-7'>
              
                <div className='flex flex-col'>
                  <FormRow className=' p-4'>
                    <FormLabel htmlFor='name' className='font-montserrat text-white text-[22px] font-semibold'>Name Of Your NFT*</FormLabel>
                    <InputText id='name' name='name' type='text' placeHolder='eg-cratoNFT' className='p-3' />
                  
                  </FormRow>
                  <FormRow className=' p-4'>
                    <FormLabel htmlFor='collection' className='font-montserrat text-white text-[22px] font-semibold'>Collection*</FormLabel>
                    {/* <InputText id='collection' name='collection' type='text' placeHolder='Please enter your collection name' className='p-3' /> */}
                    <input id='collection' name='collection' type='text' placeholder='' className='hidden' value={collectionId}  />
                    <CollectionCombobox setCollectionValue={setColleciton} setCollectionId = {setCollectionid} />
                    {/* {priceErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{priceErrorMessage}*</p>} */}
                  </FormRow>
                
                 
                  <FormRow className=' p-4'>
                    <FormLabel htmlFor='royalties' className='font-montserrat text-white text-[22px] font-semibold'>Royalties*</FormLabel>
                    <InputText id='royaltes' name='royaltes' type='text' placeHolder='eg-cratoNFT' className='p-3' />
                    {/* {errorMessageName && <p className='text-success-517 text-[11px] font-normal'>{errorMessageName}*</p>} */}
                  </FormRow>
                  <FormRow className=' p-4'>
                    <FormLabel htmlFor='price' className='font-montserrat text-white text-[22px] font-semibold'>Price*</FormLabel>
                    <InputText id='price' name='price' type='text' placeHolder='1-BITSI' className='p-3' />
                    {/* {priceErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{priceErrorMessage}*</p>} */}
                  </FormRow>
                 
                
                  <FormRow className=' p-4'>
                    <FormLabel htmlFor='description' className='font-montserrat text-white text-[22px] font-semibold'>Description*</FormLabel>
                    <InputText id='description' name='description' type='text' placeHolder='eg-cratoNFT' className='p-6' />
                    {/* {errorMessageName && <p className='text-success-517 text-[11px] font-normal'>{errorMessageName}*</p>} */}
                  </FormRow>
                 
                </div>
             


            </div>
          </div>



          <div className='sm:w-1/2 md:p-8 max-md:p-2 flex flex-col'>
            <p className='text-white font-montserrat text-[22px] font-semibold '>Preview here</p>
            <p className='text-white font-montserrat text-[22px] font-thin text-opacity-66 mb-4'>Uploaded pic will be shown here</p>
            <div className=' p-2 max-w-[570px] max-h-[262px] bg-success-503 secondary-shadow11 rounded-xl flex items-center justify-center'>
              <Image src={preview} height={229} width={521} alt='image' className='max-w-full max-h-full ' />
            </div>
            <p className='text-[12px] text-white text-opacity-65 mt-4'>Note : Once your NTF is Minted You can&apos;t be changed any details </p>
            <Button className='text-white max-sm:w-full  bg-success-513  py-4 sm:mt-6 rounded-3xl text-[20px]'>MINT</Button>
          </div>
        </div>
        </form>
      </section>

    </>
  )
}

export default GenrateWithAi