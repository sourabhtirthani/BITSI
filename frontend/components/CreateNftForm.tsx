// 'use client'
// import React, { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { z } from "zod"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import CustomInput from './CustomInput';
// import { uploadNftformSchema } from '@/lib/utils';
// import Image from 'next/image'
// import { CollectionCombobox } from './CollectionCombobox'
// // import { Loader2 } from 'lucide-react';
// // import { useRouter } from 'next/navigation';

// // {typeOfForm} : {typeOfForm : 'own' | 'AI'}

// const CreateNftForm = () => {
//     const [collection, setColleciton] = useState('');
//     const [preview, setPreview] = useState<string>('/icons/default-nft-preview.png');
//     const form = useForm<z.infer<typeof uploadNftformSchema>>({
//         resolver: zodResolver(uploadNftformSchema),
//     })
//     const [btnLoading, setBtnLoading] = useState(false);


//     const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         const filePre = new FileReader;
//         const file = event.target.files?.[0];
//         console.log('in here in the handleonchange')
//         if (file) {
//           const fileReader = new FileReader();
    
//           fileReader.onload = () => {
//             if (typeof fileReader.result === 'string') {  //conditional for string
//               setPreview(fileReader.result);
//             }
//           };
    
//           fileReader.readAsDataURL(file); // Read the file as a data URL
//         }
    
//         // filePre.readAsDataURL(tar)
    
//       }


//     const onSubmit = async (data: z.infer<typeof uploadNftformSchema>) => {
//       console.log('in here in the onsubmit funtuon ')
//         console.log(data);
//     }
//     return (
//         <div>
//              <Form {...form}>
//             <form onSubmit={form.handleSubmit(onSubmit)}>
//             <div className='flex flex-col'>
//             <div className='flex justify-between  max-sm:flex-col'>
//                 <div className='sm:w-1/2'>
//                   <div className='p-4 md:px-8 w-fit h-fit'>
//                     <p className='text-white font-montserrat font-semibold text-[22px] mb-2'>Upload Here*</p>
//                     {/* <input type='file' name='nftFile' className='hidden' id='nftFile' accept=".jpg,.png,.svg,.mp4,.gif" onChange={handleOnChange} /> */}
//                     <CustomInput control={form.control} formLabel='' nameOfField='nftFile' placeHolder=''  />
//                     <label htmlFor="nftFile" className='w-fit h-fit'>
//                       <div className='bg-success-520 bg-opacity-55 border-2 border-dotted border-success-506 justify-center items-center cursor-pointer'>
//                         <div className='lg:p-24 sm:p-16 flex flex-col items-center justify-center max-sm:p-14'>
//                           <Image src='/icons/Upload-file-icon.png' height={32} width={32} alt='upload' />
//                           <p className='text-white text-[12px] font-montserrat font-semibold '>Max Size : 50MB</p>
//                           <p className='text-white text-[12px] font-montserrat font-semibold'>JPG,&nbsp;SVG,&nbsp;PNG,&nbsp;GIF,&nbsp;SV4</p>
//                         </div>
//                       </div>
//                     </label>
//                     {/* {errorMessageNftFile && <p className='text-success-517 text-[11px] font-normal'>{errorMessageNftFile}*</p>} */}

//                     <p className='text-[12px] text-white text-opacity-65 mt-4 font-thin'>Note: Once your NTF is Minted You can&apos;t be changed any details </p>
//                   </div>
//                 </div>
//                 <div className='sm:w-1/2   flex flex-col p-2 px-8'>
//                   <p className='text-white font-montserrat text-[22px] font-semibold'>Preview here</p>
//                   <p className='text-white font-montserrat text-[22px] font-thin text-opacity-66'>Uploaded pic will be shown here</p>
//                   <div className=' p-2 max-w-[570px] max-h-[262px] bg-success-503 secondary-shadow11 rounded-xl flex items-center justify-center'>
//                     <Image src={preview} height={229} width={521} alt='image' className='max-w-full max-h-full overflow-hidden' />
//                   </div>
//                 </div>
//               </div>
            
