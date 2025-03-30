'use client'
import React, { useState } from 'react'
import Image from 'next/image'
//  this component might be used later to make the the page inside [nftid] a server component  
//  component is not used anywhere so far 
const BitsiNftArrowDown = ({showDropDownData} : {showDropDownData : boolean}) => {
    const [arrowDetailsTab, setArrowDetialsTab] = useState(showDropDownData);
  const hadnleDetailsArrowClick = ()=>{
    console.log('in here')
    setArrowDetialsTab(!arrowDetailsTab);
    showDropDownData = arrowDetailsTab;
  }

  return (
    <button onClick={hadnleDetailsArrowClick}><Image src='/icons/arrow-up-yellow.svg' height={24} width={24} alt='arrow' className={` transform ${arrowDetailsTab ? 'rotate-180' : ''}`} /> </button>
  )
}

export default BitsiNftArrowDown