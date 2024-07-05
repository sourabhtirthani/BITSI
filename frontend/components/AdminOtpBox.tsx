
import React from "react"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

export function AdminOtpBox({value , setValue} : {value : string , setValue : React.Dispatch<React.SetStateAction<string>>}) {
  return (
    <InputOTP maxLength={4} value={value} onChange={(val) => setValue(val)} >
      <InputOTPGroup>
        <InputOTPSlot index={0} className="bg-success-512 secondary-shadow11 text-white" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={1}  className="bg-success-512 secondary-shadow11 text-white" />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={2}  className="bg-success-512 secondary-shadow11 text-white"/>
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} className="bg-success-512 secondary-shadow11 text-white" />
      </InputOTPGroup>
    </InputOTP>
  )
}
