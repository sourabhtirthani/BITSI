import { tableMyInsuraceCoin, tableMyInsurance } from '@/constants'
import React from 'react'

const MyInsuranceTableUserProfile = ({filterValue} : {filterValue : string}) => {
  return (
    <>
    <div className='flex justify-between p-4 md:p-8'>
      <p className='text-success-511  px-3   text-[22px] font-bold  mt-3 py-2'>{filterValue}</p>
     
    </div>
    <div className='max-h-[700px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
      <table className='w-full text-left mt-4 border-spacing-20'>
        <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
          <tr>
            <th className='p-2 max-sm:p-1'>Date</th>
            <th className='p-2 max-sm:p-1' >MarketPlace</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>ID</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Event&nbsp;Name</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Insured</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Insurance&nbsp;Coverage</th>
            <th className='p-2 max-sm:p-1 overflow-hidden'>Insurance&nbsp;Expiry</th>
            {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
          </tr>
        </thead>
        <tbody className='overflow-y-auto '>
            <p className='font-montserrat text-white mb-8 mt-8 font-bold text-[12px]'>Uninsured NFTs <span>({tableMyInsurance.length})</span></p>
          {tableMyInsurance.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                  <td className='p-6 max-sm:p-3'>{item.Date}</td>
                  <td className='p-2 max-sm:p-1'>{item.marketPlace}</td>
                  <td className='p-2 max-sm:p-1'>{item.ID}</td>
                  <td className='p-2 max-sm:p-1'>{item.eventName}</td>
                  <td className='p-2 max-sm:p-1'>{item.Price}</td>
                  <td className='p-2 max-sm:p-1'>{item.insured}</td>
                  <td className='p-2 max-sm:p-1'>{item.insuranceCOverage}</td>
                  <td className='p-2 max-sm:p-1'>{item.insuranceExpiry}</td>
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
        <p className='font-montserrat text-white mb-8 mt-8 font-bold text-[12px]'>Uninsured Coins <span>({tableMyInsuraceCoin.length})</span></p>
            <tbody className='overflow-y-auto '>
           
          {tableMyInsuraceCoin.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                  <td className='p-6 max-sm:p-3'>{item.Date}</td>
                  <td className='p-2 max-sm:p-1'>{item.marketPlace}</td>
                  <td className='p-2 max-sm:p-1'>{item.ID}</td>
                  <td className='p-2 max-sm:p-1'>{item.eventName}</td>
                  <td className='p-2 max-sm:p-1'>{item.Price}</td>
                  <td className='p-2 max-sm:p-1'>{item.insured}</td>
                  <td className='p-2 max-sm:p-1'>{item.insuranceCOverage}</td>
                  <td className='p-2 max-sm:p-1'>{item.insuranceExpiry}</td>
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
  )
}

export default MyInsuranceTableUserProfile