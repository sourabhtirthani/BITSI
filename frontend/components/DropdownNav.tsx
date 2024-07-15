import { FC, ReactNode, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownProps } from "@/types";
import Image from 'next/image'
import Link from "next/link";
// import { useSDK } from "@metamask/sdk-react";
import { formatAddress } from "@/lib/utils";


const DropdownNav = () => {
  const [kycValue ,setKycValue] = useState('pending');
  // const {account , connected} = useSDK();
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center">
        <Image src='/icons/hamburger-icon.svg' height={28} width={28} alt='hamburger' className='max-md:hidden focus:outline-none selection:outline-none' />
        <Image src='/icons/dot-notification.svg' height={44} width={44} alt='hamburger' className={`absolute mb-7 ml-2 max-md:hidden`} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black  text-white border-0 font-manrope rounded-xl " >
        <DropdownMenuSeparator className="hover:bg-success-509" />
        {/* {items.map((item) => (
          <DropdownMenuItem key={item.id} className="flex gap-2 bg-black hover:bg-red-500">
            <Image src={item.icon} height={20} width={20} alt='logo' />
            {item.name}
          </DropdownMenuItem>
        ))} */}

        <DropdownMenuItem className="flex  gap-2 bg-black " asChild>

          <Link href='/abcd' className="flex self-start gap-3 "><Image src='/icons/user-icon.svg' height={18} width={18} alt='user-icon' />
            <p className="text-success-506 text-[14px] font-normal">connected</p></Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex  gap-2 bg-black" asChild>

          <Link href='/my-profile' className="flex self-start gap-3"><Image src='/icons/user-icon1.svg' height={18} width={18} alt='user-icon' />
            <p className="text-success-506 text-[14px] font-normal">User Zone</p></Link>

        </DropdownMenuItem>
        <DropdownMenuItem className="flex  gap-2 bg-black" asChild>

          <Link href='/abcd' className="flex self-start gap-3"><Image src='/icons/support-icon.svg' height={18} width={18} alt='user-icon' />
            <p className="text-success-506 text-[14px] font-normal">Support</p></Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex  gap-2 bg-black" asChild>
          <Link href={`${kycValue == 'pending' ? '/kyc-auth' : '/null'}`} className="flex self-start gap-3"><Image src='/icons/support-icon.svg' height={18} width={18} alt='user-icon' />
            <p className="text-success-506 text-[14px] font-normal">KYC<span className="align-super text-[7px]">({kycValue})</span></p></Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex  gap-2 bg-black" asChild>

          <Link href='/abcd' className="flex self-start gap-3"><Image src='/icons/connect-icon.svg' height={18} width={18} alt='user-icon' />
            <p className="text-success-506 text-[14px] font-normal">Connect</p></Link>
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default DropdownNav;