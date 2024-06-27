'use client'
import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from 'next/image'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import CoinPriceHeroLandingPage from "./CoinPriceHeroLandingPage"

export function CarouselNft({selectedItems} : {selectedItems : number}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction : false  })
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className=""
    >
      <CarouselContent>
        <CarouselItem>
        <div className='flex max-lg:flex-col '>

          <div className='lg:w-1/2 p-8 max-lg:p-4 max-md:p-2 '>
            <p className='bg-success-513 rounded-3xl font-bold font-manrope w-fit px-4 py-2 mb-3 text-[22px] text-white '>{selectedItems} Selected</p>
            <Image src='/icons/nft-desc.png' height={546} width={604} alt='NFT IMAGE' />
          </div>
          <div className='lg:w-1/2  flex flex-col p-8 max-md:p-2 max-lg:p-4 '>
            <div className='flex justify-between items-center'>
              <h4 className='font-manrope font-semibold lg:text-[32px] max-md:text-[14px] md:text-[22px] text-success-513 '>Minions Serious EYE</h4>
              <Image src='/icons/shrae-icon.svg' height={32} width={31.72} alt='Share' />
            </div>
            <p className='text-success-516 text-[22px] text-opacity-40 max-md:text-[16px] font-montserrat font-semibold md:mt-8 max-md:mt-2'>Own a unique digital minion NFT! Each minion comes with distinct traits and exclusive artwork, making it a one-of-a-kind collectible on the blockchain.</p>
            <div className='flex justify-between lg:mt-8 max-lg:mt-4'>
              <div className='flex flex-col gap-4 max-lg:gap-2'>
                <p className='text-white font-montserrat font-semibold text-[22px] max-md:text-[14px]'>Owned By</p>
                <div className='flex gap-2'>
                  <Image src='/icons/profile-icon.svg' height={25} width={25} alt='profile' />
                  <p className='text-success-516 text-opacity-40  font-manrope text-[22px] max-md:text-[14px]'>User Name</p>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-white font-montserrat font-semibold text-[22px] max-md:text-[14px]'>Created By</p>
                <div className='flex gap-2'>
                  <Image src='/icons/profile-icon.svg' height={25} width={25} alt='profile' />
                  <p className='text-success-516 text-opacity-40  font-manrope text-[22px] max-md:text-[14px]'>User Name</p>
                </div>
              </div>
            </div>
            <div className='mt-8 max-md:mt-3'>
              <p className='text-success-513 font-semibold font-manrope text-[28px] max-md:text-[20px] mb-8 max-md:mb-4'>Properties</p>
              <div className='flex gap-4 max-md:grid max-md:grid-cols-2 md:mb-6 max-md:mb-3 items-center '>
                <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
                  <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]' >Royalities</p>
                  <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>35%</p>
                </div>
                <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
                  <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]'>Collection Name</p>
                  <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>Galaxy</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        </CarouselItem>
        <CarouselItem>
        <div className='flex max-lg:flex-col '>

          <div className='lg:w-1/2 p-8 max-lg:p-4 max-md:p-2 '>
            <p className='bg-success-513 rounded-3xl font-bold font-manrope w-fit px-4 py-2 mb-3 text-[22px] text-white '>{selectedItems} Selected</p>
            <Image src='/icons/nft-hand-gradient.svg' height={546} width={604} alt='NFT IMAGE' />
          </div>
          <div className='lg:w-1/2  flex flex-col p-8 max-md:p-2 max-lg:p-4 '>
            <div className='flex justify-between items-center'>
              <h4 className='font-manrope font-semibold lg:text-[32px] max-md:text-[14px] md:text-[22px] text-success-513 '>Minions Serious EYE</h4>
              <Image src='/icons/shrae-icon.svg' height={32} width={31.72} alt='Share' />
            </div>
            <p className='text-success-516 text-[22px] text-opacity-40 max-md:text-[16px] font-montserrat font-semibold md:mt-8 max-md:mt-2'>Own a unique digital minion NFT! Each minion comes with distinct traits and exclusive artwork, making it a one-of-a-kind collectible on the blockchain.</p>
            <div className='flex justify-between lg:mt-8 max-lg:mt-4'>
              <div className='flex flex-col gap-4 max-lg:gap-2'>
                <p className='text-white font-montserrat font-semibold text-[22px] max-md:text-[14px]'>Owned By</p>
                <div className='flex gap-2'>
                  <Image src='/icons/profile-icon.svg' height={25} width={25} alt='profile' />
                  <p className='text-success-516 text-opacity-40  font-manrope text-[22px] max-md:text-[14px]'>User Name</p>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-white font-montserrat font-semibold text-[22px] max-md:text-[14px]'>Created By</p>
                <div className='flex gap-2'>
                  <Image src='/icons/profile-icon.svg' height={25} width={25} alt='profile' />
                  <p className='text-success-516 text-opacity-40  font-manrope text-[22px] max-md:text-[14px]'>User Name</p>
                </div>
              </div>
            </div>
            <div className='mt-8 max-md:mt-3'>
              <p className='text-success-513 font-semibold font-manrope text-[28px] max-md:text-[20px] mb-8 max-md:mb-4'>Properties</p>
              <div className='flex gap-4 max-md:grid max-md:grid-cols-2 md:mb-6 max-md:mb-3 items-center '>
                <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
                  <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]' >Royalities</p>
                  <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>35%</p>
                </div>
                <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
                  <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]'>Collection Name</p>
                  <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>Galaxy</p>
                </div>
              </div>

            </div>
          </div>
        </div>
        </CarouselItem>
        <CarouselItem>
        <div className='flex max-lg:flex-col '>

          <div className='lg:w-1/2 p-8 max-lg:p-4 max-md:p-2 '>
            <p className='bg-success-513 rounded-3xl font-bold font-manrope w-fit px-4 py-2 mb-3 text-[22px] text-white '>{selectedItems} Selected</p>
            <Image src='/icons/nft-girl-looking.svg' height={546} width={604} alt='NFT IMAGE' />
          </div>
          <div className='lg:w-1/2  flex flex-col p-8 max-md:p-2 max-lg:p-4 '>
            <div className='flex justify-between items-center'>
              <h4 className='font-manrope font-semibold lg:text-[32px] max-md:text-[14px] md:text-[22px] text-success-513 '>Minions Serious EYE</h4>
              <Image src='/icons/shrae-icon.svg' height={32} width={31.72} alt='Share' />
            </div>
            <p className='text-success-516 text-[22px] text-opacity-40 max-md:text-[16px] font-montserrat font-semibold md:mt-8 max-md:mt-2'>Own a unique digital minion NFT! Each minion comes with distinct traits and exclusive artwork, making it a one-of-a-kind collectible on the blockchain.</p>
            <div className='flex justify-between lg:mt-8 max-lg:mt-4'>
              <div className='flex flex-col gap-4 max-lg:gap-2'>
                <p className='text-white font-montserrat font-semibold text-[22px] max-md:text-[14px]'>Owned By</p>
                <div className='flex gap-2'>
                  <Image src='/icons/profile-icon.svg' height={25} width={25} alt='profile' />
                  <p className='text-success-516 text-opacity-40  font-manrope text-[22px] max-md:text-[14px]'>User Name</p>
                </div>
              </div>
              <div className='flex flex-col gap-4'>
                <p className='text-white font-montserrat font-semibold text-[22px] max-md:text-[14px]'>Created By</p>
                <div className='flex gap-2'>
                  <Image src='/icons/profile-icon.svg' height={25} width={25} alt='profile' />
                  <p className='text-success-516 text-opacity-40  font-manrope text-[22px] max-md:text-[14px]'>User Name</p>
                </div>
              </div>
            </div>
            {/* <div className='mt-8 max-md:mt-3'>
              <p className='text-success-513 font-semibold font-manrope text-[28px] max-md:text-[20px] mb-8 max-md:mb-4'>Properties</p>
              <div className='flex gap-4 max-md:grid max-md:grid-cols-2 md:mb-6 max-md:mb-3 items-center '>
                <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
                  <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]' >Royalities</p>
                  <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>35%</p>
                </div>
                <div className='md:w-[264px] bg-success-512  rounded-xl secondary-shadow11 p-2 hover:bg-success-509'>
                  <p className='font-montserrat text-white font-semibold text-[22px] max-md:text-[14px]'>Collection Name</p>
                  <p className='bg-nft-text-gradient font-bold bg-clip-text text-transparent font-montserrat text-[22px] max-md:text-[14px]'>Galaxy</p>
                </div>
              </div>

            </div> */}
          </div>
        </div>
        </CarouselItem>
      </CarouselContent>
     
    </Carousel>
  )
}
