
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'

const CreateNFT = () => {
  
  return (
    <>
    <div className='navbar-space'></div>
    <div className='bg-gen-nft bg-cover bg-current opacity-90 '>
        <div className='flex'>
            <div className='custom-lg:w-1/2 max-md:w-full'>
                <div className='flex flex-col py-12 max-md:py-6 px-8'>
                    <h1 className='text-success-511 text-[38px] font-bold font-montserrat max-md:text-[24px]'>Generate NFT</h1>
                    <p className='text-white opacity-40 text-[22px] max-md:text-[14px] mt-2'>Please Choose any one from below to proceed</p>
                </div>

                <div className='grid grid-rows-2 px-8 max-md:px-3'>
                <div className='flex flex-col '>
                <Link href={`/create-nft/upload`}> <div className='flex gap-3 '>
                <Image src = '/icons/upload-icon.svg' height={48} width={48} alt='upload icon' />
                <h1 className='text-white text-[38px] max-md:text-[24px] font-semibold hover:text-red-500'>Upload</h1>
                </div></Link>

                
                <div className='flex justify-between bg-white bg-opacity-40 rounded-2xl md:mt-4 max-md:mt-2 p-4 mb-3 '>
                    <p className='w-11/12  text-white opacity-60 max-xl:text-[15px] xl:text-[20px] max-custom-lg:text-[20px]'>Here, you can upload your NFT in various formats including MP4, JPG, and SVG, ensuring your digital assets are versatile and accessible to a wide audience.</p>
                  <Link className='flex items-center h-full w-fit' href={`/create-nft/upload`}><Image src = '/icons/arrow-right.svg' width={50} height={50} alt = 'arrow'   /></Link>
                </div>
                </div>
                <div className='flex flex-col '>
                <Link href={`/create-nft/generate-with-ai`}>
                    <div className='flex gap-3'>
                <Image src = '/icons/stars-AI.svg' height={48} width={48} alt='AI icon' />
                <h1 className='text-white md:text-[38px] max-md:text-[24px] font-semibold hover:text-red-500'>Generate With AI</h1>
                </div></Link>
                <div className='flex justify-between bg-white bg-opacity-40 rounded-2xl md:mt-4 max-md:mt-2 p-4 mb-3'>
                    <p className='w-11/12  text-white opacity-60 max-xl:text-[15px]  xl:text-[20px] max-custom-lg:text-[20px]'>Now you can generate an NFT with our specialized AI, creating unique digital assets effortlessly and ready for sale on our platform.  </p>
                    <Link className='flex items-center h-full w-fit' href={`/create-nft/generate-with-ai`}><Image src = '/icons/arrow-right.svg' width={50} height={50} alt = 'arrow' /></Link>
                </div>
                </div>
                </div>
            </div>
            <div className='custom-lg:w-1/2 flex justify-end lg:p-8'>
            <div className='p-8 mb-8 max-custom-lg:hidden max-lg:mt-28'>
            <Image src = '/icons/nft-img-bits-nft.png' width={516} height={502} alt = 'nft logo' />
            </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default CreateNFT