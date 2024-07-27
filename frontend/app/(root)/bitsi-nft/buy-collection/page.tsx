'use client'
import React, { useState, useEffect } from 'react'

import { buycollectionsTable } from '@/constants';
import { DialogBuy } from '@/components/DialogBuy';
import { CarouselNft } from '@/components/CarouselNft';
import { AlertBoxBuyNfy } from '@/components/AlertBoxBuyNft';
import { getMultipleNftsWithIds } from '@/actions/uploadNft';
// import { useSearchParams } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { nftDataForMulitpleNftSelectPage } from '@/types';
import { useAccount } from 'wagmi';


const BuyCollection = () => {
  
  //   const searchParams = useSearchParams();
  //   const [ids, setIds] = useState([]);
  //   const selectedItems : string[] = [];
  //   searchParams.forEach((item) => {
  //     selectedItems.push(item);
  //   })
  const {address , isConnected} = useAccount();
  const { toast } = useToast()
  const [ids, setIds] = useState<number[]>([]);
  const [priceLst , setPriceLst] = useState<number[]>([])
  const [selectedNftsData , setSelectedNftsData] = useState<nftDataForMulitpleNftSelectPage[]>([]);
  const [disableBuyBtn , setDisbleBuyBtn] = useState(false);
  let errDescription = '';
  const selectedItems: string[] = [];

  useEffect(() => {
    const getAllNftsOnPageRender = async()=>{
      try{
    if(selectedItems.length > 0){
      return;
    }
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value) => {
      // console.log(value)
      // setIds(prevIds => [...prevIds, value]);
      selectedItems.push(value);
      // setIds(prevIds => [...prevIds, value]);
    });
    console.log(selectedItems)
    // await setIds(selectedItems);
    // console.log(`the ids are`)
    // console.log(ids)
    // let idOfNftsArr: number[] = [];
    // for (let i = 0; i < ids.length; i++) {
    //       idOfNftsArr.push(Number(ids[i]));
    //     }
        // console.log(idOfNftsArr); 
        const getAllSelectedNfts = await getMultipleNftsWithIds(selectedItems);
        // console.log(getAllSelectedNfts)
    if(getAllSelectedNfts!=null){
      setSelectedNftsData(getAllSelectedNfts);
      const newIds: number[] = [];
    const newPrices: number[] = [];
      for(let i = 0; i< getAllSelectedNfts.length ; i++){
        const nft = getAllSelectedNfts[i];
        newIds.push(nft.id);
        console.log(nft.nft_price)
        // const priceInWei = Number(Math.floor(nft.nft_price) * 10 ** 18);
        const priceInWei = Number(Math.floor(parseFloat(nft.nft_price.toString()) * 10 ** 18));
        console.log(priceInWei)
        newPrices.push(priceInWei);
      }
      setIds(newIds);
      console.log(priceLst)
      console.log('thi was befreo ti was set and this is after')
      setPriceLst(newPrices);
      console.log(priceLst)
    }
    
      }catch(error){
        console.log(error);
        toast({
          title: "Error Retrieving Nfts",
          description: 'Unable To retrieve NFTs at the moment , please refresh the page and try again',
          duration: 2000,
          style: {
            backgroundColor: '#900808',
            color: 'white',
            fontFamily: 'Manrope',
          },
        })
      }
      }
      getAllNftsOnPageRender();
  }, []);

  useEffect(()=>{
    const checkForAddress = ()=>{
    for(let i =0 ;i< selectedNftsData.length ; i++){
      if(!isConnected){
        setDisbleBuyBtn(true);
        errDescription = 'No Wallets Connected , Please connect allet to continue.'
        toast({title: "Cannot Purchase NFTs",description: errDescription,duration: 5000,
          style: {backgroundColor: '#900808',color: 'white',fontFamily: 'Manrope' },})
      }
      else if(selectedNftsData[i].nft_owner_address === address ){
        setDisbleBuyBtn(true);
        errDescription = 'Selected NFTs contains owned NFts , please remove them in order to proceed'
        toast({title: "Cannot Purchase NFTs",description: errDescription,duration: 5000,
          style: {backgroundColor: '#900808',color: 'white',fontFamily: 'Manrope'},})
          return;
      }else if(selectedNftsData[i].up_for_sale == false){
        setDisbleBuyBtn(true);
        errDescription = 'Some Items in the cart are not for sale or are either sold.'
        toast({title: "Cannot Purchase NFTs",description: errDescription,duration: 5000,
          style: {backgroundColor: '#900808',color: 'white',fontFamily: 'Manrope'},})
          return;
      }
        else{
        setDisbleBuyBtn(false);
      }
    }
  }
  checkForAddress();
  }, [address , selectedNftsData , isConnected])
  return (    
    <>
      <div className='navbar-space'></div>
      <section className='bg-success-503'>
        <div className="w-full flex justify-center">
          <div className="w-fit fixed z-30 flex">
            <AlertBoxBuyNfy />
          </div>
        </div>
        {/* <div className='p-8 max-md:p-4'>
          <div className=' bg-success-512 secondary-shadow11'> */}
        <CarouselNft allSelectedItems={selectedNftsData} />
        {/* </div> */}
        {/* </div> */}
        <div className='p-8 mb-40 max-md:mb-20'>
          <div className='flex   w-full items-center sm:gap-32 max-sm:gap-20'>
            <div className='flex flex-col justify-between'>
              <p className='text-success-516 text-opacity-50  font-manrope text-[22px] max-md:text-[18px] font-semibold'>Total&nbsp;Price</p>
              <p className='text-white font-montserrat text-[22px] max-md:text-[18px] font-bold'>10&nbsp;BITSI</p>
            </div>
            {/* owner address to be changed later */}
            {/* <button className='bg-success-513 py-2.5  text-white text-[22px] max-sm:px-10 px-20 rounded-xl'>Buy</button> */}
            {disableBuyBtn == true ? <div className='bg-gray-400 cursor-pointer w-full py-2 font-bold text-white text-[24px] flex justify-center rounded-xl'>Buy</div> : 
            <DialogBuy ownerAddress={''} pricesArray={priceLst} totalItems={ids?.length} lstOfItems={ids} buttonName='Buy' showSelectedItem={false} currencyText='BITSI' nameOfClass='w-full bg-nft-text-gradient py-2.5 font-bold  text-white text-[24px]  rounded-xl' />}
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
        <div>

        </div>
      </section>







    </>
  )
}

export default BuyCollection