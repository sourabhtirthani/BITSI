'use client'  // will be changed later...
import React, { useState } from 'react'
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Dropdown from '@/components/Dropdown';
import { collectionDropDownItems, listOfNFts, orderDropDownItem, priceDropDownItems } from '@/constants';
import CardNft from '@/components/CardNft';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { useRouter } from "next/navigation";
import { generateQueryString } from '@/lib/utils';
import { ToastWithTitle } from '@/components/Toast';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

const BitsiNft = () => {
  const { toast } = useToast()
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');

  const router = useRouter();
  // const { query } = router;
  const initialCheckedItems: { [key: string]: boolean } = {};
  
  // const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  const [checkedItems , setCheckeditems] = useState<string[]>([]);
//   const handleCheckboxChange = (id: string, isChecked: boolean) => {
//     setCheckedItems(prevCheckedItems => ({
//         ...prevCheckedItems,
//         [id]: isChecked
//     }));
// };
  const handleSearchClick = () => {
    console.log(searchValue);
  }

  const handleButtonClick = () => {
    console.log(checkedItems)
    
    if(checkedItems.length == 0){
      toast({
        title: "Selection Required",
        description: "Please select the NFTs you wish to purchase or click directly on the desired NFT.",
        duration : 2000,
        style: {
          backgroundColor: '#900808',
          color : 'white',
          fontFamily: 'Manrope',
        },
      })
      return;
    }else if(checkedItems.length != 0){
    const queryString = generateQueryString(checkedItems)
    console.log(queryString)
    router.push(`/bitsi-nft/buy-collection?${queryString}`);
    }
  };
  return (
    <>
      <div className='navbar-space'>
      </div>
      <section className='bg-bitsi-nft flex bg-current max-md:bg-contain '>
        <div className='xl:w-full flex flex-col lg:p-14 md:p-10 max-md:p-4'>
          <h1 className='font-manrope text-white font-bold lg:text-[52px] md:text-[44px] max-md:text-[26px] max-md:mb-4 custom-xxl:text-[83px]'>
            Discover, Create, Trade and Buy Exclusive Digital Art: Welcome to BITSI NFT!
          </h1>
          <Image src='/icons/marketplace-icons.png' height={104.87} width={186.26} alt='market logos' className='max-md:hidden' />
          <div className='flex gap-4 mb-2'>
            <Link href='/create-nft'><button className='bg-success-506 border-success-506 border-2 text-black font-inter w-fit rounded-xl max-md:rounded-xl p-2 max-md:text-[16px] md:p-4 font-semibold md:px-8 hover:bg-success-509 hover:text-white'>Create NFT</button></Link>
            <button className=' text-success-506 border-success-506 border-2 font-inter w-fit rounded-xl max-md:rounded-xl p-2 max-md:text-[16px] md:p-4 font-semibold md:px-8 hover:bg-success-509 hover:text-white'>View Insurance</button>
          </div>
        </div>

        <div className='h-full xl:w-full  max-xl:hidden mt-1 mr-10 '>

          <Image src='/icons/nft-group-img.png' height={532} width={717.41} alt='nft group' className='custom-xxl:h-[610px] custom-xxl:w-[800px]' />

        </div>

      </section>

      {/* /////////////////////// */}
      {/* this section will be later made as a server component */}
      <section className='bg-success-503'>
        <div className='flex mt-4 p-6 max-md:flex-col justify-between max-md:gap-2 max-md:items-center overflow-hidden'>
          <div className='flex '>
            <input placeholder='Search your NFTs....' type='text' className='focus:outline-none px-1 text-[20px] rounded-xl rounded-r-none w-[353px] font-montserrat h-[68px]' value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            <Image src='/icons/search-bg-yellow.svg' height={68} width={83} alt='search icon' className='relative' onClick={handleSearchClick} />
          </div>

          <div className='flex flex-row items-center gap-3 '>
            <Dropdown items={priceDropDownItems} buttonName='Price' setValue={setFilterValue} />
            <Dropdown items={orderDropDownItem} buttonName='Order' setValue={setFilterValue} />
            <Dropdown items={collectionDropDownItems} buttonName='Collections' setValue={setFilterValue} />
          </div>
        </div>

      </section>

      <section className='bg-success-503 '>
        <div className=' max-h-full grid lg:grid-cols-4 max-md:grid-cols-1 max-md:place-items-center  md:grid-cols-3 mt-3 xl:grid-cols-5 custom-xxl:grid-cols-7'>
          {listOfNFts.map((item) => {
            return (
              <div key={item.id} className='p-1 w-fit mt-1 '>
                <CardNft {...item} setCheckedItems={setCheckeditems} checkedItems={checkedItems} />
                {/*  name={item.name} id={item.id} price={item.price} category={item.category} checked = {item.checked} nftImg={item.nftImg} */}
              </div>
            )
          })}
        </div>
        <div className='flex mt-14 mb-[100px] max-md:mb-[50px] justify-center'>
          {/* <Link href='/bitsi-nft/buy-collection'>   */}
          <button onClick={handleButtonClick}   className='bg-success-513 font-bold rounded-3xl py-2.5 text-white font-manrope px-10 text-[22px] text-lg disabled:bg-slate-600 hover:bg-success-511'> Buy Selected Items</button>
          {/* disabled = {checkedItems.length == 0}  thi is fo the buttin expiremantal */}
          {/* </Link> */}
        </div>
      </section>
    </>
  )
}

export default BitsiNft