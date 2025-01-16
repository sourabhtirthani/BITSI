'use client'
import { countryList } from '@/constants';
import React, { useEffect ,useState } from 'react'
import { useAccount } from 'wagmi'

const SignupPopup = () => {
    const {address , isConnected} = useAccount();
    const [showPopup , setShowPopup] = useState(false);
    const [openDrowdown ,setOpenDropdown] = useState(false);

    const toggleDropdown = () => setOpenDropdown(!openDrowdown);

    useEffect(()=>{
        if(isConnected){
            
        }
    } , [address])
  return (
    <>
    {showPopup == true ?
    <div className='fixed inset-0  flex items-center justify-center z-50 backdrop-blur-sm bg-black/30'>
    <div className='fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 bg-white max-md:p-2 p-6 rounded-2xl shadow-xl'>
   <div className='flex flex-col md:p-4 max-md:p-2 font-montserrat justify-start'>
    <p className='font-medium text-black text-[4rem] max-md:text-[2rem]'>Join&nbsp;Us!</p>
    <p className='text-black text-[1rem] font-normal max-md:hidden'>Unlock the power of NFTs—sign up on BITSI and start collecting today!</p>
   
        <form className='flex flex-col w-full mt-2 max-md:mt-1 gap-3 max-md:gap-2'>
        <input type ='text' name='username' placeholder='UserName'  className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
        <input type ='email' name='email' placeholder='Email'  className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
        <input type ='number' name='mobile' placeholder='Mobile Number (Optional)'  className='no-spinners w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
        <input type ='text' name='Country' placeholder='Country'  className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
        {/* <p onClick={toggleDropdown} className='text-black text-left  rounded-md shadow-md ring-1 ring-black  focus:outline-none focus:ring-2 focus:ring-black w-full '>Select Coutnry</p> */}
        {/* <div
        className={` max-h-[200px] absolute right-0 mt-2 w-full bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-transform origin-top ${
          openDrowdown ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        }`}
        style={{ transformOrigin: "top", overflow: "hidden" }}
      >
        {countryList.map((item , index)=>{
            return (
                <div key={index} className='max-h-[200px] overflow-y-auto'>
                    <p>{item}</p>
                    </div>
            )
        })}
      </div> */}
        </form>
  
   </div>
    </div>
    </div>
: null}
    </>
  )
}

export default SignupPopup