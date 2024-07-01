import { Dispatch, FC, ReactNode, SetStateAction } from "react";
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
import { CollapsibleBitsiNft } from "./CollapsiableBitsiNft";
import { myProfileNftOrderDropDownItems } from "@/constants";


const DropdownMyProfile = ({ setValue , iconName, insideTable , items = []}: { setValue :  Dispatch<SetStateAction<string>> , iconName : string , insideTable : boolean , items : DropdownProps[] }) => {
//   const handleClick = (nameToSet : string)=>{
//     setValue(nameToSet);
//   }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="selection:border-none py-2">
            <Image src = {iconName} height={48} width={48} alt="icon " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`${insideTable == true ? 'bg-black text-white' : 'bg-white text-black' } self-start  border-0 font-manrope`}>
        <DropdownMenuSeparator className=""/>
        {insideTable && (
        <div className="max-h-[240px] overflow-y-auto table-body">
            <p  className="font-manrope text-[18px] text-white">Convert to BITSI Coin</p>
            <p className="font-manrope text-[18px] text-white">Claim Compensation</p>
         </div>)}
         {!insideTable && (
            <>
              <CollapsibleBitsiNft btnName="Sort-By" items={myProfileNftOrderDropDownItems} setValue={setValue}  />
              {/* <CollapsibleBitsiNft  /> */}
            </>
         )}
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default DropdownMyProfile;