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


const Dropdown = ({ items , buttonName , setValue  }: { items: DropdownProps[]  , buttonName : string , setValue : Dispatch<SetStateAction<string>>}) => {
  const handleClick = (nameToSet : string)=>{
    setValue(nameToSet);
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="selection:border-none">
      <p className='bg-success-512 text-[22px] max-md:text-[20px] w-full font-montserrat font-bold px-4 max-md:p-1 flex items-center gap-2 text-white rounded-xl hover:bg-success-509  overflow-hidden selection:border-none'>{buttonName}
            <Image src = '/icons/arrow-down.svg' height={9.21} width={16} alt = 'drowpdown' className='mt-1' />
            </p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black text-white border-0 font-manrope rounded-xl ">
        <DropdownMenuSeparator className="hover:bg-success-509"/>
        {items.map((item) => (
          <DropdownMenuItem key={item.id} className="flex gap-2 bg-black " asChild>
            <div>
            <Image src={item.icon} height={20} width={20} alt='logo' />
            <span onClick = {()=>{handleClick(item.name)}}>{item.name}</span></div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default Dropdown;