'use client'
import Button from '@/components/Button'
import { DialogBuy } from '@/components/DialogBuy'
import FormLabel from '@/components/FormLabel'
import FormRow from '@/components/FormRow'
import HeroNft from '@/components/HeroNft'
import InputText from '@/components/InputText'
import Image from 'next/image'
import React, { useState } from 'react'
import {useDropzone} from 'react-dropzone';

const UploadNFt = () => {
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageCollection , setErrorMessageCollection] = useState('');
  const[errorMessageNftFile , setErrorMessageNftFile] = useState('');
  const [preview , setPreview] = useState<string>('/icons/default-nft-preview.png');
  const [collectionErrorMessage , setCollectionErrorMessage] = useState('');
  const [royaltiesErrorMessage , setRoyaltiesnErrorMessage] = useState('');
  const [priceErrorMessage , setPriceErrorMessage] = useState('');
  const [showAlertDialog , setShowAlertDialog] = useState('');
  

  const handleOnChange =  (event: React.ChangeEvent<HTMLInputElement>)=>{
    const filePre = new FileReader;
    const file = event.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();
  
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {  //conditional for string
          setPreview(fileReader.result); 
        }
      };
  
      fileReader.readAsDataURL(file); // Read the file as a data URL
    }
    
    // filePre.readAsDataURL(tar)

  }
  
  // const handleDrop = (acceptedFiles: File[]) => {
  //   // Handle the dropped files here
  //   console.log(acceptedFiles);
  // };
  // const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
  //   // accept: '.jpg, .png, .svg, .mp4',
  //   accept : { 'video/mp4': ['.mp4', '.MP4'],   'image/*': ['.jpeg', '.jpg', '.png'], },
  //   maxSize: 50000000, // 50MB
  //   onDrop: handleDrop, // Function to handle file drop
  //   maxFiles : 1,
  // });


  
  const handleOnSubmit = (e: React.SyntheticEvent)=>{
    // console.log(e?.target?.name?.value);
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const fileInput = form.elements.namedItem('nftFile') as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];
    console.log(form)
    if(!file){
      setErrorMessageNftFile('Please Upload A file to Proceed');
    
    }else{
      setErrorMessageNftFile('');
    }
    if(!formData.get('name')){
      setErrorMessageName('Name must be filed');
      
    }else{
      setErrorMessageName('')
    }
    if(!formData.get('collection')){
        setCollectionErrorMessage('Please fill in the collection name');
    }else{
      setCollectionErrorMessage('');
    }if(!formData.get('price')){
      setPriceErrorMessage('Please Enter Price');
    }else{
      setPriceErrorMessage('');
    }if(!formData.get('royalties')){
      setRoyaltiesnErrorMessage('Please Enter Royality');
    }else{
      setRoyaltiesnErrorMessage('');
    }

    if(!errorMessageName || !errorMessageCollection || !errorMessageNftFile || !collectionErrorMessage || !priceErrorMessage){
      return;
    }

    console.log(file);


    
  }
  return (
    <>
    <div className='navbar-space'>
    </div>
    <HeroNft />


    <section className='bg-success-503 '>
    <div className='mb-8'>
    <form onSubmit={handleOnSubmit}>
      <div className='flex flex-col'>
      <div className='flex justify-between  max-sm:flex-col'>
        <div className='sm:w-1/2'>
      <FormRow className='p-4 w-fit h-fit'>
        <p className='text-white font-montserrat font-semibold text-[22px] mb-2'>Upload Here*</p>
      <input type='file' name='nftFile' className='hidden' id = 'nftFile' accept=".jpg,.png,.svg,.mp4,.gif" onChange={handleOnChange}/>
   
      <label htmlFor="nftFile" className='w-fit h-fit'>
        <div className='bg-success-520 bg-opacity-55 border-2 border-dotted border-success-506 justify-center items-center cursor-pointer'>
          <div className='lg:p-24 sm:p-16 flex flex-col items-center justify-center max-sm:p-14'>
          <Image src = '/icons/Upload-file-icon.png' height={32} width={32}  alt = 'upload'/>
          <p className='text-white text-[12px] font-montserrat font-semibold '>Max Size : 50MB</p>
          <p className='text-white text-[12px] font-montserrat font-semibold'>JPG,&nbsp;SVG,&nbsp;PNG,&nbsp;GIF,&nbsp;SV4</p>
          </div>
        </div>
        </label>


{/* <div className='w-fit h-fit'>
      <div {...getRootProps()} className='bg-success-520 bg-opacity-55 border-2 border-dotted border-success-506 justify-center items-center cursor-pointer'>
        <input {...getInputProps()} />
        <div className='p-24 flex flex-col items-center justify-center max-sm:p-10'>
          <Image src='/icons/Upload-file-icon.png' height={32} width={32} alt='upload' />
          <p className='text-white text-[12px] font-montserrat font-semibold '>Max Size : 50MB</p>
          <p className='text-white text-[12px] font-montserrat font-semibold'>JPG, SVG, PNG, GIF, MP4</p>
        </div>
      </div>
    </div> */}
      {errorMessageNftFile && <p className='text-success-517 text-[11px] font-normal'>{errorMessageNftFile}*</p>}

      <p className='text-[12px] text-white text-opacity-65 mt-4 font-thin'>Note: Once your NTF is Minted You can&apos;t be changed any details </p>
      </FormRow>
      </div>
      <div className='sm:w-1/2   flex flex-col p-2'>
      <p className='text-white font-montserrat text-[22px] font-semibold'>Preview here</p>
      <p className='text-white font-montserrat text-[22px] font-thin text-opacity-66'>Uploaded pic will be shown here</p>
      <div className=' p-2 max-w-[570px] max-h-[262px] bg-success-503 secondary-shadow11 rounded-xl flex items-center justify-center'>
      <Image src = {preview} height={229} width={521} alt='image' className='max-w-full max-h-full overflow-hidden' />
      </div>
      </div>
      </div>

      <div className='flex justify-between  max-sm:flex-col sm:mb-0 gap-2  '>
      <FormRow className='sm:w-1/2 p-4'>
        <FormLabel htmlFor='name' className='font-montserrat text-white text-[22px] font-semibold'>Name Of Your NFT*</FormLabel>
        <InputText id = 'name' name = 'name' type='text' placeHolder='eg-cratoNFT' className='p-3' />
        {errorMessageName && <p className='text-success-517 text-[11px] font-normal'>{errorMessageName}*</p>}
      </FormRow>
      <FormRow className='sm:w-1/2 p-4'>
        <FormLabel htmlFor='price' className='font-montserrat text-white text-[22px] font-semibold'>Price*</FormLabel>
        <InputText id = 'price' name = 'price' type='text' placeHolder='1-BITSI' className='p-3' />
        {priceErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{priceErrorMessage}*</p>}
      </FormRow>
      </div>
      <div className='flex justify-between max-sm:flex-col sm:mb-10 gap-2 '>
      <FormRow className='sm:w-1/2 p-4'>
        <FormLabel htmlFor='collection' className='font-montserrat text-white text-[22px] font-semibold'>Collection*</FormLabel>
        <InputText id = 'collection' name = 'collection' type='text' placeHolder='Please enter the name of your collection' className='p-3' />
        {collectionErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{collectionErrorMessage}*</p>}
      </FormRow>
      <FormRow className='sm:w-1/2 p-4'>
        <FormLabel htmlFor='royalties' className='font-montserrat text-white text-[22px] font-semibold'>Royalties*</FormLabel>
        <InputText id = 'royalties' name = 'royalties' type='text' placeHolder='Suggested 0. 10%, 20%, 30%, 40% MAX is 70%' className='p-3' />
        {royaltiesErrorMessage && <p className='text-success-517 text-[11px] font-normal '>{royaltiesErrorMessage}*</p>}
      </FormRow>
      </div>
      <div className='flex max-sm:flex-col sm:items-center sm:mb-10 gap-2  '>
      <FormRow className='sm:w-1/2 p-4'>
        <FormLabel htmlFor='name' className='font-montserrat text-white text-[22px] font-semibold'>Description</FormLabel>
        <InputText id = 'description' name = 'description' type='text' placeHolder='Describe about your NFT' className='p-6' />
      </FormRow>
      <div className='h-fit sm:w-1/2 place-content-center items-center max-sm:p-4'>
      <button className='text-white max-sm:w-full  bg-success-513 sm:px-24  sm:ml-10 lg:px-48  py-4 sm:mt-6 rounded-xl text-[20px]'>MINT
      </button>
      </div>
      </div>
      </div>
    </form>
    </div>
    </section>
    </>
  )
}

export default UploadNFt