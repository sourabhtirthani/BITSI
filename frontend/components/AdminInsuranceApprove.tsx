'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { DialogAdminWalletAdd } from './DialogAdminWalletAdd'
import { useToast } from "@/components/ui/use-toast"
import LoaderComp from './LoaderComp'

const AdminInsuranceApproveTable = () => {
  const { toast } = useToast();
  const [dataOfTable, setDataOfTable] = useState([])
  const [refresh, setRefresh] = useState(false);
  const [loaderDuringDataFetch, setLoaderDuringDataFetch] = useState(true);
  useEffect(() => {
    const getWalletManagementAdminData = async () => {
      try {
        setLoaderDuringDataFetch(true);
        const response = await fetch(`/api/admin/insurance-approval`, { cache: 'no-store' })
        const resInJson = await response.json();
        setDataOfTable(resInJson);
      } catch (error) {
        toast({
          title: "Operation Failed", description: 'Failed To Fetch Wallet Data ', duration: 2000,
          style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', },
        });
      } finally {
        setLoaderDuringDataFetch(false)
      }
    }
    getWalletManagementAdminData();
  }, [refresh])
  return (
    <div className='flex flex-col w-full'>
      <div className=' flex flex-col  mb-2'>
        {/* <DialogAdminWalletAdd setRefresh={setRefresh} /> */}
      </div>
      <div className='max-h-[500px]  px-8 max-md:px-4 w-full overflow-y-auto overflow-x-auto scrollbar-thin   mb-20 table-'>
        <table className='w-full text-left mt-4 border-spacing-20  '>
          <thead className='text-black text-center bg-white  font-semibold font-manrope text-[22px] max-sm:text-[10px]   '>
            <tr>
              <th className='p-2'>Sr.no</th>
              <th className='p-2'>Wallet Address</th>
              <th className='p-2'>Amount</th>
              <th className='p-2'>Time</th>
              <th className='p-2'>Status</th>
            </tr>
          </thead>
          <tbody>
            {!loaderDuringDataFetch && dataOfTable.map((item, index) => (
              <tr key={index} className='text-white text-center font-semibold'>
                <td className='p-2 border-2 border-gray-600'>{index + 1}</td>
                <td className='p-2 border-2 border-gray-600'>{item.address}</td>
                <td className='p-2 border-2 border-gray-600'>{item.amount}</td>
                <td className='p-2 border-2 border-gray-600'>{item.createdAt}</td>
                <td className='p-2 border-2 border-gray-600'>{item.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {loaderDuringDataFetch && <LoaderComp />}

      </div>

    </div>
  )
}

export default AdminInsuranceApproveTable