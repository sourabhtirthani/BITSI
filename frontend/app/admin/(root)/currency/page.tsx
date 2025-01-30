'use client'
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel';
import AdminTableInvestorList from '@/components/AdminTableInvestorList';
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

const Currency = () => {
    const [loaderActionButton, setLoaderActionButton] = useState(false);


    const handleCurrencySubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        console.log(formData);
    }
    return (
        <div className='bg-success-503 w-full   flex flex-col gap-12 p-8 max-md:p-4'>
            <div className='flex justify-between max-xl:justify-start max-xl:gap-4 items-center'>
                <p className='font-manrope font-bold text-[18px] text-success-511'>Currency</p>
                <AdminAdressButtonForAdminPanel />
            </div>
            <Dialog>
                <DialogTrigger asChild>
                    <button className='bg-success-511 w-fit text-white font-bold text-[18px] px-4 py-2 rounded-xl'>Add New Currency</button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Add New Currency</DialogTitle>
                    </DialogHeader>
                    <form className='flex flex-col gap-4 w-full' onSubmit={handleCurrencySubmit}>
                        <input type='text' required placeholder='Code' className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
                        <input type='text' required placeholder='Currency' className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
                        <DialogFooter>
                            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
                                <button disabled={loaderActionButton} className={`${loaderActionButton == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderActionButton == true ? 'Loading..' : 'Add+'}</button>
                                <button className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div>
                
            </div>
        </div>
    )
}

export default Currency