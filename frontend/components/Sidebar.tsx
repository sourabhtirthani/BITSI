'use client'
import Image from 'next/image'
import Link from 'next/link'
import SignoutAdminPanel from './SignoutAdminPanel'
import {Bold, ChevronDown , ChevronUp} from 'lucide-react'
import { useState } from 'react'

const Sidebar = () => {
  const [showDropDownViewAnalyse , setShowDropDownViewAnalyse] = useState(false)
  const [showDropDownMinting , setShowDropDownMinting] = useState(false);
  return (
   <div className='bg-success-523  flex flex-col p-4 max-w-[204px] w-[204px] min-w-[204px] h-[95vh] overflow-y-auto table-body  justify-start gap-9 max-sm:hidden'>
    <div className='flex items-center mt-4 gap-2 self-start'>
    <Image src = '/icons/bitsi.svg' height={44.46} width={45} alt='BITSI LOGO' />
    <h1 className='text-[20px] font-manrope font-bold text-white'>BITSI</h1>
    </div>
    <Link href= '/admin/analytic-dashboard'> <p className='text-[18px] font-manrope self-start text-white font-bold'>Analytic&nbsp;Dashboard</p></Link>
    <Link href= '/admin/wallet-management'><p className='text-[18px] font-manrope self-start text-white font-bold '>Wallets</p></Link>
    <Link href= '/admin/burn-token'><p className='text-[18px] font-manrope self-start text-white font-bold '>Burn Token</p></Link>
    <Link href= '/admin/prices'><p className='text-[18px] font-manrope self-start text-white font-bold '>Prices</p></Link>
    <Link href= '/admin/investor'><p className='text-[18px] font-manrope self-start text-white font-bold '>Investor</p></Link>
    <div className=' flex flex-col justify-center items-center  w-full gap-3'>
   <div className='self-start flex items-center justify-center gap-1' onClick={()=>{setShowDropDownMinting(prev =>! prev)}}>
    <label className='text-[18px] font-manrope  flex items-start text-white font-bold '>Minting</label>
    {showDropDownMinting == false ? <ChevronDown color='white'  strokeWidth={4}  /> : <ChevronUp color='white'  strokeWidth={4} />  }
    </div>
    <div className={`${showDropDownMinting == true ? '' : 'hidden'} w-full gap-2 flex flex-col items-center`}>
    <Link href= '/admin/nft-minting'><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>NFT Minting</p></Link>
    <Link href= '/admin/coin-minting'><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Coin Minting</p></Link>
    </div>
    </div>
    
    
    <Link href= '/admin/coin-insurance'><p className='text-[18px] font-manrope self-start text-white font-bold '>Coin Insurance</p></Link>
    <Link href= '/admin/nft-insurance'><p className='text-[18px] font-manrope self-start text-white font-bold '>NFT Insurance</p></Link>
    <div className=' flex flex-col justify-center items-center  w-full gap-3'>
    <div  className='self-start flex items-center justify-center gap-1' onClick={()=>{setShowDropDownViewAnalyse(prev =>! prev)}}>
    <label className='text-[18px] font-manrope  flex items-start text-white font-bold '>View & Analyse</label> 
    {showDropDownViewAnalyse == false ? 
    <ChevronDown color='white'  strokeWidth={4}  /> : <ChevronUp color='white'  strokeWidth={4} /> }
    </div>
    <div className={`${showDropDownViewAnalyse == true ? '' : 'hidden'} w-full gap-2 flex flex-col items-center`}>
    <Link href= '/admin/views-and-analysis-wallets'  ><p className='text-[18px] font-manrope self-start  text-white font-bold text-opacity-50'>Wallets</p></Link>
    <Link href= '/admin/views-and-analysis-events'><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Events</p></Link>
    </div>
    </div>
    <Link href= '/admin/compensation'><p className='text-[18px] font-manrope self-start text-white font-bold '>Compensation</p></Link>
    <Link href= '/admin/policy-status'><p className='text-[18px] font-manrope self-start text-white font-bold '>Policy Status</p></Link>
    <Link href= '/admin/ownership'><p className='text-[18px] font-manrope self-start text-white font-bold '>Ownership</p></Link>
    <SignoutAdminPanel />

    {/* <div className='self-start flex flex-col justify-center items-center w-full gap-3'>
    <p className='text-[18px] font-manrope self-start text-white font-bold'>View&nbsp;&&nbsp;Analysis</p>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>NFT</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Coin</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Insurance</p></Link>
    </div> */}
    {/* <div className='self-start flex flex-col justify-center items-center w-full gap-3'>
    <p className='text-[18px] font-manrope self-start text-white font-bold'>Analytic&nbsp;Dashboard</p>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Numerics</p></Link>
    <Link href= ''><p className='text-[18px] font-manrope  text-white font-bold text-opacity-50'>Graphs</p></Link>
    </div> */}
    
   </div>
  )
}

export default Sidebar