//             <div className='flex justify-between  max-sm:flex-col sm:mb-0 gap-2  '>
//                 <div className='sm:w-1/2 p-4 md:px-8'>
//                   {/* <FormLabel htmlFor='name' className='font-montserrat text-white text-[22px] font-semibold'>Name Of Your NFT*</FormLabel> */}
//                   {/* <InputText id='name' name='name' type='text' placeHolder='eg-cratoNFT' className='p-3' /> */}
//                   <CustomInput control={form.control} formLabel='Name Of Your NFT' nameOfField='name' placeHolder='eg-cratoNFT'  />
//                 </div>
//                 <div className='sm:w-1/2 p-4 md:px-8'>
//                   {/* <FormLabel htmlFor='price' className='font-montserrat text-white text-[22px] font-semibold'>Price*</FormLabel> */}
//                   {/* <InputText id='price' name='price' type='text' placeHolder='1-BITSI' className='p-3' /> */}
//                   <CustomInput control={form.control} formLabel='Price' nameOfField='price' placeHolder='1-BITSI'  />
                
//                 </div>
//               </div>
//               <div className='flex justify-between max-sm:flex-col sm:mb-10 gap-2 '>
//                 <div className='sm:w-1/2 p-4 md:px-8'>
//                 <CustomInput control={form.control} formLabel='' nameOfField='collection' placeHolder=''  />
//                   {/* <FormLabel htmlFor='collection' className='font-montserrat text-white text-[22px] font-semibold'>Collection*</FormLabel> */}
//                   {/* <InputText id = 'collection' name = 'collection' type='text' placeHolder='Please enter the name of your collection' className='p-3' /> */}
//                   {/* <input id='collection' name='collection' type='text' placeholder='' className='hidden' value={collection} /> */}
//                   <CollectionCombobox setCollectionValue={setColleciton} />
//                   {/* {collectionErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{collectionErrorMessage}*</p>} */}
//                 </div>
//                 <div className='sm:w-1/2 p-4 md:px-8'>
//                 <CustomInput control={form.control} formLabel='Royalties' nameOfField='royalties' placeHolder='Suggested 0. 10%, 20%, 30%, 40% MAX is 70%'  />
//                   {/* <FormLabel htmlFor='royalties' className='font-montserrat text-white text-[22px] font-semibold'>Royalties*</FormLabel> */}
//                   {/* <InputText id='royalties' name='royalties' type='text' placeHolder='Suggested 0. 10%, 20%, 30%, 40% MAX is 70%' className='p-3' /> */}
//                   {/* {royaltiesErrorMessage && <p className='text-success-517 text-[11px] font-normal '>{royaltiesErrorMessage}*</p>} */}
//                 </div>
//               </div>
//               <div className='flex max-sm:flex-col sm:items-center sm:mb-10 gap-2  '>
//                 <div className='sm:w-1/2 p-4 md:px-8'>
//                 <CustomInput control={form.control} formLabel='Description' nameOfField='description' placeHolder='Describe about your NFT'  />
//                   {/* <FormLabel htmlFor='name' className='font-montserrat text-white text-[22px] font-semibold'>Description</FormLabel> */}
//                   {/* <InputText id='description' name='description' type='text' placeHolder='Describe about your NFT' className='p-6' /> */}
//                 </div>
//                 <div className='h-fit sm:w-1/2 place-content-center items-center max-sm:p-4'>
//                   <button className='text-white max-sm:w-full  bg-success-513 sm:px-24  sm:ml-10 lg:px-48  py-4 sm:mt-6 rounded-xl text-[20px]' type='submit'>MINT
//                   </button>
//                 </div>
//               </div>
//               </div>
//             </form>
//             </Form>
//         </div>
//     )
// }

// export default CreateNftForm

'use client'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { uploadNftformSchema } from '@/lib/utils';
import Image from 'next/image'
import { CollectionCombobox } from './CollectionCombobox'

