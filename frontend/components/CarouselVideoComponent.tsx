import Image from 'next/image';
import React from 'react'
import VideoPlayer from './VideoPlayer';

const CarouselVideoComponent = ({ current, count }: { current: number, count: number }) => {
    const videoJsOptions = {
        sources: [{
          src: 'https://res.cloudinary.com/djdrlor2w/video/upload/v1721975440/bitsi_new_vid_bbp4po.mp4',
          type: 'video/mp4'
        }],
        auto : false,  
        // preload : 'auto',
    
        width: 450,
        height: 600
      };
    let elements: string[] = [];
    let widthArr : number[]=[]
    for (let i = 1; i <= count; i++) {
        if (i == current) {
            elements[i] = '/icons/slider-selected-hero.svg'
            widthArr[i] = 45
        } else {
            elements[i] = '/icons/Ellipse_2164.svg'
            widthArr[i] = 15
        }
    }
    return (
        // <div className='h-[100vh] flex flex-col  justify-center p-4 max-md:hidden opacity-85 max-h-[490px] max-w-[750px]'>
            <>
            <div className='custom-lg:h-[80vh] md:h-[20vh] max-h-[400px]'>
             <VideoPlayer  options={videoJsOptions} /></div>
              <div className='flex items-center  py-2 mb-4 justify-center gap-1'>
                 {elements.map((item, index) => {
                    return (
                        <Image src={item} height={45} width={widthArr[index]} alt='image tag' key={index} />
                    )
                })}
            </div> 
             </>
            /* <div className='flex items-center  py-2 mb-4 justify-center gap-2'>
                {elements.map((item, index) => {
                    return (
                        <Image src={item} height={15} width={15} alt='image tag' key={index} />
                    )
                })}
            </div> */
    /* </div> */
    )
}

export default CarouselVideoComponent