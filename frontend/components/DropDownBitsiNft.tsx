import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DropdownProps, DropdownPropsForInsuranceTable } from "@/types";
import Image from 'next/image'
import { CollapsibleBitsiNft } from "./CollapsiableBitsiNft";
import React from "react";

//this drop down is also used in the user zone page
const DropdownBitsiNFt = ({ itemsCol, itemsOrder ,itemsPrice , setCol, setOrd , setPrice, setAsset, itemsAsset , itemsPurchase, itemsUpgrade , itemsExtend, itemsClaim , itemsUnlock, setInsuraceFilter }: { itemsCol?: DropdownProps[], itemsOrder? : DropdownProps[],itemsPrice? : DropdownProps[], itemsAsset? : DropdownProps[]  , setCol? : Dispatch<SetStateAction<string>> , setOrd?: Dispatch<SetStateAction<string>> , setPrice? : Dispatch<SetStateAction<string>> , setAsset? : Dispatch<SetStateAction<string>> , setInsuraceFilter? : Dispatch<SetStateAction<string>> , itemsUnlock? : DropdownProps[] , itemsClaim? : DropdownProps[] , itemsExtend? : DropdownProps[] , itemsUpgrade? : DropdownProps[] , itemsPurchase? : DropdownProps[]}) => {
//   const handleClick = (nameToSet : string)=>{
//     setValue(nameToSet);
//   }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="selection:border-none">
      {/* <p className='bg-success-512 text-[22px] max-md:text-[16px] w-full font-montserrat font-semibold p-4 max-md:p-2 flex items-center gap-2 text-white rounded-xl hover:bg-success-509  overflow-hidden selection:border-none'>{buttonName}
            <Image src = '/icons/arrow-down.svg' height={9.21} width={16} alt = 'drowpdown' className='mt-1' />
            </p> */}
            <Image src = '/icons/sort-icon-filter.svg' height={48} width={48} alt="icon " className="max-sm:h-[37px] max-sm:w-[37px]" />
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
        {(itemsCol != null && setCol) && <><CollapsibleBitsiNft btnName="Colleciton" items={itemsCol} setValue={setCol}  />
        <hr className="mt-1 border-success-527 ml-2 mr-2"/></>}
        { (itemsOrder != null && setOrd) && <><CollapsibleBitsiNft btnName="Date" items={itemsOrder} setValue={setOrd}  />
        <hr className="mt-1 border-success-527 ml-2 mr-2"/></>}
        {(itemsPrice != null && setPrice) && <CollapsibleBitsiNft btnName="Price" items={itemsPrice} setValue={setPrice}  />}
        {(itemsAsset != null && setAsset) && <> 
         <CollapsibleBitsiNft btnName="Asset" items={itemsAsset} setValue={setAsset}  /> </>} 




         {(itemsPurchase != null && setInsuraceFilter) && <> 
          <CollapsibleBitsiNft insuranceFilters = {true} btnName="Purchase" items={itemsPurchase} setValue={setInsuraceFilter}  /> <hr className="mt-1 border-success-527 ml-2 mr-2"/> </>} 

          {(itemsUpgrade != null && setInsuraceFilter) && <> 
            <CollapsibleBitsiNft insuranceFilters = {true}  btnName="Upgrade" items={itemsUpgrade} setValue={setInsuraceFilter}  /> <hr className="mt-1 border-success-527 ml-2 mr-2"/> </>} 

            {(itemsExtend != null && setInsuraceFilter) && <> 
              <CollapsibleBitsiNft insuranceFilters = {true} btnName="Extend" items={itemsExtend} setValue={setInsuraceFilter}  /> <hr className="mt-1 border-success-527 ml-2 mr-2"/> </>} 

              {(itemsClaim != null && setInsuraceFilter) && <> 
                <CollapsibleBitsiNft insuranceFilters = {true} btnName="Claim" items={itemsClaim} setValue={setInsuraceFilter}  /> <hr className="mt-1 border-success-527 ml-2 mr-2"/> </>} 

                {(itemsUnlock != null && setInsuraceFilter) && <> 
                  <CollapsibleBitsiNft insuranceFilters = {true} btnName="Unlock" items={itemsUnlock} setValue={setInsuraceFilter}  /> <hr className="mt-1 border-success-527 ml-2 mr-2"/> </>} 
                  </div>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default DropdownBitsiNFt;