const CreateNftForm = () => {
    const [collection, setColleciton] = useState('');
    const [collectionId , setCollectionid] = useState('')
    const [preview, setPreview] = useState<string>('/icons/default-nft-preview.png');
    const form = useForm<z.infer<typeof uploadNftformSchema>>({
        resolver: zodResolver(uploadNftformSchema),
    })
    const [btnLoading, setBtnLoading] = useState(false);

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            if (typeof fileReader.result === 'string') {
              setPreview(fileReader.result);
            }
          };
          fileReader.readAsDataURL(file);
        }
    }

    const onSubmit = async (data: z.infer<typeof uploadNftformSchema>) => {
        console.log(data);
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className='flex flex-col'>
                        <div className='flex justify-between max-sm:flex-col'>
                            <div className='sm:w-1/2'>
                                <div className='p-4 md:px-8 w-fit h-fit'>
                                    <p className='text-white font-montserrat font-semibold text-[22px] mb-2'>Upload Here*</p>
                                    <CustomInput control={form.control} formLabel='' nameOfField='nftFile' placeHolder='' onChange={handleOnChange} />
                                    <label htmlFor="nftFile" className='w-fit h-fit'>
                                        <div className='bg-success-520 bg-opacity-55 border-2 border-dotted border-success-506 justify-center items-center cursor-pointer'>
                                            <div className='lg:p-24 sm:p-16 flex flex-col items-center justify-center max-sm:p-14'>
                                                <Image src='/icons/Upload-file-icon.png' height={32} width={32} alt='upload' />
                                                <p className='text-white text-[12px] font-montserrat font-semibold '>Max Size : 50MB</p>
                                                <p className='text-white text-[12px] font-montserrat font-semibold'>JPG,&nbsp;SVG,&nbsp;PNG,&nbsp;GIF,&nbsp;SV4</p>
                                            </div>
                                        </div>
                                    </label>
                                    <p className='text-[12px] text-white text-opacity-65 mt-4 font-thin'>Note: Once your NTF is Minted You can&apos;t change any details</p>
                                </div>
                            </div>
                            <div className='sm:w-1/2 flex flex-col p-2 px-8'>
                                <p className='text-white font-montserrat text-[22px] font-semibold'>Preview here</p>
                                <p className='text-white font-montserrat text-[22px] font-thin text-opacity-66'>Uploaded pic will be shown here</p>
                                <div className='p-2 max-w-[570px] max-h-[262px] bg-success-503 secondary-shadow11 rounded-xl flex items-center justify-center'>
                                    <Image src={preview} height={229} width={521} alt='image' className='max-w-full max-h-full overflow-hidden' />
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between max-sm:flex-col sm:mb-0 gap-2'>
                            <div className='sm:w-1/2 p-4 md:px-8'>
                                <CustomInput control={form.control} formLabel='Name Of Your NFT' nameOfField='name' placeHolder='eg-cratoNFT' />
                            </div>
                            <div className='sm:w-1/2 p-4 md:px-8'>
                                <CustomInput control={form.control} formLabel='Price' nameOfField='price' placeHolder='1-BITSI' />
                            </div>
                        </div>
                        <div className='flex justify-between max-sm:flex-col sm:mb-10 gap-2'>
                            <div className='sm:w-1/2 p-4 md:px-8'>
                                <CustomInput control={form.control} formLabel='' nameOfField='collection' placeHolder='' />
                                <CollectionCombobox setCollectionValue={setColleciton} setCollectionId = {setCollectionid} />
                            </div>
                            <div className='sm:w-1/2 p-4 md:px-8'>
                                <CustomInput control={form.control} formLabel='Royalties' nameOfField='royalties' placeHolder='Suggested 0. 10%, 20%, 30%, 40% MAX is 70%' />
                            </div>
                        </div>
                        <div className='flex max-sm:flex-col sm:items-center sm:mb-10 gap-2'>
                            <div className='sm:w-1/2 p-4 md:px-8'>
                                <CustomInput control={form.control} formLabel='Description' nameOfField='description' placeHolder='Describe about your NFT' />
                            </div>
                            <div className='h-fit sm:w-1/2 place-content-center items-center max-sm:p-4'>
                                <button className='text-white max-sm:w-full bg-success-513 sm:px-24 sm:ml-10 lg:px-48 py-4 sm:mt-6 rounded-xl text-[20px]' type='submit'>MINT</button>
                            </div>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateNftForm;
