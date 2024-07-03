'use client'
import { Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
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


const Dropdown = ({ items , buttonName , setValue , showIcon = true }: { items: DropdownProps[]  , buttonName : string , setValue : Dispatch<SetStateAction<string>> , showIcon?: boolean}) => {
  const [newName , setNewName] = useState('');
  const [selected , setSelected] = useState(false);
  const handleClick = (nameToSet : string)=>{
    setValue(nameToSet);
    setSelected(true);
    setNewName(nameToSet)
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className=" border-2 border-white w-full flex justify-between items-center bg-success-512 hover:bg-success-509  rounded-xl px-4 py-2">
      <p className=' text-[22px]  text-opacity-35 max-md:text-[20px] w-full font-montserrat font-bold max-md:p-1 flex items-center gap-2 text-white  overflow-hidden selection:border-none'>{selected == true ? newName : buttonName}
            </p>
            <Image src = '/icons/arrow-dropdown.svg' height={9.21} width={16} alt = 'drowpdown' className='' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-black w-full text-white border-0 font-manrope rounded-xl ">
        <DropdownMenuSeparator className="hover:bg-success-509"/>
        {items.map((item) => (
          <DropdownMenuItem key={item.id} className="flex gap-2  " asChild>
            <div>
            {showIcon && (<Image src={item.icon} height={20} width={20} alt='logo' />)}
            <span onClick = {()=>{handleClick(item.name)}}>{item.name}</span></div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

export default Dropdown;