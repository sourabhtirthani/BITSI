'use client'
import { uploadNftAction } from '@/actions/uploadNft'
import Button from '@/components/Button'
import { CollectionCombobox } from '@/components/CollectionCombobox'
// import CreateNftForm from '@/components/CreateNftForm'
// import CreateNftForm from '@/components/CreateNftForm'
import { DialogBuy } from '@/components/DialogBuy'
import FormLabel from '@/components/FormLabel'
import FormRow from '@/components/FormRow'
import HeroNft from '@/components/HeroNft'
import InputText from '@/components/InputText'
// import { revalidatePath } from 'next/cache'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import Checkbox from "@/components/Checkbox1"
import Link from "next/link"
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { generateMetadata } from '@/lib/generateMetadata'
import { useAccount, useWriteContract,  useWaitForTransactionReceipt, type BaseError, UseWaitForTransactionReceiptReturnType } from 'wagmi'
import { type UseWriteContractParameters } from 'wagmi'
import Web3 from 'web3';


import { contractABI, contractAddress } from '@/lib/contract'
// import * as z from "zod";
// import { useForm } from "react-hook-form";
// import { zodResolver } from '@hookform/resolvers/zod'
// import { uploadNftformSchema } from '@/lib/utils'
// import CreateNftForm from '@/components/CreateNftForm'



