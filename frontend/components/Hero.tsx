import React from 'react'
import Image from 'next/image'
import { CarouselRoot } from './CarouselRoot'
import VideoPlayer from './VideoPlayer';
import { CarouselVideoHeroHome } from './CarouselVideoHeroHome';
import MarqueeHomeHero from './MarqueeHomeHero';

const Hero = () => {
  const videoJsOptions = {
    sources: [{
      src: 'https://res.cloudinary.com/djdrlor2w/video/upload/v1721975440/bitsi_new_vid_bbp4po.mp4',
      type: 'video/mp4'
    }],
    auto : true,  
    preload : 'auto',

    width: 450,
    height: 600
  };
  return (
    
  <section className='bg-hero-image bg-current bg-cover   bg-no-repeat '>
    <div className='w-full h-[100px] max-md:max-h-[50px]'>
    </div>

    <div className='grid grid-cols-2  max-md:grid-cols-1'>
      <div className='p-8 max-md:p-4 h-full w-full lg:mb-14'>
    <div className=' flex flex-col gap-2'>
        <p className='custom-lg:text-[52px] xl:text-[64px]  lg:max-w-none md:max-text-[44px] md:text-[32px] max-sm:text-[26px] sm:text-[25px]  font-montserrat font-semibold text-white mb-2'>Buy And Sell Digital Art, NFT Collection & Coin </p>
        <div className='flex gap-4'>
        <button className='hover:bg-success-509 bg-success-506 text-black font-inter w-fit rounded-xl max-md:rounded-xl p-2 max-md:text-[16px] md:p-4 font-semibold md:px-4 xl:px-8'>Explore Us</button>
        <button className='hover:bg-success-509 text-success-506 border-success-506 border-2 font-inter w-fit rounded-xl max-md:rounded-xl p-2 max-md:text-[16px] md:p-4 font-semibold md:px-4 xl:px-8'>Contact Us</button>
        </div>
        <div className='mt-10 lg:-mb-10'>
          <MarqueeHomeHero />
        {/* <CarouselRoot /> */}
        </div>
      </div>
      </div>

      <div className='h-full flex-col flex mt-4  p-4  opacity-85 max-h-[490px] max-w-[750px]'>
        {/* <video src='/icons/nft-vid-2.mp4' /> */}
        {/* <VideoPlayer options={videoJsOptions} /> */}
        <CarouselVideoHeroHome />
      {/* <Image src = '/icons/nft-thumbnail.png' height={400} width={650} alt = 'video icon' className=' opacity-90 custom-xxl:h-[600px] custom-xxl:w-[840px]' />  */}
      </div>

    </div>
  </section>
  )
}

export default Hero