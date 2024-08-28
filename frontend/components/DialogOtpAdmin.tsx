// mail_icon.svg
'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { AdminOtpBox } from "./AdminOtpBox"
import { useEffect, useState } from "react"
import { handleLoginForAdmin, validateOtp } from "@/actions/uploadNft"
import { sendOtp } from "@/lib/sendEmails"
import { useToast } from '@/components/ui/use-toast';
import { useRouter } from "next/navigation";



export function DialogOtpAdmin({open , setOpen ,emailAddress, password} : {open : boolean , setOpen : React.Dispatch<React.SetStateAction<boolean>> , emailAddress : string, password : string}) {
    const [otpValue , setOtpValue] = useState('');
    const router = useRouter();
    const {toast} = useToast();
    const [showResendLink , setShowResendLink] = useState(false);
    const [timeLeft, setTimeLeft] = useState(120);
    const [disableSubmitButton , setDisableSubmitButton] = useState(false);
    const [showOtpError , setShowOtpError] = useState(false);
    const [resendText , setResentText] =useState('Didnt get a code?');
    const [linkResendText , setLinkResendText] = useState('Click to resend');
    useEffect(() => {
        if (timeLeft > 0) {
          const timerId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
          }, 1000);
    
          return () => clearInterval(timerId);
        }else{
            setShowResendLink(true)
        }
      }, [timeLeft]);
    const handleSubmitClick = async()=>{
      try{
        setDisableSubmitButton(true)
        // const res = await validateOtp(otpValue , emailAddress)
        try{
           const res = await handleLoginForAdmin(emailAddress , password,otpValue);
            if(res.success == true){
                router.push(`/admin/analytic-dashboard`);
            }else{
                setShowOtpError(true);
                setDisableSubmitButton(false)
            }
        }catch(error){
            console.log(`error in here`)
            console.log(error);
            setShowOtpError(true);
            
            setDisableSubmitButton(false)
        }
       
      }catch(error){
        console.log('in the error clause vlaidate otp in the client side');
        toast({ title: "ERROR validating OTP", description: "OTP Validation Error", duration: 2000,
            style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},
          });
          setDisableSubmitButton(false)
      }
    }
    const handleResendLink = async()=>{
        try{
            const otpSent = await sendOtp(emailAddress)
        if(otpSent.success == false){
          toast({ title: "ERROR Sending OTP", description: "Please try again later", duration: 2000,
            style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},
          });
          setShowOtpError(false)
          return;
        }
        setShowOtpError(false)
        setShowResendLink(false);
        setTimeLeft(120);
        }catch(error){
            setShowOtpError(false)
            toast({ title: "ERROR Sending OTP", description: "Please try again later", duration: 2000,
                style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},
              });
        }
    }
  return (
    <Dialog open = {open} onOpenChange={setOpen}>
      {/* <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger> */}
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="flex flex-col gap-2 items-center justify-center">
            <Image src = '/icons/mail_icon.svg' height={48} width={48} alt="image" />
            <p className="text-black font-manrope text-[18px] font-bold ">Please check your email.</p>
            <p className="text-black font-manrope text-[14px] font-normal ">We&apos;ve sent a code to {emailAddress}</p>
          </DialogTitle>
        </DialogHeader>
        <div className="flex justify-center gap-2 items-center flex-col">
        <AdminOtpBox value={otpValue} setValue={setOtpValue}/>
        <p className={`self-start font-bold text-[14px] font-manrope `}>{resendText} {showResendLink ==true ? ( <span className="cursor-pointer underline text-success-533" onClick={handleResendLink}>{linkResendText}</span>) : (<span>Please Wait {timeLeft} seconds</span>)}</p>
        
        <p className={`${showOtpError == false ? 'hidden' : '' } self-start font-bold text-[14px] font-manrope text-success-533`}>Invalid Otp</p>
        </div>
        <DialogFooter>
          <button onClick={handleSubmitClick} className={`${disableSubmitButton == true ? 'bg-slate-500 pointer-events-none' : 'bg-success-511'} w-full  py-2 text-white rounded-xl  font-bold text-[16px] font-inter`}>{disableSubmitButton == true  ? 'Loading..' : 'Confirm'}</button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
