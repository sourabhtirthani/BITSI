'use client'
import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image";
import { DropdownMenu, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import Dropdown from '@/components/Dropdown';
import { collectionDropDownItems, listOfNFts, orderDropDownItem, priceDropDownItems } from '@/constants';
import CardNft from '@/components/CardNft';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { generateQueryString } from '@/lib/utils';
import { ToastWithTitle } from '@/components/Toast';
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"
import { AutoComplete } from '@/components/AutoCompletebar';
import { nftData } from '@/types';
import FilterButtonUI from '@/components/FilterButtonUI';
// import { AutoCOmpletePopover } from '@/components/AutoCompletePopover';
// import PopOver from '@/components/PopOver';

const BitsiNft = () => {
  const [filteredLstOfNftsDialog, setFilteredListOfnftsDialog] = useState(listOfNFts);
  const [filteredLstOfNfts, setFilteredListOfnfts] = useState(listOfNFts);
  const [searchValueComplete , setSearchValueComplete] = useState('')
  // const [inputSearchValue , setInputSearchValue] = useState('');
  const { toast } = useToast()
  const menuRef = useRef<HTMLDivElement>(null)
  const [opennAutoCompleteDialog, setOpenAutoCompleteDialog] = useState(false)
  const [nftList, setNftList] = useState<nftData[]>(listOfNFts);
  const [searchValue, setSearchValue] = useState('');
  const [filterValue, setFilterValue] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [collectionFilter, setCollectionFilter] = useState('');
  const [orderFilter, setOrderFilter] = useState('');
  const [checkedItems, setCheckeditems] = useState<string[]>([]);
  

  const router = useRouter();
  // const { query } = router;
  const initialCheckedItems: { [key: string]: boolean } = {};

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenAutoCompleteDialog(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [])

  useEffect(()=>{
    console.log(priceFilter)
  } , [priceFilter])

  // useEffect(()=>{
  //   // let updatedFilteredList = filteredLstOfNfts;
  //   console.log('in here')
  //   if(collectionFilter != ''){
  //     console.log(collectionFilter)
  //     setFilteredListOfnfts(filteredLstOfNfts.filter(nft=>nft.category.toLowerCase() === collectionFilter.toLowerCase()));
  //   }
  //   if(priceFilter != ''){
  //     if(priceFilter == 'Low to High'){
  //       setFilteredListOfnfts([...filteredLstOfNfts].sort((a, b) => a.price - b.price))
  //     }else if(priceFilter == 'High to Low'){
  //       setFilteredListOfnfts([...filteredLstOfNfts].sort((a, b) => b.price - a.price))
  //     }
  //   }
  // } , [collectionFilter, priceFilter])
  // useEffect(()=>{
  //   console.log(priceFilter)
  // } , [orderFilter])

  // const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});
  //   const handleCheckboxChange = (id: string, isChecked: boolean) => {
  //     setCheckedItems(prevCheckedItems => ({
  //         ...prevCheckedItems,
  //         [id]: isChecked
  //     }));
  // };
  // const handleSearchClick = () => {
  //   console.log(searchValue);
  // }

  useEffect(() => {
    let updatedFilteredList = listOfNFts;
  
    if (collectionFilter !== '') {
      updatedFilteredList = updatedFilteredList.filter(nft =>
        nft.category.toLowerCase() === collectionFilter.toLowerCase()
      );
    }
  
    if (priceFilter !== '') {
      if (priceFilter === 'Low to High') {
        updatedFilteredList = [...updatedFilteredList].sort((a, b) => a.price - b.price);
      } else if (priceFilter === 'High to Low') {
        updatedFilteredList = [...updatedFilteredList].sort((a, b) => b.price - a.price);
      }
    }
  
    if (searchValueComplete !== '') {
      updatedFilteredList = updatedFilteredList.filter(nft =>
        nft.name.toLowerCase().includes(searchValueComplete.toLowerCase())
      );
    }
    if(orderFilter !== ''){
      if(orderFilter == 'Asc Order'){
      updatedFilteredList = [...updatedFilteredList].sort((a, b) => a.name.localeCompare(b.name));
      }else if(orderFilter == 'Desc Order'){
        updatedFilteredList = [...updatedFilteredList].sort((a, b) => b.name.localeCompare(a.name));
        }
    }
  
    setFilteredListOfnfts(updatedFilteredList);
  }, [collectionFilter, priceFilter, searchValueComplete, orderFilter]);

  const handleButtonClick = () => {
    // console.log(checkedItems)

    if (checkedItems.length == 0) {
      toast({
        title: "Selection Required",
        description: "Please select the NFTs you wish to purchase or click directly on the desired NFT.",
        duration: 2000,
        style: {
          backgroundColor: '#900808',
          color: 'white',
          fontFamily: 'Manrope',
        },
      })
      return;
    } else if (checkedItems.length != 0) {
      const queryString = generateQueryString(checkedItems)
      // console.log(queryString)
      router.push(`/bitsi-nft/buy-collection?${queryString}`);
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
   await setSearchValue(e.target.value);
    setOpenAutoCompleteDialog(true);
    // console.log(searchValue)
    if (searchValue !== '') {
      setFilteredListOfnftsDialog(listOfNFts.filter(nftData =>
        nftData.name.toLowerCase().includes(searchValue.toLowerCase())
      ));
    }
    // else if (searchValue == '') {
      
    //   // setFilteredListOfnftsDialog(listOfNFts);
    //   // setPriceFilter(priceFilter);
    //   // setCollectionFilter(collectionFilter.toUpperCase());
    // }
  }
  const handleAutoCompleteClick = (nameOfNft: string) => {
    setOpenAutoCompleteDialog(false)
    setSearchValue(nameOfNft);
   
    //   setFilteredListOfnfts(listOfNFts.filter(nftData => 
    //     nftData.name.toLowerCase().includes(searchValue.toLowerCase())
    // ));
  }

  const handleSearchingOfNft = () => {
    // setFilteredListOfnfts(listOfNFts.filter(nftData =>
    //   nftData.name.toLowerCase().includes(searchValue.toLowerCase())
    // ));
    setSearchValueComplete(searchValue);
   
  }
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
      {/* */}
      <section className='bg-success-503'>
        <div className='flex mt-4 p-6 max-md:flex-col justify-between max-md:gap-2 max-md:items-center overflow-hidden'>
          {/* <AutoComplete filteredLstOfNfts={filteredLstOfNfts} listOfNFts={listOfNFts} /> */}
          {/* <AutoCOmpletePopover filteredLstOfNfts={filteredLstOfNfts} listOfNFts={listOfNFts} /> */}
          <div className='flex flex-col'>

            <div className='flex '>
              <input placeholder='Search your NFTs....' type='text' className={`${opennAutoCompleteDialog == true ? 'rounded-bl-none' : ''}  focus:outline-none px-1 text-[20px] rounded-xl rounded-r-none w-[353px] font-montserrat h-[68px]`} value={searchValue} onChange={(e) => handleInputChange(e)} />
              <Image src='/icons/search-bg-yellow.svg' height={68} width={83} alt='search icon' className='relative cursor-pointer' onClick={handleSearchingOfNft} />
            </div>
            {/* <PopOver filteredLstOfNfts={filteredLstOfNfts} listOfNFts={listOfNFts} /> */}
            {opennAutoCompleteDialog && <div ref={menuRef}>
              <div className=' p-3 flex flex-col bg-black rounded-xl rounded-tl-none absolute   z-50 w-[353px] max-h-[200px] overflow-y-auto table-body max-sm:w-[200px]  '>
                {filteredLstOfNftsDialog.length > 0 && filteredLstOfNftsDialog.map((item, index) => {
                  return (
                    <div className='cursor-pointer flex hover:bg-success-509 gap-4' key={index} onClick={() => { handleAutoCompleteClick(item.name) }}>
                      {/* <Image src={item.nftImg} height={15} width={15} alt='image' /> */}
                      <p className='text-success-506 font-poller-one'>{item.name}</p>
                    </div>
                  )
                })}
                {filteredLstOfNftsDialog.length == 0 && (
                  <div className='cursor-pointer flex  gap-4'>
                    {/* <Image src={item.nftImg} height={15} width={15} alt='image' /> */}
                    <p className='text-success-506 font-poller-one'>No results found...</p>
                  </div>
                )}
              </div>
            </div>}
          </div>

          <div className='flex flex-row items-center gap-3 '>
            <Dropdown items={priceDropDownItems} buttonName='Price' setValue={setPriceFilter} />
            <Dropdown items={orderDropDownItem} buttonName='Order' setValue={setOrderFilter} />
            <Dropdown items={collectionDropDownItems} buttonName='Collections' setValue={setCollectionFilter} />
          </div>
        </div>
          {/* {priceFilter && FilterButtonUI  />} */}
          <div className='flex mt-4 gap-3'>
         {priceFilter &&  <FilterButtonUI stateVar={priceFilter} setStateVar={setPriceFilter} />}
         {collectionFilter &&  <FilterButtonUI stateVar={collectionFilter} setStateVar={setCollectionFilter} />}
         {orderFilter &&  <FilterButtonUI stateVar={orderFilter} setStateVar={setOrderFilter} />}
         </div>
      </section>

      <section className='bg-success-503 '>
        <div className=' max-h-full grid lg:grid-cols-4 max-md:grid-cols-1 max-md:place-items-center  md:grid-cols-3 mt-3 xl:grid-cols-5 custom-xxl:grid-cols-7'>
          {filteredLstOfNfts.map((item) => {
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
          <button onClick={handleButtonClick} className='bg-success-513 font-bold rounded-3xl py-2.5 text-white font-manrope px-10 text-[22px] text-lg disabled:bg-slate-600 hover:bg-success-511'> Buy Selected Items</button>
          {/* disabled = {checkedItems.length == 0}  thi is fo the buttin expiremantal */}
          {/* </Link> */}
        </div>
      </section>
    </>
  )
}

export default BitsiNft