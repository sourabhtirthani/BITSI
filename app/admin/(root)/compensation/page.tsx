'use client'
import { AdminDialogPayCompensationConfirm } from '@/components/AdminDialogPayCompensationConfirm'
import { tableAdminCompensation } from '@/constants'
import { AdminWalletMintProps, CompensationDetails } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useToast } from "@/components/ui/use-toast"
import LoaderComp from '@/components/LoaderComp'
import { formatAddress, formatAddressUserZone } from '@/lib/utils'
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel'
import { sendClaimAcceptRejectEmail } from '@/lib/sendEmails'
import { DropDownAdminWalletList } from '@/components/DropDownAdminWalletList'


const Compensation = () => {
    const { toast } = useToast()
    const [allCompensationWallets , setAllCompensationWallets] = useState<AdminWalletMintProps[]>([])
    const [searchValue , setSearchValue] = useState('')
    const [loaderState ,setLoaderState] = useState(true);
    const [compensationDetails , setCompensationDetails] = useState<CompensationDetails[]>([]);
    const [historyCompensationDetails , setHistoryCompensationDetails] = useState<CompensationDetails[]>([]);
    const [wallet ,setWallet] = useState('');

    useEffect(()=>{
      const getAllCompensatoinWallets = async()=>{
        try{
          const res = await fetch(`/api/admin/wallet-management/compensation-wallets`, { method: "GET", next: { revalidate: 0 }})
          const resInJson = await res.json();
          setAllCompensationWallets(resInJson);
        }catch(error){
          console.log(`error fetching all the mint wallets`);
          console.log(error)
        }
      }
      getAllCompensatoinWallets();
    }, [])

    useEffect(()=>{
      const getAllCompensation = async()=>{
        try{
        const res = await fetch(`/api/admin/compensation/pending`, { method: "GET", next: { revalidate: 0 }, },)
        const compensation = await res.json();
        console.log(compensation)
        setCompensationDetails(compensation);
        const resOfHistory = await fetch(`/api/admin/compensation/completed`, { method: "GET", next: { revalidate: 0 }, },)
        const allCompHistory = await resOfHistory.json();
        setHistoryCompensationDetails(allCompHistory);
        }catch(error){
          console.log(error)
          toast({ title: "Fetching error", description: "Error fetching all compensation details", duration: 2000,
            style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',
            },
          })
        }finally{
          setLoaderState(false);
        }
      }
      getAllCompensation();
    }, [])

    const handleSearchClick = ()=>{
        console.log('serach button clicked')
    }

   
  return (
    <div className='bg-success-503 w-full   flex flex-col gap-12 p-8 max-md:p-4'>
      
    <div className='flex justify-between max-xl:justify-start max-xl:gap-4 items-center'>
        <p className='font-manrope font-bold text-[18px] text-success-511'>Views & Analysis </p>
        {/* <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>Connect</button> */}
        <AdminAdressButtonForAdminPanel />
    </div>
    <div className='flex flex-col gap-3'>
        <p className='text-[18px] text-white font-montserrat font-bold '>Select Wallet*</p>
        {/* <Dropdown items={nftMintingDropDown} showIcon={false} buttonName='Select Your Wallet' arrowImage='/icons/arrow-dropdown.svg' setValue={setWallet} /> */}
        <DropDownAdminWalletList selectedOption={wallet} setSelectedOption={setWallet} allData={allCompensationWallets} />
        {/* <button className='bg-success-511 px-28 mt-8 self-end py-2 text-white font-bold text-[20px] w-fit rounded-3xl'>Mint</button> */}
      </div>
  <div className='flex max-md:flex-col  gap-10'>
    <div className='flex justify-between max-w-screen'>
      <div className='flex '>
    <input placeholder='Search your NFTs....' type='text' className='rounded-xl focus:outline-none px-1 max-sm:text-[12px] md:text-[20px] rounded-r-none md:w-[353px] font-montserrat h-[68px]' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
      <Image src = '/icons/search-bg-yellow.svg' height={68} width={83}  alt = 'search icon' className='' onClick={handleSearchClick}/>
      </div>
      <div>
      {/* drop down here */}
      </div>
      </div>
      </div>
       <div className='max-h-[500px]  px-8 max-md:px-4 overflow-x-auto max-xl:table-body scrollbar-none overflow-y-auto mb-20 table-body'>
        <table className='w-full text-left mt-4 border-spacing-20'>
          <thead className='text-success-502 overflow-x-auto text-center bg-success-511 font-semibold font-manrope text-[22px] max-sm:text-[10px]   '>
            <tr>
              <th className='p-2 max-sm:p-1'>Request&nbsp;Date</th>
              <th className='p-2 max-sm:p-1' >UserName</th>
              {/* <th className='p-2 max-sm:p-1'>Loss</th> */}
              <th className='p-2 max-sm:p-1'>Loss%</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Compensation Amount</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Compensate</th>
            </tr>
          </thead>
          <tbody className='overflow-y-auto '>
           
            {loaderState == false && Array.isArray(compensationDetails) && compensationDetails.map((item, index) => {
              return (
                <React.Fragment key={index}>
                    
                  <tr className=' w-full  text-white text-center font-montserrat text-[18px] max-sm:text-[8px] font-semibold'>
                    <td className='p-2 max-sm:p-1'>{new Date(item.requestDate).toDateString()}</td>
                    <td className='p-2 max-sm:p-1'>{formatAddressUserZone(item.userAdress as string)}</td>
                    {/* <td className='p-2 max-sm:p-1'>{item.loss}</td> */}
                    <td className='p-2 max-sm:p-1'>{item.lossPercent}</td>
                    <td className='p-2 max-sm:p-1'>{item.compensationAmount}</td>
                    <td className='p-2 max-sm:p-1'><AdminDialogPayCompensationConfirm userAddress={item.userAdress} amount={item.compensationAmount} idOfNft = {item.assetId} compensationId={item.id} /></td>
                  
                  </tr>
                  <tr>
                    <td  className='h-4 '><hr /></td>
                    <td  className='h-4 '><hr /></td>
                    <td  className='h-4 '><hr /></td>
                    <td  className='h-4 '><hr /></td>
                    <td  className='h-4 '><hr /></td>
                    <td  className='h-4 '><hr /></td>
                  </tr>
                  
                </React.Fragment>
              )
            })}
          </tbody>

        </table>
      </div>
        {loaderState == true && <LoaderComp />}
      
          <p className='text-white text-[24px] font-manrope font-bold'>History</p>
        <div className='max-h-[500px]  px-8 max-md:px-4 overflow-x-auto max-xl:table-body scrollbar-none overflow-y-auto mb-20 table-body'>
        <table className='w-full text-left mt-4 border-spacing-20'>
          <thead className='text-black overflow-x-auto text-center bg-white font-semibold font-manrope text-[22px] max-sm:text-[10px]   '>
            <tr>
              <th className='p-2 max-sm:p-1'>Request&nbsp;Date</th>
              <th className='p-2 max-sm:p-1' >UserName</th>
              {/* <th className='p-2 max-sm:p-1'>Loss</th> */}
              <th className='p-2 max-sm:p-1'>Loss%</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Compensation Amount</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Status</th>
            </tr>
          </thead>
          <tbody className='overflow-y-auto bg-success-532'>
           
            {loaderState == false && historyCompensationDetails.map((item, index) => {
              return (
                <React.Fragment key={index}>
                    
                  <tr className=' w-full  text-white text-center font-montserrat text-[18px] max-sm:text-[8px] font-semibold'>
                    <td className='p-2 max-sm:p-1'>{new Date(item.requestDate).toDateString()}</td>
                    <td className='p-2 max-sm:p-1'>{formatAddressUserZone(item.userAdress as string)}</td>
                    {/* <td className='p-2 max-sm:p-1'>{item.loss}</td> */}
                    <td className='p-2 max-sm:p-1'>{item.lossPercent}</td>
                    <td className='p-2 max-sm:p-1'>{item.compensationAmount}</td>
                    <td className='p-2 max-sm:p-1'>{item.Status}</td>
                    {/* <td className='p-2 max-sm:p-1'><AdminDialogPayCompensationConfirm userAddress={item.userAdress} amount={item.compensationAmount} idOfNft = {item.assetId} compensationId={item.id} /></td> */}
                  
                  </tr>
                  
                  
                </React.Fragment>
              )
            })}
          </tbody>

        </table>

      </div>
      {loaderState == true && <LoaderComp />}

</div>
  )
}

export default Compensation