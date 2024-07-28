'use client'
import { CardNftMyProfileProps, nftInUserZone } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import { usePathname } from 'next/navigation';
// import VideoPlayer from './VideoPlayer';



const CardNftMyProfile = ({ collection, nft_collection_name , nft_image, nft_name  }: nftInUserZone) => {
    // const videoOptions = {
    //     sources: [
    //       {
    //         src: nftImg, 
    //         type: 'video/mp4',
    //       },
    //     ],
    //     width: '299px', 
    //     height: '254px', 
    //   };
    const currPath = usePathname();
    const [isClient, setIsClient] = useState(false);
    const getFileExtension = (url: string): string => {
        return url.split('.').pop()!.toLowerCase();
    }

    useEffect(() => {
        setIsClient(true);
    }, []);
    const extension = getFileExtension(nft_image);
    const [checkbox , setCheckbox] = useState(false);

    return (
        <div className='h-full secondary-shadow11 bg-success-512 max-w-[420px] max-h-[370px] gap-2 2xl:max-h-full flex flex-col rounded-2xl p-1 hover:bg-success-509'>
             
            {isClient && (<>
                <div  className='h-full'>
            {((extension != 'mp4' )&&<Image src={nft_image} height={254} width={299} alt='NFT IMAGE' className='rounded-xl h-full max-h-[254px]' />)}
            {((extension == 'mp4' && isClient ) && <video height={254}  width={299} className='rounded-xl overflow-hidden h-full'  autoPlay loop muted><source src={nft_image} type="video/mp4" /> Your browser does not support the video tag.</video> )}
            {/* {(extension == 'mp4') && <VideoPlayer options={videoOptions} />} */}
            </div>
            <div className='  bg-success-509 bg-opacity-30  items-center   flex justify-between rounded-xl p-2'>
                <div className='flex flex-col -mt-1'>
                    <p className='text-white font-manrope max-text-[20px] font-semibold'>{nft_name}</p>
                    <p className='font-manrope max-text-[18px] text-white'>Collection: <span>{nft_collection_name.slice(0, 17)}{nft_collection_name.length > 17 ? '.....' : ''}</span></p>
                </div>
            </div>
            </>)}

        </div>
       
    )
}

export default CardNftMyProfile