const UploadNFt = () => {
  // const formOfUpload = useForm<z.infer<typeof uploadNftformSchema>>({
  //   resolver: zodResolver(uploadNftformSchema)
  // });
  const { address } = useAccount();
  // const web3 = new Web3(window?.ethereum);
  const { push } = useRouter();
  const { toast } = useToast()
  const { data, writeContract, writeContractAsync, error } = useWriteContract()
  const [errorMessageName, setErrorMessageName] = useState('');
  const [errorMessageCollection, setErrorMessageCollection] = useState('');
  const [errorMessageNftFile, setErrorMessageNftFile] = useState('');
  const [preview, setPreview] = useState<string>('/icons/default-nft-preview.png');
  const [collectionErrorMessage, setCollectionErrorMessage] = useState('');
  const [royaltiesErrorMessage, setRoyaltiesnErrorMessage] = useState('');
  const [priceErrorMessage, setPriceErrorMessage] = useState('');
  const [showAlertDialog, setShowAlertDialog] = useState('');
  // const [hashOfContract, setHashOfContract] = useState<`0x${string}` | undefined>(undefined);
  const [collection, setColleciton] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData1, setFormData1] = useState<FormData | null>(null);
  // const [confirmTrans , setConfirmTrans] = useState(false);
  const [previewTemp, SetPrivewTemp] = useState('/icons/default-nft-preview.png')
  const [isLoading, setIsLoading] = useState(false);
  // const {data : receipt ,  isLoading: isConfirming, isSuccess: isConfirmed  , isError ,isFetching , isFetched, isPending} = useWaitForTransactionReceipt({ hash : hashOfContract || undefined})


  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filePre = new FileReader;
    const file = event.target.files?.[0];

    if (file) {
      const fileReader = new FileReader();
      const imgURL = URL.createObjectURL(file);  // one way to preview image
      SetPrivewTemp(imgURL)
      fileReader.onload = () => {
        if (typeof fileReader.result === 'string') {  // second way to preview image..both preview and previewTemp holds the preview of the image
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



  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    // console.log(e?.target?.name?.value);
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const fileInput = form.elements.namedItem('nftFile') as HTMLInputElement;
    const file = fileInput.files && fileInput.files[0];
    console.log(formData.get('collection'))
    console.log(formData.get('royalties'))
    if (!address) {
      toast({
        title: "No Wallet Connected",
        description: 'Please Connect Wallet To Proceed',
        duration: 2000,
        style: {
          backgroundColor: '#900808',
          color: 'white',
          fontFamily: 'Manrope',
        },
      })
      return;
    }
    if (!file) {
      console.log('in here first')
      setErrorMessageNftFile('Please Upload A file to Proceed');
      // return;

    } else {
      setErrorMessageNftFile('');
    }
    if (!formData.get('name')) {
      console.log('in here second')
      setErrorMessageName('Name must be filed');
      // return

    } else {
      setErrorMessageName('')
    }
    if (!formData.get('collection')) {
      console.log('in here third')
      setCollectionErrorMessage('Please fill in the collection name');
      // return;
    } else {
      setCollectionErrorMessage('');
    } if (!formData.get('price')) {
      console.log('in here fourth')
      setPriceErrorMessage('Please Enter Price');
      // return;
    } else {
      setPriceErrorMessage('');
    } if (!formData.get('royalties')) {
      console.log('in here royal')
      setRoyaltiesnErrorMessage('Please Enter Royality');
      // return;
    } else {
      setRoyaltiesnErrorMessage('');
    }

    if (!formData.get('royalties') || !file || !formData.get('name') || !formData.get('collection') || !formData.get('price')) {
      return;
    }

    console.log(file);
    setFormData1(formData);
    setShowCheckout(true);
    // await  serAct(formData);
    // revalidatePath('/create-nft/upload')
    console.log('in here in the handle submit after file console log');






  }

  const handleMintNft = async () => {
    try {
      setIsLoading(true);
      console.log('in here in the handlemintnft funcitno')
      if (!address) {
        return;
      }
      // address ,  nftName, description, imageUrl
      if (address) {
        const stringAddress: string = address;
        if (formData1 && formData1.get('name') != null && formData1.get('description') != null) {
          const tempName: string = formData1?.get('name')?.toString() ?? '';
          const tempDescription: string = formData1?.get('description')?.toString() ?? '';
          const { tokenId, tokenURI } = await generateMetadata(stringAddress, tempName, tempDescription, "https://res.cloudinary.com/djdrlor2w/image/upload/v1721212344/uploads/hn03inxyyklf3tq3svmn.jpg")
          if (!tokenId || !tokenURI) {
            toast({
              title: "token uri and token id error",
              description: 'token uri and token id error',
              duration: 2000,
              style: {
                backgroundColor: '#900808',
                color: 'white',
                fontFamily: 'Manrope',
              },
            })
            return;
          }
          const transaction = await writeContractAsync({
            address: contractAddress,
            abi: contractABI,
            functionName: 'mint',
            args: [address, 1, tokenURI, tokenId],
          });

          // console.log('in here too after await wrtei contract')
          // console.log('transactino hash acbdin line 205');
          console.log(transaction)
          console.log(`trasnsaion ${transaction}`)
          // while (!isConfirmed) {
          //   await new Promise(resolve => setTimeout(resolve, 1000));
          //   console.log("the has hi s" + hash)
          //   console.log(hash)
          // }
          // console.log('hash is ' , hash);
          // console.log(hash)
          // console.log("crossed that path")
          // while(!hash){
          //   await new Promise(resolve => setTimeout(resolve, 1000));
          //   console.log("the has but this time in hash" + hash)
          // }
          if (transaction) {
            // setHashOfContract(transaction);
            // if(isConfirming){
              // console.log('it is loading')
            // }
            // console.log(isPending);
            // console.log(isConfirmed)
            // console.log(isError)
            await new Promise(resolve => setTimeout(resolve, 5000));
            // while(isPending){
            //   await new Promise(resolve => setTimeout(resolve, 1000));
            //   console.log('value of confirm trans' , confirmTrans)
            //    console.log('in here in the while lolp first one')
            //    console.log(receipt)
            //    console.log('fetching ingo ' , isFetching)
            //    console.log('fetched info ' , isFetched)
            //    console.log('error info' , isError)
            //    console.log(isPending);
            // console.log(isConfirmed)
            // }
            
            //  while (!isConfirmed) {
            //     await new Promise(resolve => setTimeout(resolve, 1000));
            //    console.log('in here in the while lolp')
            //   }
            console.log('here createion')
            // console.log(hash)
            const response = await uploadNftAction(formData1);
            setIsLoading(false);
            // if (!response) {
            //   throw new Error('No response from uploadNftAction');
            // }
            console.log('in here')
            // if ('success' in response && response.success) {
              toast({
                title: "Operation Success",
                description: "Your NFT has been successfully minted.",
                duration: 2000,
                style: {
                  backgroundColor: '#4CAF50',
                  color: 'white',
                  fontFamily: 'Manrope',
                },
              })
              // push('/bitsi-nft');
            // }
            // else if ('error' in response && response.error) {
            //   toast({
            //     title: "Operation Failed",
            //     description: response.error,
            //     duration: 2000,
            //     style: {
            //       backgroundColor: '#900808',
            //       color: 'white',
            //       fontFamily: 'Manrope',
            //     },
            //   })
            // } 
          } 
          else if(!transaction){
            toast({
              title: "Error getting transaction hash",
              description: "Please try again.",
              duration: 2000,
              style: {
                backgroundColor: '#900808',
                color: 'white',
                fontFamily: 'Manrope',
              },
            })
            return;
          }
          console.log('end of the code')
        }
      }
    } catch (error) {
      console.log('in here in the error clasue')
      console.log(error)
      toast({
        title: "Operation Failed",
        description: "Failed to upload NFT. Please try again later.",
        duration: 2000,
        style: {
          backgroundColor: '#900808',
          color: 'white',
          fontFamily: 'Manrope',
        },
      })
      console.log('error')
      setIsLoading(false)
      setShowCheckout(false);
    }
  }

  // useEffect(()=>{
  //   if(receipt){
  //     while(receipt.status != 'success'){
  //       console.log('in here')
  //     }
  //     if(receipt.status === 'success'){
  //       console.log('yay success');
  //       setConfirmTrans(true);
  //     }
  //   }
  // } , [ hashOfContract])
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
                  <FormRow className='p-4 md:px-8 w-fit h-fit'>
                    <p className='text-white font-montserrat font-semibold text-[22px] mb-2'>Upload Here*</p>
                    <input type='file' name='nftFile' className='hidden' id='nftFile' accept=".jpg,.png,.svg,.mp4,.gif" onChange={handleOnChange} />

                    <label htmlFor="nftFile" className='w-fit h-fit'>
                      <div className='bg-success-520 bg-opacity-55 border-2 border-dotted border-success-506 justify-center items-center cursor-pointer'>
                        <div className='lg:p-24 sm:p-16 flex flex-col items-center justify-center max-sm:p-14'>
                          <Image src='/icons/Upload-file-icon.png' height={32} width={32} alt='upload' />
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
                <div className='sm:w-1/2   flex flex-col p-2 px-8'>
                  <p className='text-white font-montserrat text-[22px] font-semibold'>Preview here</p>
                  <p className='text-white font-montserrat text-[22px] font-thin text-opacity-66'>Uploaded pic will be shown here</p>
                  <div className=' p-2 max-w-[570px] max-h-[262px] bg-success-503 secondary-shadow11 rounded-xl flex items-center justify-center'>
                    <Image src={previewTemp} height={229} width={521} alt='image' className='max-w-full max-h-full overflow-hidden' />
                  </div>
                </div>
              </div>

              <div className='flex justify-between  max-sm:flex-col sm:mb-0 gap-2  '>
                <FormRow className='sm:w-1/2 p-4 md:px-8'>
                  <FormLabel htmlFor='name' className='font-montserrat text-white text-[22px] font-semibold'>Name Of Your NFT*</FormLabel>
                  <InputText id='name' name='name' type='text' placeHolder='eg-cratoNFT' className='p-3' />
                  {errorMessageName && <p className='text-success-517 text-[11px] font-normal'>{errorMessageName}*</p>}
                </FormRow>
                <FormRow className='sm:w-1/2 p-4 md:px-8'>
                  <FormLabel htmlFor='price' className='font-montserrat text-white text-[22px] font-semibold'>Price*</FormLabel>
                  <InputText id='price' name='price' step="0.01" type='number' placeHolder='1-BITSI' className='p-3 no-spinners' />
                  {priceErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{priceErrorMessage}*</p>}
                </FormRow>
              </div>
              <div className='flex justify-between max-sm:flex-col sm:mb-10 gap-2 '>
                <FormRow className='sm:w-1/2 p-4 md:px-8'>
                  <FormLabel htmlFor='collection' className='font-montserrat text-white text-[22px] font-semibold'>Collection*</FormLabel>
                  {/* <InputText id = 'collection' name = 'collection' type='text' placeHolder='Please enter the name of your collection' className='p-3' /> */}
                  <input id='collection' name='collection' type='text' placeholder='' className='hidden' value={collection} />
                  <CollectionCombobox setCollectionValue={setColleciton} />
                  {collectionErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{collectionErrorMessage}*</p>}
                </FormRow>
                <FormRow className='sm:w-1/2 p-4 md:px-8'>
                  <FormLabel htmlFor='royalties' className='font-montserrat text-white text-[22px] font-semibold'>Royalties*</FormLabel>
                  <InputText id='royalties' name='royalties' step="0.01" type='number' placeHolder='Suggested 0. 10%, 20%, 30%, 40% MAX is 70%' className='p-3 no-spinners' />
                  {royaltiesErrorMessage && <p className='text-success-517 text-[11px] font-normal '>{royaltiesErrorMessage}*</p>}
                </FormRow>
              </div>
              <div className='flex max-sm:flex-col sm:items-center sm:mb-10 gap-2  '>
                <FormRow className='sm:w-1/2 p-4 md:px-8'>
                  <FormLabel htmlFor='name' className='font-montserrat text-white text-[22px] font-semibold'>Description</FormLabel>
                  <InputText id='description' name='description' type='text' placeHolder='Describe about your NFT' className='p-6' />
                </FormRow>
                <div className='h-fit sm:w-1/2 place-content-center items-center max-sm:p-4'>
                  <button className='text-white max-sm:w-full  bg-success-513 sm:px-24  sm:ml-10 lg:px-48  py-4 sm:mt-6 rounded-xl text-[20px]'>MINT
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        {/* <CreateNftForm /> */}
      </section>

      {showCheckout && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
          <div className=' z-50 flex justify-center items-center sm:max-w-[425px] bg-white p-5 max-sm:p-3'>
            <div className='flex flex-col gap-3'>
              <div className='flex justify-between'>
                <p className="text-black font-montserrat  font-bold">Checkout</p>
                <Image src='/icons/cross-icons.svg' height={25} width={25} alt='remove' onClick={() => { setShowCheckout(false) }} />
              </div>
              <p className="font-semibold text-black font-montserrat ">Selected Item:</p>
              <div className="flex items-center p-3 border-2 border-success-511 gap-3">
                <Image src='/icons/nft-desc.png' height={63.48} width={70} alt="nft image" />
                <div className="flex flex-col gap-2">
                  <p className="text-black font-manrope font-bold text-[22px]">Minions Serious Eye</p>
                  <div className="flex">
                    <p className="text-black text-[12px] font-montserrat font-semibold">Royality&nbsp;</p>
                    <p className=" bg-nft-text-gradient bg-clip-text text-transparent text-[12px] font-montserrat font-semibold">35%&nbsp;</p>
                    <p className="text-black text-[12px] font-montserrat font-semibold">Collection&nbsp;</p>
                    <p className="bg-nft-text-gradient bg-clip-text text-transparent text-nft-text-gradient text-[12px] font-montserrat font-semibold">Luxury</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 ">
                <Checkbox className=" bg-success-521 checked:bg-success-521 " />
                <p className="font-mulish text-[10px]">I agree to the <Link href='/abcdr'><span className="underline text-success-522 font-bold">INSURANCE</span></Link></p>

              </div>

              <div className="flex flex-col border-2 border-success-511 p-4 gap-5">
                <div className="flex justify-between">
                  <p className="text-black font-montserrat font-semibold">Your Balance</p>
                  <p className="text-black font-montserrat font-semibold">0.55 Matic</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-black font-montserrat font-semibold">NFT Price</p>
                  <p className="text-black font-montserrat font-semibold">0.9 Matic</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-black font-montserrat font-semibold">Insurance Price</p>
                  <p className="text-black font-montserrat font-semibold">1.02 Matic</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-black font-montserrat font-semibold">Total Price</p>
                  <p className="text-black font-montserrat font-semibold">1.11 Matic</p>
                </div>
                <div className="self-center">
                  <button onClick={handleMintNft} disabled={isLoading} className={` ${isLoading ? 'bg-gray-600' : 'bg-nft-text-gradient'} font-montserrat text-white font bold sm:min-w-[350px] py-4 sm:px-28 max-sm:px-14 text-[22px]  font-bold rounded-xl `}>{isLoading ? 'Loading...' : 'Buy'}</button>
                </div>
              </div>
            </div>
          </div></div>
      )}
    </>
  )
}

export default UploadNFt