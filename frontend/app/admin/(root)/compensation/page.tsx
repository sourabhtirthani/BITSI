'use client'
import { tableAdminCompensation } from '@/constants'
import Image from 'next/image'
import React, { useState } from 'react'

const Compensation = () => {
    const [searchValue , setSearchValue] = useState('')
    const handleSearchClick = ()=>{
        console.log('serach button clicked')
    }
  return (
    <div className='bg-success-503 w-full   flex flex-col gap-12 p-8 max-md:p-4'>
      
    <div className='flex justify-between max-xl:justify-start max-xl:gap-4 items-center'>
        <p className='font-manrope font-bold text-[18px] text-success-511'>Views & Analysis </p>
        <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>Connect</button>
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
       <div className='max-h-[500px]  px-8 max-md:px-4 overflow-x-scroll max-xl:table-body xl:scrollbar-none overflow-y-auto mb-20 table-body'>
        <table className='w-full text-left mt-4 border-spacing-20'>
          <thead className='text-success-502 text-center bg-success-511 font-semibold font-manrope text-[22px] max-sm:text-[10px]   '>
            <tr>
              <th className='p-2 max-sm:p-1'>Date</th>
              <th className='p-2 max-sm:p-1' >UserName</th>
              <th className='p-2 max-sm:p-1'>Loss</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Compensation Amount</th>
            </tr>
          </thead>
          <tbody className='overflow-y-auto '>
           
            {tableAdminCompensation.map((item, index) => {
              return (
                <React.Fragment key={index}>
                    
                  <tr className=' w-full  text-white text-center font-montserrat text-[18px] max-sm:text-[8px] font-semibold'>
                    <td className='p-2 max-sm:p-1'>{item.date}</td>
                    <td className='p-2 max-sm:p-1'>{item.username}</td>
                    <td className='p-2 max-sm:p-1'>{item.loss}</td>
                    <td className='p-2 max-sm:p-1'>{item.compensationAmount}</td>
                  </tr>
                  <tr>
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
      
</div>
  )
}

export default Compensation