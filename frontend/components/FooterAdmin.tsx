import React from 'react'

const FooterAdmin = () => {
    const currentYear = new Date().getFullYear();
  return (  
    <div className='bg-success-509 w-full h-[86px] flex items-center justify-center'>
        <p className='text-white font-inter font-normal text-[14px]  '>Copyright ©{currentYear} BITSI Crypto&apos;s Insurance Mechanism. All Rights Reserved.</p>
    </div>
  )
}

export default FooterAdmin