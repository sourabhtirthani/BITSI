'use client'
import AdminAdressButtonForAdminPanel from "@/components/AdminAdressButtonForAdminPanel"
import { AdminFilterViewAnalyseDateRangeFilter } from "@/components/AdminFilterViewAnalyseDateRangeFilter";
import AdminTableEvents from "@/components/AdminTableEvents";
import AdminTableEventsInsurance from "@/components/AdminTableEventsInsurance";
import { DropDownAdminViewAnalyseFilters } from "@/components/DropDownAdminViewAnalyseFilters";
import Image from "next/image";
import { useState } from "react";
import { DateRange } from "react-day-picker"
import { addDays, format } from "date-fns"


const Viewsandanalysisevents = () => {
  let eventsNftEvents = [ {name : "mint"} , {name : 'buy'} ,{name : 'Sold'} ]
  let eventsInsuranceEvents = [{name : 'Published'}, {name : 'Purchase'} , {name : 'Upgrade'} , {name : 'Extend'} , {name : 'Claim'} ]
  const [searchValue , setSearchValue] = useState('');
  const [selectedTab , setSelectedTab] = useState('Nft Events');
  const [selectedFilter , setSelectedFilter] = useState('');
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  })

  return (
    <div className='bg-success-503 w-full  flex flex-col gap-12 p-8 max-md:p-4 overflow-auto'>
      
    <div className='flex justify-between max-xl:justify-start max-xl:gap-4 items-center'>
        <p className='font-manrope font-bold text-[18px] text-success-511'>Views & Analysis - Events </p>
        <AdminAdressButtonForAdminPanel  />
    </div>
    
    <div className='flex gap-10'>
            <p onClick={()=>{setSelectedTab('Nft Events')}} className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Nft Events' ? 'border-b-2 border-orange-500 ' : ''} `}>Nft Events</p>
            <p onClick={()=>{setSelectedTab('Insurance Events')}}  className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Insurance Events' ? 'border-b-2 border-orange-500 ' : ''} `}>Insurance Events</p>
            <p onClick={()=>{setSelectedTab('Coin Events')}}  className={`font-manrope cursor-pointer text-white text-[18px] max-sm:text-[12px] font-bold ${selectedTab === 'Coin Events' ? 'border-b-2 border-orange-500 ' : ''} `}>Coin Events</p>
        </div>
        <div className="flex max-md:flex-col justify-between">
    <div className='flex '>
        <input placeholder='Search by Name or ID' type='text' className='rounded-xl focus:outline-none px-1 max-sm:text-[12px] md:text-[20px] rounded-r-none md:w-[353px] font-montserrat h-[68px] max-md:h-[44px]' value={searchValue} onChange={(e)=>setSearchValue(e.target.value)} />
          <Image src = '/icons/search-bg-yellow.svg' height={68} width={83}  alt = 'search icon' className='max-md:h-[44px] max-md:w-[54px]' />
          </div>
          <div className="flex gap-3  items-center">
          <AdminFilterViewAnalyseDateRangeFilter date={date} setDate={setDate} className= ''/>
          <DropDownAdminViewAnalyseFilters selectedTab={selectedTab} eventsInsuranceEvents={eventsInsuranceEvents} btnNameFirst = 'Event' allEventsLst={eventsNftEvents} selectedFilter={selectedFilter} setSelectedFilter={setSelectedFilter}/>
          </div>
          </div>
           {selectedTab == 'Nft Events' && <AdminTableEvents searchValue={searchValue} selectedFilter = {selectedFilter} date = {date} />}
           {selectedTab == 'Insurance Events' && <AdminTableEventsInsurance searchValue={searchValue} selectedFilter = {selectedFilter} date = {date} />}

    </div>
  )
}

export default Viewsandanalysisevents