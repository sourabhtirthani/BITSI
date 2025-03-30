'use client'
import Image from 'next/image';
import React from 'react'

const FilterButtonUI = ({stateVar , setStateVar} : {stateVar : string , setStateVar : React.Dispatch<React.SetStateAction<string>>;}) => {
    const handleClick = ()=>{
        setStateVar('');
    }
  return (
    <div className='flex w-fit items-center bg-success-512 px-2 gap-1 secondary-shadow11 '>
    <p className='font-montserrat font-semibold text-white text-[22px] max-md:text-[14px]'>{stateVar}</p>
    <Image src='/icons/entypo_cross.svg' height={20} width={20} alt='Remove Filter' className='hover:bg-success-509 cursor-pointer' onClick={handleClick} />
  </div>
  )
}

export default FilterButtonUI