'use client'
import React, { useState, useEffect } from 'react'

import { buycollectionsTable } from '@/constants';
import { DialogBuy } from '@/components/DialogBuy';
import { CarouselNft } from '@/components/CarouselNft';
import { AlertBoxBuyNfy } from '@/components/AlertBoxBuyNft';
// import { useSearchParams } from 'next/navigation';


const BuyCollection = () => {
  //   const searchParams = useSearchParams();
  //   const [ids, setIds] = useState([]);
  //   const selectedItems : string[] = [];
  //   searchParams.forEach((item) => {
  //     selectedItems.push(item);
  //   })
  const [ids, setIds] = useState<string[]>([]);

  useEffect(() => {
    const selectedItems: string[] = [];
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value) => {
      selectedItems.push(value);
    });

    setIds(selectedItems);
  }, []);
  return (    
    <>
      <div className='navbar-space'></div>
      <section className='bg-success-503'>
        <div className="w-full flex justify-center">
          <div className="w-fit fixed z-30 flex">
            <AlertBoxBuyNfy />
          </div>
        </div>
        <div className='p-8 max-md:p-4'>
          <div className=' bg-success-512 secondary-shadow11'>
        <CarouselNft selectedItems={ids.length} />
        </div>
        </div>
        <div className='p-8 mb-40 max-md:mb-20'>
          <div className='flex   w-fit items-center sm:gap-32 max-sm:gap-20'>
            <div className='flex flex-col justify-between'>
              <p className='text-success-516 text-opacity-50  font-manrope text-[22px] max-md:text-[14px] font-semibold'>Total Price</p>
              <p className='text-white font-montserrat text-[22px] max-md:text-[14px] font-bold'>10 BITSI</p>
            </div>
            {/* <button className='bg-success-513 py-2.5  text-white text-[22px] max-sm:px-10 px-20 rounded-xl'>Buy</button> */}
            <DialogBuy totalItems={ids?.length} buttonName='Buy' showSelectedItem={false} currencyText='BITSI' nameOfClass='bg-success-513 py-2.5  text-white text-[22px] max-sm:px-10 px-20 rounded-xl' />
          </div>
        </div>

        {/* <div className='max-h-[300px] mb-20 p-8  overflow-y-auto table-body '>
          <table className='w-full text-left mt-4 border-spacing-20  overflow-y-auto'>
            <thead className='text-success-502 font-semibold font-manrope text-[22px] max-sm:text-[10px] '>
              <tr className='sticky'>
                <th className='p-2 max-sm:p-1'>Collections</th>
                <th className='p-2 max-sm:p-1'>NFT</th>
                <th className='p-2 max-sm:p-1' >Price</th>
              </tr>
            </thead>
            <tbody className='rounded-3xl  overflow-y-auto '>
              {buycollectionsTable.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className='bg-success-512 h-[78px]   secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold rounded-3xl'>
                      <td className='p-2 max-sm:p-1'>{item.Collections}</td>
                      <td className='p-2 max-sm:p-1'>{item.NFT}</td>
                      <td className='p-2 max-sm:p-1'>{item.price} Bitsi</td>
                    </tr>
                    <tr>
                      <td className='h-4'></td>
                    </tr>
                  </React.Fragment>
                )
              })}
            </tbody>

          </table>
        </div> */}
      </section>







    </>
  )
}

export default BuyCollection