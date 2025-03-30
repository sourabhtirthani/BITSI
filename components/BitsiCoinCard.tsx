import React from 'react'
import Image from 'next/image'

const BitsiCoinCard = ({heading , value , net} : {heading : string , value : string , net : string}) => {
    let iconToPlace = ''
    if(net == 'profit'){
        iconToPlace = 'arrow-up';
    }else if(net == 'loss'){
        iconToPlace = 'arrow-low'
    }
    // max-w-[450px] max-h-[289px]
  return (
    <div className='h-full hover:bg-success-509 flex flex-col bg-success-512 secondary-shadow11 secondary-shadow111 rounded-xl '>
        <h4 className='font-manrope xl:text-[22px] lg:text-[18px] md:text-[14px] text-white mt-2 ml-2 font-bold p-2'>{heading}</h4>
        <div className='flex items-center justify-between'>
        <Image src = '/icons/bitsi.svg' height={110} width={110} alt = 'BITSI' />
        <p className='xl:text-[26px] lg:text-[22px] md:text-[18px] font-manrope text-white  font-bold'>{value}</p>
        <Image src = {`/icons/${iconToPlace}.png`} height={48} width={48} alt = 'icon' />
        </div>
        <div>

        </div>
    </div>
  )
}

export default BitsiCoinCard