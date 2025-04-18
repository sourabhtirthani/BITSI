'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { DialogAdminWalletAdd } from './DialogAdminWalletAdd'
import { useToast } from "@/components/ui/use-toast"
import LoaderComp from './LoaderComp'
import { showToastUI } from '@/lib/utils'

type InsuranceApprovalData = {
  userAddress: string;
  unInsuredCoins: number;
  updatedAt: string;
  status: number;
};

const AdminInsuranceApproveTable = () => {
  const { toast } = useToast();
  const [dataOfTable, setDataOfTable] = useState<InsuranceApprovalData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [loaderDuringDataFetch, setLoaderDuringDataFetch] = useState(true);
  useEffect(() => {
    const getWalletManagementAdminData = async () => {
      try {
        setLoaderDuringDataFetch(true);
        const response = await fetch(`/api/admin/insurance-approval`, { cache: 'no-store' })
        
        const resInJson = await response.json();
        console.log("resInJson",resInJson);
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


  const approveNow = async (item: any) => {
    console.log(item, " id,satusid,satus")
    try {
      try {
        const response = await fetch(`/api/userzone/insurance/purchase/coin/${item.userAddress}`, {
          method: "POST",  // Ensure it's "POST"
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: 2, id: item.id }),
        });

        if (response.status) {
          showToastUI({ title: "Success", description: "Request approved successfully", operation: "success" });
        }

        console.log("Response Status:", response.status);

        const data = await response.json();
        console.log("Response Data:", data);

      } catch (error) {
        console.error("Fetch Error:", error);
      }

    } catch (error) {
      console.log(error, " errorerror")
    }
  }


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
          {!loaderDuringDataFetch && Array.isArray(dataOfTable) && dataOfTable.map((item, index) => (
              <tr key={index} className='text-white text-center font-semibold'>
                <td className='p-2 border-2 border-gray-600'>{index + 1}</td>
                <td className='p-2 border-2 border-gray-600'>{item.userAddress}</td>
                <td className='p-2 border-2 border-gray-600'>{item.unInsuredCoins}</td>
                <td className='p-2 border-2 border-gray-600'>{new Date(item.updatedAt).toDateString()}</td>
                <td className='p-2 border-2 border-gray-600'>

                  {item.status === 2 && <span className='text-yellow-400 font-semibold'>Approved</span>}
                  {item.status === 1 && (
                    <button
                      onClick={() => approveNow(item)}
                      className='px-4 py-1 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out'
                    >
                      Approve Now
                    </button>
                  )}
                </td>
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