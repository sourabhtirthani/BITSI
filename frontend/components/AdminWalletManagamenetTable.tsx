'use client'
import { tableAdminWallets } from '@/constants'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { DialogAdminWalletAdd } from './DialogAdminWalletAdd'
import { AdminWallets } from '@/types'
import { useToast } from "@/components/ui/use-toast"
import LoaderComp from './LoaderComp'
import { AdminDeleteSelectedWallet } from './AdminDeleteSelectedWallet'

const AdminWalletManagamenetTable = () => {
    const { toast } = useToast();
    const [dataOfWalletsTable , setDataOfWalletsTable] = useState<AdminWallets[]>([])
    const [refresh, setRefresh] = useState(false);
    const [loaderDuringDataFetch , setLoaderDuringDataFetch] = useState(true);
    useEffect(()=>{
        const getWalletManagementAdminData = async()=>{
            try{
                setLoaderDuringDataFetch(true);
                // const response = await fetch(`/api/admin/wallet-management`, { method: "GET", next: { revalidate: 0 }, },)
                const response = await fetch(`/api/admin/wallet-management`, { cache: 'no-store' })
                const resInJson = await response.json();
                setDataOfWalletsTable(resInJson);
            }catch(error){
                toast({title: "Operation Failed",description:'Failed To Fetch Wallet Data ',duration: 2000,
                    style: {backgroundColor: '#900808',color: 'white',fontFamily: 'Manrope',},});
            }finally{
                setLoaderDuringDataFetch(false)
            }
        }
        getWalletManagementAdminData();
    } , [refresh])
  return (
    <div className='flex flex-col w-full'>
      <div className=' flex flex-col  mb-2'>
      <DialogAdminWalletAdd setRefresh={setRefresh} />
    </div>
    <div className='max-h-[500px]  px-8 max-md:px-4 w-full overflow-y-auto overflow-x-auto scrollbar-thin   mb-20 table-'>
    <table className='w-full text-left mt-4 border-spacing-20  '>
      <thead className='text-black text-center bg-white  font-semibold font-manrope text-[22px] max-sm:text-[10px]   '>
        <tr>
          <th className='p-2 max-sm:p-1'>Wallet Name</th>
          <th className='p-2 max-sm:p-1'>Wallet Address</th>
          <th className='p-2 max-sm:p-1' >Wallet Type</th>
          <th className='p-2 max-sm:p-1' >Action</th>
        </tr>
      </thead>
      <tbody className='overflow-y-auto overflow-x-auto'>
       
        {!loaderDuringDataFetch &&  Array.isArray(dataOfWalletsTable) && dataOfWalletsTable.map((item, index) => {
          return (
            <React.Fragment key={index}>
                
              <tr className='   text-white text-center font-montserrat text-[18px] max-sm:text-[8px] font-semibold'>
                <td className='p-2 max-sm:p-1 border-2 border-gray-600'>{item.name}</td>
                <td className='p-2 max-sm:p-1 border-2 border-r-0  border-gray-600'>{item.address}</td>
                <td className='p-2 max-sm:p-1 border-2 border-r-0  border-gray-600'>{item.type}</td>
                <td className='p-2 max-sm:p-1 border-2 border-l-0 border-gray-600'><AdminDeleteSelectedWallet setRefresh={setRefresh} walletId={item.id} /></td>
              </tr>
              {/* <tr>
                <td  className='h-4 '></td>
              </tr> */}
              
            </React.Fragment>
          )
        })}
        {/* <tr >
            <td></td>
            <td ></td>
        </tr> */}
      </tbody>
    </table>
      {loaderDuringDataFetch && <LoaderComp />}

  </div>
    
  </div>
  )
}

export default AdminWalletManagamenetTable