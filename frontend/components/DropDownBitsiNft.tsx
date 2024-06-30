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


const DropdownBitsiNFt = ({ itemsCol, itemsOrder ,itemsPrice , setCol, setOrd , setPrice}: { itemsCol: DropdownProps[], itemsOrder : DropdownProps[],itemsPrice : DropdownProps[]  , setCol : Dispatch<SetStateAction<string>> , setOrd: Dispatch<SetStateAction<string>> , setPrice : Dispatch<SetStateAction<string>>}) => {
//   const handleClick = (nameToSet : string)=>{
//     setValue(nameToSet);
//   }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="selection:border-none">
      {/* <p className='bg-success-512 text-[22px] max-md:text-[16px] w-full font-montserrat font-semibold p-4 max-md:p-2 flex items-center gap-2 text-white rounded-xl hover:bg-success-509  overflow-hidden selection:border-none'>{buttonName}
            <Image src = '/icons/arrow-down.svg' height={9.21} width={16} alt = 'drowpdown' className='mt-1' />
            </p> */}
            <Image src = '/icons/sort-icon-filter.svg' height={48} width={48} alt="icon " />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-black border-0 font-manrope rounded-xl  ">
        <DropdownMenuSeparator className="hover:bg-success-509"/>
        {/* {items.map((item) => (
          <DropdownMenuItem key={item.id} className="flex gap-2 " asChild>
            <div className="hover:bg-gray-500">
            <Image src={item.icon} height={20} width={20} alt='logo' />
            <span onClick = {()=>{handleClick(item.name)}}>{item.name}</span></div>
          </DropdownMenuItem>
        ))} */}
        <div className="max-h-[240px] overflow-y-auto table-body">
        <CollapsibleBitsiNft btnName="Colleciton" items={itemsCol} setValue={setCol}  />
        <CollapsibleBitsiNft btnName="Order" items={itemsOrder} setValue={setOrd}  />
        <CollapsibleBitsiNft btnName="Price" items={itemsPrice} setValue={setPrice}  /></div>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default DropdownBitsiNFt;