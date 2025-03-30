import React from 'react'
import Image from 'next/image'

const HeroNft = () => {
  return (
    <div className='bg-success-503'>
        <div className='flex flex-col mt-4 md:p-8 max-md:p-2'>
            <h1 className='text-success-511 font-montserrat font-semibold text-[38px] max-md:text-[24px]'>Create NFT</h1>
            <p className='text-white font-montserrat text-[28px] max-md:text-[22px]'>Evolve Your Creative Thougths and upload your NFT Here</p>

            <div className='grid grid-cols-4 mt-8'>
            <div className='p-1'>
                <Image src = '/icons/upload-nft-img1.png' height={450} width={350} alt='Upload NFT'/>
            </div>
            <div className='p-1'>
                <Image src = '/icons/upload-nft-img2.png' height={450} width={350} alt='Upload NFT'/>
            </div>
            <div className='p-1'>
                <Image src = '/icons/upload-nft-img3.png' height={450} width={350} alt='Upload NFT'/>
            </div>
            <div className='p-1'>
                <Image src = '/icons/upload-nft-img4.png' height={450} width={350} alt='Upload NFT'/>
            </div>
            
            
            </div>
        </div>

    </div>
  )
}

export default HeroNft