'use client'
import { signIn } from '@/auth'
import AdminOtpVerify from '@/components/AdminOtpVerify'
import Image from 'next/image'
import { AuthError } from 'next-auth';
import { useState } from 'react';
import { DialogOtpAdmin } from '@/components/DialogOtpAdmin';
// import { redirect } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast"
import { validateAdminPassword } from '@/actions/uploadNft';
import { sendOtp } from '@/lib/sendEmails';

const AuthHOME = () => {  
  const { toast } = useToast()
  const [open ,setOpen] = useState(false)
  const [emailText , setEmailText] = useState('');
  const [showPassword , setShowPassword] = useState(false)
  const [showErrorTextForInvalidDetails , setShowErrorTextForInvalidDetails] = useState(false)
  const [disableSign , setDisableSignIn] = useState(false)
  const [otpSendId , setOtpSendId] = useState('');
  const [password , setPassword] = useState('')
 
  const [signInText , setSignInText] = useState('SignIn')
  const handleShowPassword = ()=>{
    setShowPassword(showPassword=>!showPassword)
  }
  const handleSubmitForm= async(e: React.SyntheticEvent)=>{
    e.preventDefault();
    setDisableSignIn(true)
    setSignInText('Loading...')
    try{
       const form = e.currentTarget as HTMLFormElement;
       const formData = new FormData(form);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      console.log(`the email is ${email} and the password is : ${password}`)
      if(!email || !password){
        setShowErrorTextForInvalidDetails(true);
        return;
      }
      const checkPassword = await validateAdminPassword(email , password);
      checkPassword.success=true;
      if(checkPassword.success == true){
        setShowErrorTextForInvalidDetails(false);
        setEmailText(email)
        setPassword(password)
        const otpSent = await sendOtp(email)
        console.log("otpSent",otpSent);
        if(otpSent.success == false){
          toast({ title: "ERROR Sending OTP", description: "Please try again later", duration: 2000,
            style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},
          });
          return;
        }
        setOpen(true)
      }else{
        setShowErrorTextForInvalidDetails(true);
        return;
      }
    }catch(error){
      console.log(error);
      toast({ title: "ERROR", description: "Error logging in.", duration: 2000,
        style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},
      })
    }finally{
      setDisableSignIn(false)
      setSignInText('SignIn')
    }
  }
  
  // const handleLogin = async()=>{
  //   'use server'
  //   try{
  //   const res = await signIn("credentials", {
  //     email : '',
  //     password : '',
  //     // redirect : false,
  //     redirectTo : '/admin/compensation'
  //   })
  //   console.log(`the res is ${res}`)
  //   return res;
  //   // redirect('/admin/compensation')
  // }catch(error){
  //   console.log("in the error clasuse")
  //   if (error instanceof AuthError) {
	// 		if(error.type == 'CredentialsSignin'){
  //       console.log('invalid details')
  //       return;
  //     }
	// 	}
  //   throw error;
		
	// }
  // }

  
  return ( 
    
    <div className='flex h-[100vh] w-screen'>
      <div className='w-1/2 max-sm:hidden flex flex-col items-center justify-center'>
      <Image src='icons/bitsi.svg' height={209} width={212} alt='bitsi' />
      <p className='text-white font-mulish text-[64px] max-md:text-[42px] font-bold'>BITSI</p>
      </div>
      <div className='w-1/2 max-sm:w-full flex flex-col bg-white items-center justify-center'>
      
        <p className='text-black font-bold font-manrope text-[64px] max-md:text-[44px]'>Hi Admin</p>
       <p className='text-black font-bold font-manrope text-[18px] max-md:text-[12px] mb-4'>Please enter the below details to continue</p>
       {/* <button onClick={()=>{setOpen(true)}}>OPEN</button> */}
       <form onSubmit={handleSubmitForm} className='w-full gap-5 flex flex-col justify-center items-center'>
        <input placeholder='Email' required type='email' name='email' id='email' className='w-3/4 rounded-xl text-[24px] pl-4 text-white p-3 bg-black'/>
        <div className='w-3/4 relative flex flex-col'>
        <input placeholder='Password' required type={`${showPassword == false ? 'password' : 'text'}`} name='password' id='password' className='w-full rounded-xl text-[24px] pl-4 text-white p-3 bg-black'/>
       
        <Image src='/icons/show-password.svg' height={22} width={22} alt='image' className='absolute self-end mt-4 mr-2 cursor-pointer' onClick={handleShowPassword}/>
       
        </div>
        <div className={`w-3/4 -mt-4 ${showErrorTextForInvalidDetails == true ? '' : 'hidden'}`}>
        <p className='self-start text-red-600 font-semibold font-manrope text-[14px] '>Invalid details, please try again.</p></div>
        <button  type='submit' className={`${disableSign == true ? 'bg-gray-500 pointer-events-none' : 'bg-success-511'}  w-2/5 py-4 rounded-xl mt-6 text-black font-manrope text-[20px] font-bold`}>{signInText}</button>
       </form>
       <DialogOtpAdmin open = {open} setOpen={setOpen} emailAddress= {emailText} password={password}/>
      </div>
    </div>
  )
}

export default AuthHOME





// <div className='bg-white  w-3/4 h-fit p-8 max-md:p-4 flex  justify-center max-sm:w-full'>
    //   <form action={handleLogin}>
    //     <button type='submit'>login</button>
    //   </form>
    //     <div className='flex flex-col items-center gap-3'>
    //         <h1 className='font-manrope  text-[38px] font-bold text-black'>Welcome To BITSI Admin Panl</h1>
    //         <p className='font-manrope text-black font-semibold text-[18px] '>Please enter the code that you received via mail</p>
    //         <div className='flex flex-col items-center gap-10 mt-10'>
    //         <Image src = 'icons/admin-lock-icon.svg' height={65} width={65} alt='icon'  />
    //         <AdminOtpVerify />
    //         <div className='flex gap-1 mt-3'>
    //             <p className='text-black font-manrope text-[18px] font-bold'>Didn&apos;t receive the code?</p>
    //             <p className='text-success-511 font-manrope text-[18px] font-bold underline'>Resend</p>
    //         </div>
    //         </div>
    //         </div>
    // </div>