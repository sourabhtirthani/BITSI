import React from 'react'
import Image from 'next/image'
// import { CarouselRoot } from './CarouselRoot'
// import VideoPlayer from './VideoPlayer';
// import { CarouselVideoHeroHome } from './CarouselVideoHeroHome';
// import MarqueeHomeHero from './MarqueeHomeHero';

const Hero = () => {
  // const videoJsOptions = {sources: [{src: 'https://res.cloudinary.com/djdrlor2w/video/upload/v1721975440/bitsi_new_vid_bbp4po.mp4', type: 'video/mp4' }], auto: true, preload: 'auto',width: 450,height: 600 };
  return (
    <section className='bg-success-534 overflow-hidden'>
      <div className='w-full h-[100px] max-md:max-h-[50px]'></div>
      <div className='flex w-full h-full  p-8 max-md:p-4 overflow-clip'>
        <div className='w-3/5 max-md:w-full flex items-center justify-center flex-col font-montserrat  text-white '>
          <p className='text-[4.125rem] max-md:text-[3.12rem] leading-[5.363rem]  font-bold'>Secure Crypto <span className='text-success-511'>Investment</span> for Steady Growth</p>
          <p className='text-[1.313rem] leading-[1.9rem] font-normal'>Crypto combines market-leading protection with a commitment to stable, long-term growth, providing a cryptocurrency experience that values your peace of mind.</p>
        </div>
        <div className='flex w-2/5 max-md:hidden justify-center items-center'>
          <Image src='/icons/hero-home-icon3.png' height={483} width={471} alt='' className='max-lg:h-[350px] max-lg:w-[350px]' />
        </div>
      </div>
    </section>
    // <section className='bg-hero-image bg-current bg-cover   bg-no-repeat '>
    //   <div className='w-full h-[100px] max-md:max-h-[50px]'></div>
    //   <div className='grid grid-cols-2  max-md:grid-cols-1'>
    //     <div className='p-8 max-md:p-4 h-full w-full lg:mb-14'>
    //   <div className=' flex flex-col gap-2'>
    //       <p className='custom-lg:text-[52px] xl:text-[64px]  lg:max-w-none md:max-text-[44px] md:text-[32px] max-sm:text-[26px] sm:text-[25px]  font-montserrat font-semibold text-white mb-2'>Buy And Sell Digital Art, NFT Collection & Coin </p>
    //       <div className='flex gap-4'>
    //       <button className='hover:bg-success-509 bg-success-506 text-black font-inter w-fit rounded-xl max-md:rounded-xl p-2 max-md:text-[16px] md:p-4 font-semibold md:px-4 xl:px-8'>Explore Us</button>
    //       <button className='hover:bg-success-509 text-success-506 border-success-506 border-2 font-inter w-fit rounded-xl max-md:rounded-xl p-2 max-md:text-[16px] md:p-4 font-semibold md:px-4 xl:px-8'>Contact Us</button>
    //       </div>
    //       <div className='mt-10 lg:-mb-10'><MarqueeHomeHero /></div>
    //     </div>
    //     </div>
    //     <div className='h-full flex-col flex mt-4  p-4  opacity-85 max-h-[490px] max-w-[750px]'><CarouselVideoHeroHome /></div>
    //   </div>
    // </section>

  )
}

export default Hero