'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import FormRow from '@/components/FormRow'
import FormLabel from '@/components/FormLabel'
import InputText from '@/components/InputText'
import Button from '@/components/Button'
const KycAuth = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [verifyText ,setVerifyText] = useState('Verify');

  const handleVerifyClick = ()=>{
    if(verifyText == 'Verify'){
    setShowOtp(true);
    setVerifyText('Resend');
    return;
    }
    else if(verifyText == 'Resend'){
      console.log('logic to resend otp')
    }


  }

  const handleSubmit = (e: React.SyntheticEvent)=>{
    e.preventDefault();
    console.log('submitted form');
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    console.log(formData.get('otp1'));
    const jsonObject: { [key: string]: any } = {};
    formData.forEach((value, key) => {
      // Check if key already exists
      if (jsonObject.hasOwnProperty(key)) {
        if (!Array.isArray(jsonObject[key])) {
          jsonObject[key] = [jsonObject[key]];
        }
        jsonObject[key].push(value);
      } else {
        jsonObject[key] = value;
      }
    });
    console.log('Form data in JSON:', JSON.stringify(jsonObject));
  }

  return (
    <>
      <div className='navbar-space'> </div>
      <section className='bg-success-503'>
        <div className='bg-kyc-auth flex md:py-4'>
          <div className='md:w-3/4 p-16 max-md:p-8'>
            <h1 className='text-[64px] max-sm:text-[44px] text-success-513 '>Authentication</h1>
            <p className='text-[22px] text-success-513'>Help your Account with criminal activities with the help of KYC authentication</p>
          </div>

          <div className='md:w-1/4 max-md:hidden'>
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
                <div className='flex items-center'>
                <InputText id='email' name='email' type='text' placeHolder='eg USA' className='w-fit p-3 bg-success-512 text-white  secondary-shadow11' />
                <p onClick={handleVerifyClick} className='text-success-508 relative right-16 cursor-pointer'>{verifyText}?</p>
                </div>
              </FormRow>
              {showOtp && (
              <FormRow className=' p-4'>
                <FormLabel htmlFor='otp' className='font-montserrat text-white text-[22px] w-fit font-semibold'>OTP*</FormLabel>
                <input id='otp1' name='otp1' type='digit' maxLength={1} className='w-[45px] p-3 bg-success-512  secondary-shadow11' />
                <input id='otp2' name='otp2' type='digit' maxLength={1} className='w-[45px] p-3 bg-success-512 ml-3 secondary-shadow11' />
                <input id='otp3' name='otp3' type='digit' maxLength={1} className='w-[45px] p-3 bg-success-512  ml-3 secondary-shadow11' />
                <input id='otp4' name='otp4' type='digit' maxLength={1} className='w-[45px] p-3 bg-success-512 ml-3 secondary-shadow11' />

              </FormRow>)}
            </div>
            {showOtp && (
            <div className='flex justify-center mb-24 max-sm:mb-10 mt-4'>
            <Button className='bg-success-511 py-3 max-sm:px-24 px-32 font-bold gap-1 rounded-3xl flex justify-end text-white'>Authenticate</Button>
            </div>)}
          </form>

        </div>
      </section>

    </>
  )
}

export default KycAuth