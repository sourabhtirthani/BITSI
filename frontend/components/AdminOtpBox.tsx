
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
        <InputOTPSlot index={0} className="bg-white max-sm:h-14 max-sm:w-14  h-20 w-20 secondary-shadow12  text-black text-[24px]" />
      </InputOTPGroup>
      {/* <InputOTPSeparator /> */}
      <div className="w-[5px]"></div>
      <InputOTPGroup>
        <InputOTPSlot index={1}  className="bg-white max-sm:h-14 max-sm:w-14   h-20 w-20 secondary-shadow12 text-black text-[24px]" />
      </InputOTPGroup>
      {/* <InputOTPSeparator /> */}
      <div className="w-[5px]"></div>
      <InputOTPGroup>
        <InputOTPSlot index={2}  className="bg-white max-sm:h-14 max-sm:w-14 h-20 w-20 secondary-shadow12 text-black text-[24px]"/>
      </InputOTPGroup>
      {/* <InputOTPSeparator /> */}
      <div className="w-[5px]"></div>
      <InputOTPGroup>
        <InputOTPSlot index={3} className="bg-white max-sm:h-14 max-sm:w-14 h-20 w-20 secondary-shadow12 text-black text-[24px]" />
      </InputOTPGroup>
    </InputOTP>
  )
}
