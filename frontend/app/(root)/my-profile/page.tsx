'use client'
import Button from '@/components/Button';
import CardNftMyProfile from '@/components/CardNftMyProfile';
import Dropdown from '@/components/Dropdown';
import DropdownMyProfile from '@/components/DropdownMyProfile';
import FormLabel from '@/components/FormLabel';
import FormRow from '@/components/FormRow';
import InputText from '@/components/InputText';
import { listOfNFtsMyProfile, myHistoryWalletDropDown, myProfileNftOrderDropDownItems, myProfileWalletDropDown, tableMyCompensation, tableMyHistory, tableMyWallet, tableMyWalletCoin } from '@/constants';
import Image from 'next/image'
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
//515/511
const MyProfile = () => {
  
  // const [myProfile, setMyProfile] = useState(true);
  const [enableEdit , SetEnableEdit] = useState(true);
  const [filterValue , setFilterValue] = useState('MyProfile');
  const [nftDetailsFilterValue, setNftDetailsFilterValue] = useState('') // for inside table
  const [nftDetailsFilterValueOutside , setNftDetailsFilterValueOutside] = useState('')
  const [coinsDetailsFilterValue , setCoinDetailsFilterValue] = useState(''); // for inside
  const [coinsDetailsFilterValueOutside , setCoinsDetailsFilterValueOutside] = useState('');
  const [historyDetailtsFilterValue , setHistoryDetailsFilterValue] = useState('');

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

  const handleEditClick = ()=>{
  if(enableEdit == true){
  SetEnableEdit(false);
  return;
  }
  }

  const handleMyProfileClick = () => {
    // setMyProfile(true);
    setFilterValue('MyProfile');
  }

  const handleCompensationClick =  ()=>{
    setFilterValue('Compensation');
  }

  // const handleMyWalletClick = () => {
  //   setMyProfile(false);
  // }

  const handleSubmit  = (e: React.SyntheticEvent)=>{
    e.preventDefault();
    console.log('in here')
    SetEnableEdit(true);
  }

  const handleCancelFormSave = ()=>{
    SetEnableEdit(true);
  }
  const handleHistoryClick = ()=>{
    setFilterValue('My History')
  }
  return (
    <>
      <div className='navbar-space'></div>
      <section className='bg-success-503 '>
        <div className='mt-8 px-5 max-md:px-2.5 flex justify-between max-sm:flex-col mb-10 sm:items-center'>
          <div className='flex items-center gap-2'>
            <Image src='/icons/profile-logo.png' height={200} width={200} alt='Profile Image' className='p-2' />
            <div className='flex flex-col gap-2 '>
              <p className='text-success-515 font-manrope text-[32px] max-sm:text-[24px]'>Sanorita Hubdj</p>
              <div className='flex gap-2 max-sm:flex-col'>
                <p className='text-white text-opacity-50 text-[23px] max-sm:text-[17px] font-manrope font-normal'> 0xb1...iodhu00eF</p>
                <button className='bg-success-518 px-4 py-1 w-fit text-white font-manrope font-semibold '>Copy</button>
              </div>
            </div>
          </div>
          <div className={`p-5 ${(enableEdit && filterValue == 'MyProfile') ? '' : 'hidden'}`} onClick={handleEditClick}>
          <Link href={'/my-profile/edit-profile'}> <button className='bg-success-511 py-3 px-6 font-bold gap-1 rounded-xl flex text-white'><Image src='/icons/edit-icon.png' height={18} width={18} alt='edit' />EDIT</button></Link> 
          </div>
        </div>

        <div className='flex p-2 gap-4 px-7 max-sm:flex-col w-full flex-wrap'>
          <button onClick={handleMyProfileClick} className='bg-success-512 hover:bg-success-509  secondary-shadow11 text-white text-[22px] font-bold px-14 rounded-xl max-sm:px-8 py-2'>My Profile</button>
          <div className='bg-success-512 hover:bg-success-509 secondary-shadow11 text-white text-[22px] rounded-xl max-sm:flex max-sm:justify-center h-fit w-fit max-sm:w-full  px-3 py-2'>
          <Dropdown buttonName='My Wallet' items={myProfileWalletDropDown} setValue={setFilterValue} /></div>
          <div className='bg-success-512 hover:bg-success-509 secondary-shadow11 text-white text-[22px] rounded-xl max-sm:flex max-sm:justify-center h-fit w-fit max-sm:w-full  px-3 py-2'>
          <Dropdown buttonName='My History' items={myHistoryWalletDropDown} setValue={setFilterValue} /></div>
          {/* <button onClick={handleHistoryClick} className='bg-success-512 hover:bg-success-509  secondary-shadow11 text-white text-[22px] font-bold px-14 rounded-xl max-sm:px-8 py-2'>My History</button> */}
          <button onClick={handleCompensationClick} className='bg-success-512 hover:bg-success-509  secondary-shadow11 text-white text-[22px] font-bold px-14 rounded-xl max-sm:px-8 py-2'>My Compensation</button>
          {/* <button onClick={handleMyWalletClick} className='bg-success-512  secondary-shadow11 text-white text-[22px] px-14 rounded-xl max-sm:px-6 py-2'>My Wallet</button> */}
        </div>

        {filterValue == 'MyProfile' && (<div className='flex flex-col mt-4'>
          <form onSubmit={handleSubmit}>
            <div className='flex justify-between  max-sm:flex-col sm:mb-0 sm:gap-24 px-4  '>
              <FormRow className='sm:w-1/2 p-4'>
                <FormLabel htmlFor='name' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Name</FormLabel>
                {/* block w-full  rounded  */}
                {/* <InputText  id='name' name='name' type='text' placeHolder='Name' className='p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white  focus:border-b-4' /> */}
                <input disabled = {enableEdit} id ='name' name='name' type='text' placeholder='Name' className='block w-full  p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white  focus:border-b-4' />
                {/* {errorMessageName && <p className='text-success-517 text-[11px] font-normal'>{errorMessageName}*</p>} */}
              </FormRow>
              <FormRow className='sm:w-1/2 p-4'>
                <FormLabel htmlFor='whatsapp' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Whatsapp&nbsp;(Optional)</FormLabel>
                <input disabled = {enableEdit} id='whatsapp' name='whatsapp' type='text' placeholder='Phone Number' className='block w-full p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white focus:border-b-4' />
                {/* {priceErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{priceErrorMessage}*</p>} */}
              </FormRow>
            </div>

            <div className='flex justify-between  max-sm:flex-col sm:mb-0 sm:gap-24  px-4 '>
              <FormRow className='sm:w-1/2 p-4'>
                <FormLabel htmlFor='email' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Email</FormLabel>
                <input disabled = {enableEdit} id='email' name='email' type='email' placeholder='Email' className='block w-full p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white focus:border-b-4' />
                {/* {errorMessageName && <p className='text-success-517 text-[11px] font-normal'>{errorMessageName}*</p>} */}
              </FormRow>
              <FormRow className='sm:w-1/2 p-4'>
                <FormLabel htmlFor='address' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Address&nbsp;(Optional)</FormLabel>
                <input disabled = {enableEdit}  id='address' name='address' type='text' placeholder='Address here' className='block w-full p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white focus:border-b-4' />
                {/* {priceErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{priceErrorMessage}*</p>} */}
              </FormRow>
            </div>
            <FormRow className='py-4 px-7'>
              <FormLabel htmlFor='bio' className='font-montserrat text-white text-opacity-50 text-[22px] font-semibold'>Bio&nbsp;(Optional)</FormLabel>
              <input disabled = {enableEdit} id='bio' name='bio' type='text' placeholder='Bio' className='block w-full p-3 bg-transparent border-b-2 rounded-none border-dotted border-success-505 text-white focus:border-b-4' />
              {/* {priceErrorMessage && <p className='text-success-517 text-[11px] font-normal'>{priceErrorMessage}*</p>} */}
            </FormRow>
            <div className='flex gap-4 p-4'>
            <button className={`bg-success-511 py-3 px-6 font-bold gap-1 rounded-xl flex text-white mb-10 ${enableEdit ? 'hidden' : ''}`} type='submit'>Save</button>
            <button className={`bg-success-511 py-3 px-6 font-bold gap-1 rounded-xl flex text-white mb-10 ${enableEdit ? 'hidden' : ''}`} onClick={handleCancelFormSave}>Cancel</button>
            </div>
          </form>
        </div>)}


        { filterValue == 'NFTs' && (
          <>
          <div className='flex justify-between p-4 md:p-8'>
            <p className='bg-success-512 hover:bg-success-509  px-3 text-white text-[22px] font-bold  mt-3 py-2'>NFT Details</p>
            <DropdownMyProfile insideTable={false} setValue={setNftDetailsFilterValueOutside} iconName='/icons/sort-icon-filter.svg' items={[]}/>
          </div>
          <div className='max-h-[500px] px-8 max-md:px-4 overflow-y-auto mb-20 table-body'>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>NFT</th>
                  <th className='p-2 max-sm:p-1' >Name</th>
                  <th className='p-2 max-sm:p-1'>Insurance Expiry</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Current Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>NFT Minted Time</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Insurance Coverage</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {tableMyWallet.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-2 max-sm:p-1'><Image src={item.NFT} height={50} width={50} alt='img' /></td>
                        <td className='p-2 max-sm:p-1'>{item.name}</td>
                        <td className='p-2 max-sm:p-1'>{item.insuranceExpiry}</td>
                        <td className='p-2 max-sm:p-1'>{item.currentPrice}</td>
                        <td className='p-2 max-sm:p-1'>{item.nftMintedTime}</td>
                        <td className='p-2 max-sm:p-1'>Active&nbsp;  <input type='checkbox' checked={item.active} className='bg-transparent' /></td>
                        <DropdownMyProfile setValue={setNftDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems} itemsInsideTable={['Convert to BITSI Coin' , 'Claim Compensation']}/>
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

{filterValue == 'Coin' && (
  <>
  <div className='flex justify-between p-4 md:p-8'>
            <p className='bg-success-512 hover:bg-success-509  px-3 text-white text-[22px] font-bold  mt-3 py-2'>Coin</p>
            <DropdownMyProfile insideTable={false} setValue={setCoinsDetailsFilterValueOutside} iconName='/icons/sort-icon-filter.svg' items={[]}/>
          </div>
          <div className='max-h-[500px] overflow-y-auto mb-20 table-body p-4 md:p-8'>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>COIN</th>
                  <th className='p-2 max-sm:p-1' >Name</th>
                  <th className='p-2 max-sm:p-1'>Transaction Id</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Purchased Date</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {tableMyWalletCoin.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-2 max-sm:p-1'>{item.COIN}</td>
                        <td className='p-2 max-sm:p-1'>{item.Name}</td>
                        <td className='p-2 max-sm:p-1'>{item.TransactionId}</td>
                        <td className='p-2 max-sm:p-1'>{item.Price}</td>
                        <td className='p-2 max-sm:p-1'>{item.PurchasedDate}</td>
                        <DropdownMyProfile setValue={setCoinDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems} itemsInsideTable={['Claim Compensation']}/>
                      </tr>
                      <tr>
                        <td  className='h-4'></td>
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
          <div className=' max-h-full grid mb-4 lg:grid-cols-4 max-md:grid-cols-1 max-md:place-items-center  md:grid-cols-3 mt-3 xl:grid-cols-5 custom-xxl:grid-cols-7'>
          {listOfNFtsMyProfile.map((item) => {
            return (
              <div key={item.id} className='p-1 w-fit mt-1 '>
                <CardNftMyProfile {...item}  />
                {/*  name={item.name} id={item.id} price={item.price} category={item.category} checked = {item.checked} nftImg={item.nftImg} */}
              </div>
            )
          })}
        </div>
        )}

        {(filterValue == 'Coins' || filterValue == 'NFT' || filterValue == 'Insurance' ) && (
          <>
          <div className='flex justify-between p-4 md:p-8'>
            <p className='bg-success-512 hover:bg-success-509  px-3 text-white text-[22px] font-bold  mt-3 py-2'>My History</p>
            <DropdownMyProfile insideTable={false} setValue={setHistoryDetailsFilterValue} iconName='/icons/sort-icon-filter.svg' items={[]}/>
          </div>
          <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1' >ID</th>
                  <th className='p-2 max-sm:p-1'>Name</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Collection</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Action</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>MarketPlace</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Price Difference</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {tableMyHistory.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-2 max-sm:p-1'>{item.Date}</td>
                        <td className='p-2 max-sm:p-1'>{item.ID}</td>
                        <td className='p-2 max-sm:p-1'>{item.Name}</td>
                        <td className='p-2 max-sm:p-1'>{item.Collection}</td>
                        <td className='p-2 max-sm:p-1'>{item.Price}</td>
                        <td className='p-2 max-sm:p-1'>{item.Acions}</td>
                        <td className='p-2 max-sm:p-1'>{item.MarketPlace}</td>
                        <td className='p-2 max-sm:p-1'>{item.PriceDifference}</td>
                        <td className='p-2 max-sm:p-1'>{item.Compensation}</td>
                       
                        <DropdownMyProfile setValue={setHistoryDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems}/>
                      </tr>
                      <tr>
                        <td  className='h-4'></td>
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
            <p className='bg-success-512 hover:bg-success-509  px-3 text-white text-[22px] font-bold  mt-3 py-2'>My Compensation</p>
            <DropdownMyProfile insideTable={false} setValue={setHistoryDetailsFilterValue} iconName='/icons/sort-icon-filter.svg' items={[]}/>
          </div>
          <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
            <table className='w-full text-center mt-4 border-spacing-20'>
              <thead className='text-success-502 font-semibold font-montserrat text-[22px] max-sm:text-[10px]   '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date of Compensation Claimed</th>
                  <th className='p-2 max-sm:p-1' >Total Loss</th>
                  <th className='p-2 max-sm:p-1'>Loss Above 50% (Y/N)</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {tableMyCompensation.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 h-12 text-center secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-2 max-sm:p-1'>{item.dateOfCompensationClaimed}</td>
                        <td className='p-2 max-sm:p-1'>{item.totalLoss}</td>
                        <td className='p-2 max-sm:p-1'>{item.lossabove50}</td>
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

      </section>
    </>
  )
}

export default MyProfile