'use client'
// import { getUserDetails } from '@/actions/uploadNft';
import Button from '@/components/Button';
import CardNftMyProfile from '@/components/CardNftMyProfile';
import Dropdown from '@/components/Dropdown';
import DropdownMyProfile from '@/components/DropdownMyProfile';
import FormLabel from '@/components/FormLabel';
import FormRow from '@/components/FormRow';
import InputText from '@/components/InputText';
import { useToast } from '@/components/ui/use-toast';
import { insuranceDropDownItemsMyProfile, listOfNFtsMyProfile, myHistoryWalletDropDown, myInsuranceDropdown, myProfileNftOrderDropDownItems, myProfileWalletDropDown, orderDropDownItem, priceDropDownItems, tableInsurance, tableMyCompensation, tableMyHistory, tableMyWallet, tableMyWalletCoin } from '@/constants';
import { formatAddressUserZone } from '@/lib/utils';
import { nftInUserZone, UserData } from '@/types';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';
import { useRouter } from 'next/navigation';
import MyInsuranceTableUserProfile from '@/components/MyInsuranceTableUserProfile';
import { getNFtsOfUser } from '@/actions/uploadNft';
import DropdownBitsiNFt from '@/components/DropDownBitsiNft';
import MyHistoryUserzone from '@/components/MyHistoryUserzone';
import MyWalletNftUserzone from '@/components/MyWalletNftUserzone';
import MyCompensationUserProfile from '@/components/MyCompensationUserProfile';
//515/511
const MyProfile = () => {
  const {toast} = useToast();
   const { push } = useRouter();
  const {address , isConnected} = useAccount();
  // const [myProfile, setMyProfile] = useState(true);
  const [enableEdit , setEnableEdit] = useState(false);
  const [filterValue , setFilterValue] = useState('MyProfile');
  const [nftDetailsFilterValue, setNftDetailsFilterValue] = useState('') // for inside table
  const [nftDetailsFilterValueOutside , setNftDetailsFilterValueOutside] = useState('')
  const [coinsDetailsFilterValue , setCoinDetailsFilterValue] = useState(''); // for inside
  const [coinsDetailsFilterValueOutside , setCoinsDetailsFilterValueOutside] = useState('');
  const [dataOfNftsOfUser , setDataOfNftsOfUser] = useState<nftInUserZone[]>([])
  const [historyDetailtsFilterValue , setHistoryDetailsFilterValue] = useState('');
  const [imgOfUser , setImageOfUser] = useState('/icons/image_pfp_no_pfp.png')
  const [orderFilter, setOrderFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [myHistoryInsuranceFilter , setMyHistroyInsuranceFilter] = useState('')
  // const [nameOfuser , setNameOfUser] = useState('');
  // const [emailOfUser , setEmailOfUser] = useState('');
  // const [numberOfUser , setNumberOfUser] = useState('')
  const [dataOfUser , setDataOfUser] = useState<UserData>()

  useEffect(()=>{
    if(!isConnected){
      push('/')
    }
  }, [isConnected])
  useEffect(()=>{
    const selectedItems: string[] = [];
    const searchParams = new URLSearchParams(window.location.search);
    // searchParams.forEach((value) => {
    //   selectedItems.push(value);
    // });
    const filterVal = searchParams.get('ysldef')

    if(filterVal){
      setFilterValue(filterVal)
    }
  } , [])

 const handleEditClick = async()=>{
  setEnableEdit(true);
  if(!address || !isConnected){
     toast({ title: "No wallets found", description: "Please Connect Wallet to edit your profile", duration: 2000,
      style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope'}})
      setEnableEdit(false);
      return;
  }else{
    // setEnableEdit(false);
     push('/my-profile/edit-profile');
  }

 }

  const handleMyProfileClick = () => {
    // setMyProfile(true);
    setFilterValue('MyProfile');
  }

  const handleCompensationClick =  ()=>{
    setFilterValue('Compensation');
  }
  const handleCollectionClick = async ()=>{
    // if(address){
    // const getAllNfts = await getNFtsOfUser(address)
    // if(getAllNfts){
    //   setDataOfNftsOfUser(getAllNfts);
    // }
    // }
    setFilterValue('Collections');
  }

  useEffect(()=>{
    const handleCollectionClick = async ()=>{
      if(address){
      const getAllNfts = await getNFtsOfUser(address)
      if(getAllNfts){
        setDataOfNftsOfUser(getAllNfts);
      }
      }
    }
    handleCollectionClick();
  } , [address])

  // const handleMyWalletClick = () => {
  //   setMyProfile(false);
  // }

  // const handleSubmit  = (e: React.SyntheticEvent)=>{
  //   e.preventDefault();
  //   console.log('in here')
  //   SetEnableEdit(true);
  // }


  const handleHistoryClick = ()=>{
    setFilterValue('My History')
  }

  useEffect(()=>{
    const getUser = async()=>{
      try{
        if(isConnected){
          const res = await fetch(`/api/user/${address}` ,{cache : 'no-cache'})
          if(res.status == 404){
            setDataOfUser({address : '' , name : '' , bio : '' , email : '' , number : '' , walletAddress : '' , id : '' , imgSrc : ''})
          }
          if(!res){
            toast({ title: "Operation Failed", description: "Error Fetching data , Please try again", duration: 2000,
              style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope'}})
              
          }else{
            const userData = await res.json();
  
              setDataOfUser(userData);
              if(userData.imgSrc){
              setImageOfUser(userData.imgSrc)
              }
              // setImageOfUser(userData?.imgSrc);
          }
          
        }else{
          setDataOfUser({address : '' , name : '' , bio : '' , email : '' , number : '' , walletAddress : '' , id : '' ,  imgSrc : ''})
          setImageOfUser('/icons/image_pfp_no_pfp.png')
        }
      }catch(error){
        console.log(error);
        toast({ title: "Operation Failed", description: "Error getting user Details", duration: 2000,
          style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope'}})
      }
    }
    getUser();
  }, [address, isConnected])
  return (
    <>
      <div className='navbar-space'></div>
      <section className='bg-success-503 '>
        <div className='mt-8 px-5 max-md:px-2.5 flex justify-between max-sm:flex-col mb-10 sm:items-center'>
          <div className='flex items-center gap-2'>
            <Image src={imgOfUser} height={200} width={200} alt='Profile Image' className='p-2 h-[200px] w-[200px] rounded-full' />
            <div className='flex flex-col gap-2 '>
              <p className='text-success-515 font-manrope text-[32px] max-sm:text-[24px]'>{dataOfUser?.name || 'No name specified'}</p>
              <div className='flex gap-2 max-sm:flex-col'>
                <p className='text-white text-opacity-50 text-[23px] max-sm:text-[17px] font-manrope font-normal'>{address ? formatAddressUserZone(address) : 'Please Connect Wallet '}</p>
                {/* <button className='bg-success-518 px-4 py-1 w-fit text-white font-manrope font-semibold '>Copy</button> */}
              </div>
            </div>
          </div>
          <div className={`p-5 ${(filterValue == 'MyProfile') ? '' : 'hidden'}`} onClick={handleEditClick} >
          <button  className={`${enableEdit ? 'bg-gray-300 disabled px-10' : 'bg-success-511'} py-3 px-6 font-bold gap-1 rounded-xl flex text-white`}>
            {enableEdit ? <div className="spinner mr-2 "></div> : <>
            <Image src='/icons/edit-icon.png' height={18} width={18} alt='edit' />EDIT </>}
            </button>
          </div>
        </div>

        <div className='flex p-2 gap-4 px-7 max-sm:flex-col w-full flex-wrap'>
          <button onClick={handleMyProfileClick} className='bg-success-512 hover:bg-success-509 max-md:text-[20px]  secondary-shadow11 text-white text-[22px] font-bold px-8 rounded-xl max-sm:px-4 mx max-sm:text-left py-2 max-sm:py-3.5 '>My Profile</button>
          <div hidden = {!isConnected} className='bg-success-512 hover:bg-success-509 secondary-shadow11 text-white text-[22px] rounded-xl max-sm:flex  h-fit w-fit max-sm:w-full   px-3 py-2'>
          <Dropdown buttonName='My Wallet' items={myProfileWalletDropDown} setValue={setFilterValue} /></div>
          <div hidden = {!isConnected} className='bg-success-512 hover:bg-success-509 secondary-shadow11 text-white text-[22px] rounded-xl max-sm:flex  h-fit w-fit max-sm:w-full  px-3 py-2'>
          <Dropdown buttonName='My History' items={myHistoryWalletDropDown} setValue={setFilterValue} /></div>
          {/* <button onClick={handleHistoryClick} className='bg-success-512 hover:bg-success-509  secondary-shadow11 text-white text-[22px] font-bold px-14 rounded-xl max-sm:px-8 py-2'>My History</button> */}
          <div hidden = {!isConnected} className='bg-success-512 hover:bg-success-509 secondary-shadow11 text-white max-md:text-[20px] text-[22px] rounded-xl max-sm:flex  h-fit w-fit max-sm:w-full  px-3 py-2'>
          <Dropdown buttonName='My Protection' items={myInsuranceDropdown} showIcon = {false} setValue={setFilterValue} /></div>
          <button hidden = {!isConnected} onClick={handleCompensationClick} className='bg-success-512 hover:bg-success-509 max-md:text-[20px]  secondary-shadow11 text-white text-[22px] font-bold px-8 rounded-xl max-sm:px-4 py-2 max-sm:text-left max-sm:py-3.5'>My Compensation</button>
          <button hidden = {!isConnected} onClick={handleCollectionClick} className={`${dataOfNftsOfUser.length === 0 ? 'hidden' : ''} bg-success-512 hover:bg-success-509  secondary-shadow11 text-white max-md:text-[20px] text-[22px] font-bold px-8 rounded-xl max-sm:text-left max-sm:px-4 py-2 max-sm:py-3.5`}>My Collection</button>
          {/* <button onClick={handleMyWalletClick} className='bg-success-512  secondary-shadow11 text-white text-[22px] px-14 rounded-xl max-sm:px-6 py-2'>My Wallet</button> */}
        </div>

        {filterValue == 'MyProfile' && (<div className='flex flex-col mt-4'>
          <form >
            <div className='flex justify-between  max-sm:flex-col sm:mb-0 sm:gap-24 px-4  '>
              <FormRow className='sm:w-1/2 p-4'>
                <FormLabel htmlFor='name' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Name</FormLabel>
              
                <input disabled = {true} id ='name' name='name' type='text' placeholder='Name' className='block w-full  p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white  focus:border-b-4' value={dataOfUser?.name || ''} />
              
              </FormRow>
              <FormRow className='sm:w-1/2 p-4'>
                <FormLabel htmlFor='whatsapp' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Whatsapp&nbsp;(Optional)</FormLabel>
                <input disabled = {true} id='whatsapp' name='whatsapp' type='text' placeholder='Phone Number' className='block w-full p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white focus:border-b-4' value={dataOfUser?.number || ''} />
               
              </FormRow>
            </div>

            <div className='flex justify-between  max-sm:flex-col sm:mb-0 sm:gap-24  px-4 '>
              <FormRow className='sm:w-1/2 p-4'>
                <FormLabel htmlFor='email' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Email</FormLabel>
                <input disabled = {true} id='email' name='email' type='email' placeholder='Email' className='block w-full p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white focus:border-b-4' value={dataOfUser?.email || ''} />
               
              </FormRow>
              <FormRow className='sm:w-1/2 p-4 mb-8'>
                <FormLabel htmlFor='address' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Address&nbsp;(Optional)</FormLabel>
                <input disabled = {true}  id='address' name='address' type='text' placeholder='Address here' className='block w-full p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white focus:border-b-4' value={dataOfUser?.address || ''} />
             
              </FormRow>
            </div>
            {/* <FormRow className='py-4 px-7'>
              <FormLabel htmlFor='bio' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Bio&nbsp;(Optional)</FormLabel>
              <input disabled = {true} id='bio' name='bio' type='text' placeholder='Bio' className='block w-full p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white focus:border-b-4' value={dataOfUser?.bio || ''} />
            
            </FormRow> */}
            {/* <div className='flex gap-4 p-4'>
            <button className={`bg-success-511 py-3 px-6 font-bold gap-1 rounded-xl flex text-white mb-10 ${enableEdit ? 'hidden' : ''}`} type='submit'>Save</button>
            <button className={`bg-success-511 py-3 px-6 font-bold gap-1 rounded-xl flex text-white mb-10 ${enableEdit ? 'hidden' : ''}`} onClick={handleCancelFormSave}>Cancel</button>
            </div> */}
          </form>
        </div>)}


        { filterValue == 'NFTs' && (
          <>
          <div className='flex justify-between p-4 md:p-8'>
            <p className='text-success-511 text-center  px-3  text-[22px] font-bold  mt-3 py-2'>{filterValue}</p>
            {/* <DropdownMyProfile insideTable={false} setValue={setNftDetailsFilterValueOutside} iconName='/icons/sort-icon-filter.svg' items={[]}/> */}
            <DropdownBitsiNFt  itemsOrder={orderDropDownItem} itemsPrice={priceDropDownItems} setOrd={setOrderFilter} setPrice={setPriceFilter} />
          </div>
          <MyWalletNftUserzone address = {address as string} />
          </>
        )}

{filterValue == 'Coin' && (
  <>
  <div className='flex justify-between p-4 md:p-8'>
            <p className='text-success-511  px-3  text-[22px] font-bold  mt-3 py-2'>Coin</p>
            {/* <DropdownMyProfile insideTable={false} setValue={setCoinsDetailsFilterValueOutside} iconName='/icons/sort-icon-filter.svg' items={[]}/> */}
            <DropdownBitsiNFt  itemsOrder={orderDropDownItem} itemsPrice={priceDropDownItems} setOrd={setOrderFilter} setPrice={setPriceFilter} />
          </div>
          <div className='max-h-[500px] overflow-y-auto mb-20 table-body p-4 md:p-8'>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1' >Marketplace</th>
                  <th className='p-2 max-sm:p-1'>Coin&nbsp;Id</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Coin&nbsp;Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {tableMyWalletCoin.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-2 py-5 max-sm:p-1'>{item.Date}</td>
                        <td className='p-2 max-sm:p-1'>{item.marketPlace}</td>
                        <td className='p-2 max-sm:p-1'>{item.CoinId}</td>
                        <td className='p-2 max-sm:p-1'>{item.coinPrice}</td>
                        <td className='p-2 max-sm:p-1'>{item.insurance}</td>
                        <td className='p-2 max-sm:p-1'>{item.incusranceCoverage}</td>
                        <td className='p-2 max-sm:p-1'>{item.insuranceExpiry}</td>
                        {/* <DropdownMyProfile setValue={setCoinDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems} itemsInsideTable={['Claim Compensation']}/> */}
                      </tr>
                      <tr>
                        <td  className='h-6'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
          </div>
          </>
        )}

        {filterValue == 'Collections' && (
          <div className=' max-h-full grid px-4 mb-4 lg:grid-cols-4 max-md:grid-cols-1 max-md:place-items-center  md:grid-cols-3 mt-3 xl:grid-cols-5 '>
            
          {dataOfNftsOfUser.map((item , index) => {
            return (
              <div key={index} className='p-1 w-fit mt-1 '>
                <CardNftMyProfile {...item}  />
                {/*  name={item.name} id={item.id} price={item.price} category={item.category} checked = {item.checked} nftImg={item.nftImg} */}
              </div>
            )
          })}
          {dataOfNftsOfUser.length == 0 && <div className='w-full justify-center flex items-center self-center'><p className='text-white font-manrope text-[22px] font-bold'>No NFT&apos; to show. <span className='text-success-511 font-manrope'>Buy NFT</span></p></div>}
        </div>
        )}

        {(filterValue == 'Coins' || filterValue == 'NFT'  ) && (
          <>
          <div className='flex justify-between p-4 md:p-8'>
            <p className='  px-3 text-success-511 text-[22px] font-bold  mt-3 py-2'>{filterValue}</p>
            <DropdownBitsiNFt  itemsOrder={orderDropDownItem} itemsPrice={priceDropDownItems} setOrd={setOrderFilter} setPrice={setPriceFilter} />
          </div>
          <MyHistoryUserzone address={address as string} filterValue={filterValue}  />
          </>
        )}
        { filterValue == 'Protection' && (
          <>
          <div className='flex justify-between p-4 md:p-8'>
            <p className=' px-3 text-success-511 text-[22px] font-bold  mt-3 py-2'>{filterValue}</p>
            {/* <DropdownMyProfile insideTable={false} setValue={setHistoryDetailsFilterValue} iconName='/icons/sort-icon-filter.svg' items={[]}/> */}
            <DropdownBitsiNFt  itemsOrder={orderDropDownItem}  setOrd={setOrderFilter} itemsAsset={insuranceDropDownItemsMyProfile} setAsset={setMyHistroyInsuranceFilter}  />
          </div>
          <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1' >Asset</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
                  {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {tableInsurance.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-6 max-sm:p-3'>{item.Date}</td>
                        <td className='p-2 max-sm:p-1'>{item.Asset}</td>
                        <td className='p-2 max-sm:p-1'>{item.EventName}</td>
                        <td className='p-2 max-sm:p-1'>{item.insuranceCoverage}</td>
                        <td className='p-2 max-sm:p-1'>{item.insuraceExpiry}</td>
                        {/* <td className='p-2 max-sm:p-1'>{item.Compensation}</td> */}
                       
                        {/* <DropdownMyProfile setValue={setHistoryDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems}/> */}
                      </tr>
                      <tr>
                        <td  className='h-5'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
          </div>
          </>
        )}


        {filterValue == 'Compensation' && (
          <>
           <div className='flex justify-between p-4 md:p-8'>
            <p className='  px-3 text-success-511 text-[22px] font-bold  mt-3 py-2'>My Compensation</p>
            {/* <DropdownMyProfile insideTable={false} setValue={setHistoryDetailsFilterValue} iconName='/icons/sort-icon-filter.svg' items={[]}/> */}
            <DropdownBitsiNFt  itemsOrder={orderDropDownItem} itemsPrice={priceDropDownItems} setOrd={setOrderFilter} setPrice={setPriceFilter} />
          </div>
          <MyCompensationUserProfile address={address as string} />
          </>
        )}

          {(filterValue == 'Purchase' || filterValue == 'Upgrade' || filterValue == 'Extend' || filterValue == 'Claim' || filterValue == 'Unlock'   )&& (
            <MyInsuranceTableUserProfile filterValue={filterValue} />
          )}

      </section>
    </>
  )
}

export default MyProfile