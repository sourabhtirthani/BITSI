import Image from 'next/image';
import React from 'react'
import VideoPlayer from './VideoPlayer';

const CarouselVideoComponent = ({ current, count }: { current: number, count: number }) => {
    const videoJsOptions = {
        sources: [{
          src: 'https://res.cloudinary.com/djdrlor2w/video/upload/v1722121730/bitsi_new_vid_cjw9gf.mp4',
          type: 'video/mp4'
        }],
        auto : false,  
        // preload : 'auto',
    
        width: 450,
        height: 600
      };
   
    return (
      
        // <div className='custom-lg:h-[80vh] md:h-[39vh] max-h-[400px]'> 
        //      <VideoPlayer  options={videoJsOptions} /></div>
            <div className='mb-4 mt-4 '>
              <video width={800} height={600} controls>
                <source src="https://res.cloudinary.com/djdrlor2w/video/upload/v1722121730/bitsi_new_vid_cjw9gf.mp4" type="video/mp4" />
                Your browser does not support video.
            </video> </div>
            
    )
}

export default CarouselVideoComponent