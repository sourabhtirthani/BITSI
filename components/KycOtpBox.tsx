
import React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function KycOtpBox({value , setValue} : {value : string , setValue : React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <InputOTP maxLength={4} value={value} onChange={(val) => setValue(val)} >
      <InputOTPGroup>
        <InputOTPSlot index={0} className="bg-success-512  h-20 w-20 secondary-shadow11  text-white text-[24px]" />
      </InputOTPGroup>
      {/* <InputOTPSeparator /> */}
      <div className="w-[5px]"></div>
      <InputOTPGroup>
        <InputOTPSlot index={1}  className="bg-success-512  h-20 w-20 secondary-shadow11 text-white text-[24px]" />
      </InputOTPGroup>
      {/* <InputOTPSeparator /> */}
      <div className="w-[5px]"></div>
      <InputOTPGroup>
        <InputOTPSlot index={2}  className="bg-success-512 h-20 w-20 secondary-shadow11 text-white text-[24px]"/>
      </InputOTPGroup>
      {/* <InputOTPSeparator /> */}
      <div className="w-[5px]"></div>
      <InputOTPGroup>
        <InputOTPSlot index={3} className="bg-success-512 h-20 w-20 secondary-shadow11 text-white text-[24px]" />
      </InputOTPGroup>
    </InputOTP>
  )
}
