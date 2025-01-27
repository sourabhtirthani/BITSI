'use client'
import { countryList } from '@/constants';
import { set } from 'date-fns';
import { ChevronDown, Router } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { toast } from './ui/use-toast';
import { createProfileWhenWalletConnect } from '@/actions/uploadNft';
import Link from 'next/link';

const SignupPopup = () => {
  const { address, isConnected } = useAccount();
  const [showPopup, setShowPopup] = useState(false);
  const [openDrowdown, setOpenDropdown] = useState(false);
  const [loadingSignup , setLoadingSignup] = useState(false);
  const [showKycOption, setShowKycOption] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [countryName, selectCountryName] = useState<string | null>(null);

  const toggleDropdown = () => setOpenDropdown(!openDrowdown);

  useEffect(() => {
    const checkUser = async () => {
      if (isConnected) {
        const res = await fetch(`/api/user/${address}`, { cache: 'no-cache' });
        const data = await res.json();
        if (res.status == 404) {
          setShowPopup(true);
        } else if (res.status == 200) {
          setShowPopup(false);
        }
      } else {
        setShowPopup(false);
      }
    }
    checkUser();
  }, [address])

  const handleSelectCountry = (conutry: string) => {
    try {
      selectCountryName(conutry);
      setOpenDropdown(false);
    } catch (error) {
      console.log(error)
    }
  }

  const handleSumitForm = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const country = formData.get('country') as string;
    formData.append('address', address as string);
    // const isInvs = formData.get('investor');
    // console.log(`this isthe status of the investor ${isInvs}`)
    // return;
    if(!country){
      setHasError(true);
      return
    }
    try {
      console.log(formData)
      setLoadingSignup(true);
      const createAccount = await createProfileWhenWalletConnect(formData);
      if(createAccount.success == false){
        toast({ title: "Error", description: createAccount.message, duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, })
        setLoadingSignup(false);
        return;
      }
      setShowPopup(false);
      setShowKycOption(true);
      toast({ title: "Success", description: 'Account created successfully', duration: 2000, style: { backgroundColor: '#1DB954', color: 'white', fontFamily: 'Manrope', }, })
    } catch (error) {
      console.log(error);
      toast({ title: "Error", description: 'Error signing up', duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, })
    }finally{
      setLoadingSignup(false);
    }
  }

  const completeKyc = async()=>{
    setShowKycOption(false);
  }
  return (
    <>
      {showPopup == true ?
        <div className='fixed inset-0  flex items-center justify-center z-50 backdrop-blur-sm bg-black/30'>
          <div className='md:fixed md:top-[40%] md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-1/2 bg-white max-md:p-2 p-6 rounded-2xl shadow-xl max-md:h-full max-md:w-full'>
            <div className='flex flex-col md:p-4 max-md:p-2 font-montserrat justify-start'>
              <p className='font-medium text-black text-[4rem] max-md:text-[2rem] max-md:mt-7'>Join&nbsp;Us!</p>
              <p className='text-black text-[1rem] font-normal max-md:hidden'>Unlock the power of BITSI and start collecting today!</p>

              <form className='flex flex-col w-full mt-2 max-md:mt-1 gap-3 max-md:gap-4' onSubmit={(e) => { handleSumitForm(e) }}>
                <input required type='text' name='name' placeholder='UserName' className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
                <input required type='email' name='email' placeholder='Email' className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
                <input type='number' name='mobile' placeholder='Mobile Number (Optional)' className='no-spinners w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
                <input  type ='text' hidden id='country' name='country' placeholder='Country'  className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' value={countryName ?? ''}  />
                <div className='flex justify-between items-center relative'>
                  <label htmlFor='country' onClick={toggleDropdown} className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-[#838383] text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal '>{countryName == null ? 'Select Country*' : countryName}</label>
                  {(hasError && countryName == null) && (
            <span className="text-red-500 absolute -top-2  bg-white text-sm ml-2 ">This field is required</span>
          )}
                  <ChevronDown color='#838383' className='absolute right-0.5' />
                </div>
                <div className='relative'>
                  <div
                    className={` max-h-[170px] absolute right-0  w-full bg-white border border-gray-200 divide-y table-body divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 transition-transform origin-top overflow-y-auto ${openDrowdown ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
                      }`}
                    style={{ transformOrigin: "top" }}
                  >

                    {countryList.map((item, index) => {
                      return (
                        <div key={index} onClick={() => { handleSelectCountry(item) }} className='py-1.5 scale-y-100 overflow-y-auto z-50 hover:bg-[#F9F9F9] cursor-pointer'>
                          <p>{item}</p>
                        </div>
                      )
                    })}

                  </div>
                  <div className='flex gap-2 items-center'>
                  <label htmlFor='investor'>Signup As Investor</label>
                  <input type = 'checkbox' name='investor' id='investor' className='h-4 w-4' />
                  </div>
                </div>
                <button type='submit' disabled = {loadingSignup} className='bg-black w-full rounded-xl max-md:py-1 py-3 font-semibold text-center text-white'>{loadingSignup ? 'Loading...' : 'Sign up'}</button>
              </form>

            </div>

          </div>
        </div>
        : null}
        {showPopup == false && showKycOption == true && <>
          <div className='fixed inset-0  flex items-center justify-center z-50 backdrop-blur-sm bg-black/30'>
          <div className='md:fixed md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-1/3  bg-white max-md:p-2 p-6 rounded-2xl shadow-xl  max-md:w-full'>
          <div className='flex flex-col  gap-4  font-montserrat text-black text-[0.8rem] max-md:text-[0.6rem]' >
            <p className='text-[1rem] font-bold max-md:text-[0.8rem] '>Would you like to Complete your KYC</p>
            <p className='font-normal'>Please verify your KYC to complete your registration.</p>
            <div className='flex gap-2 w-full'>
              <button className='bg-white border-[1px] w-1/2  border-[#FFB622] rounded-xl max-md:py-1 py-3 font-semibold text-center text-black' onClick={() => { setShowKycOption(false) }}>Cancel</button>
              <Link href = {'/about-kyc'} className='bg-black border-[1px] border-black  rounded-xl w-1/2 max-md:py-1 py-3 font-semibold text-center text-white' onClick={completeKyc}>Proceed</Link>
            </div>
          </div>
          </div>
          </div>
        </>}
    </>
  )
}

export default SignupPopup