import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
  } from "lucide-react"
  
  import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import Image from "next/image"
import React, { MouseEvent, useEffect, useRef, useState } from "react"
import { nftData } from "@/types";
  // code is currently not used anywhere
  export function AutoComplete({filteredLstOfNfts , listOfNFts} : {filteredLstOfNfts : nftData[] , listOfNFts : nftData[]}) {
    const [openList , setOpenList] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [autoCompleteVal , setAutoCompleteVal] = useState('');

    const divRef = useRef<HTMLDivElement>(null);
    const handleClickOutside = (event: MouseEvent<Document, MouseEvent>) => {
        if (divRef.current && !divRef.current.contains(event.target as Node)) {
          setOpenList(false);
        }
      };
    //   useEffect(() => {
    //     // Add event listener when component mounts
    //     document.addEventListener('mousedown', handleClickOutside);
    
    //     // Clean up the event listener when component unmounts
    //     return () => {
    //       document.removeEventListener('mousedown', handleClickOutside);
    //     };
    //   }, []);

    const handleInputChange = (e : React.ChangeEvent<HTMLInputElement>)=>{
        setSearchValue(e.target.value);
        console.log(searchValue)
        if (searchValue !== '') {
            
          filteredLstOfNfts = listOfNFts.filter(nfts => 
              nfts.name.toLowerCase().includes(searchValue.toLowerCase())
          );
        }
        else if(searchValue == ''){
         
          filteredLstOfNfts = listOfNFts;
        }
      }
      const handleInputSearchClick = ()=>{
        setOpenList(true);
      }
      const handleItemClick =async (e : React.MouseEvent<HTMLSpanElement>)=>{
        console.log('in here')
        const clickedSpan = e.target as HTMLSpanElement;
        await setSearchValue(clickedSpan.innerText)
        setOpenList(false)
        
      }
    return (
      <Command className="rounded-xl bg-white  w-fit">
        <div className="flex" ref = {divRef}>
        <CommandInput  value={searchValue}  className="hidden"  />
        <input onClick={handleInputSearchClick} value={searchValue} onChange={(e :  React.ChangeEvent<HTMLInputElement>)=>{setSearchValue(e.target.value)}}  className="focus:outline-none px-1 text-[20px] rounded-xl rounded-r-none w-[353px] font-montserrat h-[68px]"  placeholder="Search for NFTs..." />
        <Image src='/icons/search-bg-yellow.svg' height={68} width={83} alt='search icon' className='relative' />
        </div>
        {openList && <CommandList className="">
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions" className="text-black">
            
          <div className=" text- font-montserrat bg-success-509" >
            {listOfNFts.map((item , index)=>{
                return (
                    <CommandItem  key={index} className=" hover:bg-red-500">
                        <span  onClick={handleItemClick}>{item.name}</span>
                    </CommandItem>
                )
            })}
            </div>
         
          </CommandGroup>
          <CommandSeparator />
        </CommandList>}
      </Command>
    )
  }
  