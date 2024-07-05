import { tableAdminWallets } from '@/constants'
import Image from 'next/image'
import React from 'react'

const WalletManagement = () => {
  return (
    <div className='p-8 max-md:p-4 w-full'>
        <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
            <p className='font-manrope font-bold text-[18px] text-success-511'>Wallets </p>
            <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>Connect</button>
        </div>
        <div className='max-h-[500px]  px-8 max-md:px-4  max-xl:table-body mb-20 table-body'>
        <table className='w-full text-left mt-4 border-spacing-20'>
          <thead className='text-black text-center bg-white font-semibold font-manrope text-[22px] max-sm:text-[10px]   '>
            <tr>
              <th className='p-2 max-sm:p-1'>Wallet Id</th>
              <th className='p-2 max-sm:p-1' >Wallet Type</th>
              <th className='p-2 max-sm:p-1'></th>
            </tr>
          </thead>
          <tbody className='overflow-y-auto '>
           
            {tableAdminWallets.map((item, index) => {
              return (
                <React.Fragment key={index}>
                    
                  <tr className=' w-full  text-white text-center font-montserrat text-[18px] max-sm:text-[8px] font-semibold'>
                    <td className='p-2 max-sm:p-1 border-2 border-gray-600'>{item.walletId}</td>
                    <td className='p-2 max-sm:p-1 border-2 border-r-0  border-gray-600'>{item.walletType}</td>
                    <td className='p-2 max-sm:p-1 border-2 border-l-0 border-gray-600'><Image src = '/icons/mdi_delete-circle.svg' height={24} width={24} alt='delete'  /></td>
                  </tr>
                  {/* <tr>
                    <td  className='h-4 '></td>
                  </tr> */}
                  
                </React.Fragment>
              )
            })}
            <tr >
                <td></td>
                <td ></td>
            </tr>
          </tbody>

        </table>
      </div>
      
        </div>
  )
}

export default WalletManagement