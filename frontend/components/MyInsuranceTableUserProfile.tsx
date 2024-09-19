'use client'
import { purchaseDropDownItem, tableMyInsuraceCoin, tableMyInsurance } from '@/constants'
import React, { useState } from 'react'
import DropdownBitsiNFt from './DropDownBitsiNft'
import MyInsuranceTableClaim from './MyInsuranceTableClaim'
import MyInsuraceTablePurchase from './MyInsuranceTablePurchase'
import { useAccount } from 'wagmi'
import MyInsuranceTableExtend from './MyInsuranceTableExtend'
import MyInsuranceTableUpgrade from './MyInsuranceTableUpgrade'
const MyInsuranceTableUserProfile = ({filterValue} : {filterValue : string}) => {
  const [insuraceFilter , setInsuranceFilter] = useState('')
  const {address} = useAccount();
  return (
    <>
    <div className='flex justify-between p-4 md:p-8'>
      <p className='text-success-511  px-3   text-[22px] font-bold  mt-3 py-2'>{filterValue}</p>
      <DropdownBitsiNFt  itemsPurchase={purchaseDropDownItem} setInsuraceFilter={setInsuranceFilter} itemsClaim={purchaseDropDownItem} itemsExtend={purchaseDropDownItem} itemsUpgrade={purchaseDropDownItem} itemsUnlock={purchaseDropDownItem} />
    </div>
    {filterValue == 'Claim' && <MyInsuranceTableClaim />}
    {filterValue == 'Purchase' && <MyInsuraceTablePurchase address={address as string} />}
    {filterValue == 'Extend' && <MyInsuranceTableExtend address={address as string} />}
    {filterValue == 'Upgrade' && <MyInsuranceTableUpgrade address={address as string} />}
    </>
  )
}

export default MyInsuranceTableUserProfile