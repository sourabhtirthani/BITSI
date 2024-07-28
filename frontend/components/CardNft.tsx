'use client'
import { NFTCardProps } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox"
import { useAccount } from 'wagmi';


// const DynamicImage = dynamic(() => import('next/image'));
// const DynamicVideo = dynamic(() => import('next/video'));

const CardNft = ({ id, nft_name, nft_price,collectionImage,  nft_owner_address,  nft_image, nft_collection_name , setCheckedItems , checkedItems }: NFTCardProps) => {
    const currPath = usePathname();
    const {address , isConnected} = useAccount();
    const [isClient, setIsClient] = useState(false);
    const getFileExtension = (url: string): string => {
        return url.split('.').pop()!.toLowerCase();
    }

    useEffect(() => {
        setIsClient(true);
    }, []);
    const extension = getFileExtension(nft_image);
    const imgCategory = `/icons/nft-${nft_collection_name}.svg`
    const [checkbox , setCheckbox] = useState(false);

// event: React.FormEvent<HTMLButtonElement>
    const handleCheckboxChange = () => {
        console.log('in here ')
        // const target = event.target as HTMLInputElement;
        setCheckbox((checkbox) => !checkbox);
        if (!checkbox) {
            setCheckedItems((prevCheckedItems) => [...prevCheckedItems, id.toString()]);
        } else {
            setCheckedItems((prevCheckedItems) => prevCheckedItems.filter(item => item !== id.toString()));
        }
      };
    return (
        <div className='h-full secondary-shadow11 bg-success-512 max-w-[420px] max-h-[370px] gap-2 2xl:max-h-full flex flex-col rounded-2xl p-1 hover:bg-success-509'>
             
            {isClient && (<>
                <Link href={`${currPath}/${id}`} className='h-full'>
            {((extension != 'mp4' && isClient )&&<Image src={nft_image} height={254} width={299} alt='NFT IMAGE' className='rounded-xl max-h-[254px] h-full' />)}
            {((extension == 'mp4' && isClient ) && <video height={254}  width={299} className='rounded-xl overflow-hidden h-full'  autoPlay loop muted><source src={nft_image} type="video/mp4" /> Your browser does not support the video tag.</video> )}
            {/* {extension == 'mp4' && VideoPlayer/>} */}
            </Link>
            <Image src={collectionImage} height={24} width={24} alt='NFT IMAGE' className='absolute mt-2 ml-4 ' />
            <div className='  bg-success-509 bg-opacity-30  items-center   flex justify-between rounded-xl p-2'>
                <div className='flex flex-col   -mt-1'>
                    <p className='text-white font-manrope max-text-[20px] font-semibold'>{nft_name}</p>
                    <p className='font-manrope max-text-[18px] text-white'>Floor <span>{nft_price} BITSI</span></p>
                </div>
                {/* the div in the next line will be removed if the checkbox or the buy button is removed */}
                <div className='flex items-center gap-2'> 
                {/* <Link href={`${currPath}/${id}`} className='h-full'>
                <button className='bg-success-513 py-2.5 px-3 mt-0.5  text-white text-[14px] rounded-xl'>Buy</button></Link> */}
                {/* <input type='checkbox'  onChange={(e)=>{handleCheckboxChange(e)}}  className={`border-2 border-white text-white ${!checkbox ? 'opacity-10' : ''} md:size-7 max-md:size-5`} /> */}
                {address === nft_owner_address? <div className='w-fit h-fit text-white bg-red-500 rounded- font-montserrat text-[12px] px-1 py-1.5' style={{ borderRadius: '0.45rem' }}>Owned</div>: 
                <div className='text-white'>
                <Checkbox defaultChecked={checkedItems?.includes(id.toString())} onCheckedChange={handleCheckboxChange}  />
                </div>}
                </div>
            </div>
            </>)}

        </div>
       
    )
}

export default CardNft