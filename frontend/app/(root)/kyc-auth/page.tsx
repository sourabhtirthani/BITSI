'use client'
import React, { ChangeEvent, useEffect, useState } from 'react'
import Image from 'next/image'
import FormRow from '@/components/FormRow'
import FormLabel from '@/components/FormLabel'
import InputText from '@/components/InputText'
import Button from '@/components/Button'
import { AdminOtpBox } from '@/components/AdminOtpBox'
import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi'
import { KycOtpBox } from '@/components/KycOtpBox'
import { isEmail } from '@/lib/utils'
import { sendOtp } from '@/lib/sendEmails'

const KycAuth = () => {
  const {address , isConnected} = useAccount();
  const { push } = useRouter();
  const [showOtp, setShowOtp] = useState(false);
  const [verifyText ,setVerifyText] = useState('Verify');
  const [optVal , setOtpVal] = useState('')
  const [emailText , setEmailText] = useState('')
  const [showNotAnEmailText , setShowNotAnEmailText] = useState(false);
  const [showWrongOtpText , setShowWrongOtpText] = useState(false);
  const [loaderForAuthenticate, setLoaderForAuthenticate] = useState(false);
  
  useEffect(()=>{
    if(!isConnected){
      push('/');
    }
  } , [isConnected])

  const handleVerifyClick = ()=>{
    try{
    if(verifyText == 'Verify'){
      if(!isEmail(emailText)){
        setShowNotAnEmailText(true);
       
        return;
      }
      // const res = sendOtp(emailText);
      setShowNotAnEmailText(false);
    setShowOtp(true);
    setVerifyText('Resend');
    return;
    }
    else if(verifyText == 'Resend'){
      console.log('logic to resend otp')
    }
  }catch(error){

  }

  }

  const handleSubmit = (e: React.SyntheticEvent)=>{
    try{
    e.preventDefault();
    setLoaderForAuthenticate(true)
    console.log('submitted form');
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const email = formData.get("email");
    const otp = formData.get("otp");
    if(!email || !otp){
      return;
    }
    console.log(formData.get("username"))
    console.log(formData.get("otp"))
    console.log(formData.get("email"))
    console.log(formData.get("nationality"))
    
    }catch(error){
      
    }finally{
      setLoaderForAuthenticate(false);
    }
  }

  return (
    <>
      <div className='navbar-space'> </div>
      <section className='bg-success-503'>
        <div className='bg-kyc-auth flex md:py-4'>
          <div className='md:w-3/4 px-8 py-16 max-md:py-8 max-md:px-4'>
            <h1 className='text-[64px] max-sm:text-[44px] text-success-513 '>Authentication</h1>
            <p className='text-[22px] text-success-513'>Help your Account with criminal activities with the help of KYC authentication</p>
          </div>

          <div className='md:w-1/4 max-md:hidden p-1'>
            <Image src='/icons/kyc-auth3.png' height={456} width={483} alt='kyc auth' />
          </div>
        </div>

        <div className='mt-10'>
          <form className='p-2' onSubmit={handleSubmit}>
            <div className='flex  max-sm:flex-col sm:mb-0  sm:w-3/4 sm:gap-24'>
              <FormRow className='sm:w-3/6 p-4'>
                <FormLabel htmlFor='username' className='font-montserrat text-white text-[22px] font-semibold'>Username*</FormLabel>
                <InputText id='username' name='username' type='text' placeHolder='eg-smith' className='p-3 bg-success-512 text-white  secondary-shadow11' />

              </FormRow>
              <FormRow className='sm:w-3/6 p-4'>
                <FormLabel htmlFor='nationality' className='font-montserrat text-white text-[22px] font-semibold'>Nationality*</FormLabel>
                <InputText id='nationality' name='nationality' type='text' placeHolder='eg USA' className='w-fit p-3 text-white bg-success-512  secondary-shadow11' />

              </FormRow>
            </div>
            <div className='flex flex-col max-sm:flex-col sm:mb-0  sm:w-3/4'>
              <FormRow className='w-full p-4'>
                <FormLabel htmlFor='email' className='font-montserrat text-white text-[22px] font-semibold'>Email*</FormLabel>
                <div className='flex items-center relative'>
                <input id='email' name='email' type='email'  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailText(e.target.value)} placeholder='eg USA' className='w-full rounded  block p-3 bg-success-512 text-white  secondary-shadow11' />
                <p onClick={handleVerifyClick} className='text-success-508 absolute right-2 cursor-pointer'>{verifyText}?</p>
                </div>
                <p className={`text-red-700 font-manrope font-semibold ${showNotAnEmailText == true ? '' : 'hidden'}`}>Not an email</p>
              </FormRow>
              {showOtp && (
              <FormRow className=' p-4'>
                <label htmlFor='otp' className='font-montserrat block mb-2 text-white text-[22px] w-fit font-semibold'>OTP*</label>
                <input id ='otp' name='otp' value={optVal} className='hidden' required />
                <KycOtpBox value={optVal} setValue={setOtpVal} />
                <p className={`text-red-700 font-manrope font-semibold ${showWrongOtpText == true ? '' : 'hidden'}`}>Please enter OTP</p>
              </FormRow>)}
            </div>
            {showOtp && (
            <div className='flex justify-center mb-24 max-sm:mb-10 mt-4'>
            <button  className={`bg-success-511 py-3 max-sm:px-24 px-32 font-bold gap-1 rounded-3xl flex justify-end text-white`}>Authenticate</button>
            </div>)}
          </form>

        </div>
      </section>

    </>
  )
}

export default KycAuth