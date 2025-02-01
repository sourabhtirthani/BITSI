'use client'
import AdminAdressButtonForAdminPanel from '@/components/AdminAdressButtonForAdminPanel';
import AdminTableInvestorList from '@/components/AdminTableInvestorList';
import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import LoaderComp from '@/components/LoaderComp';
import { CurrencyList } from '@/types';
import { addNewCurrency, deleteCurrency } from '@/actions/currency';
import { showToastUI } from '@/lib/utils';
import DialogGeneric from '@/components/DialogGeneric';

const Currency = () => {
    const [loaderActionButton, setLoaderActionButton] = useState(false);
    const [loaderState , setLoaderState] = useState(true);
    const [allCurrencies , setAllCurrencies] = useState<CurrencyList[]>([]);
    const [refresh , setRefresh] = useState(false);
    const [deleteCurrencyLoading , setDeleteCurrencyLoading] = useState(false);


    useEffect(()=>{
        const getAllCurrencies = async()=>{
            try{
            setLoaderState(true);
            const res = await fetch(`/api/currency` , {method : "GET" , next : {revalidate : 0} , } ,  )
            const resParsed = await res.json();
            setAllCurrencies(resParsed);
            }catch(error){
                console.log(`error fetching all the currecnies`);
            }finally{
                setLoaderState(false);
            }
        }
        getAllCurrencies();
    },[refresh])

    const handleCurrencySubmit = async (event: React.SyntheticEvent) => {
        try{
        event.preventDefault();
        setLoaderActionButton(true);
        const form = event.currentTarget as HTMLFormElement;
        const formData = new FormData(form);
        await addNewCurrency(formData.get("code") as string, formData.get("currency") as string);
        console.log(`currency added successfully`);
        setRefresh(prev => !prev);
        showToastUI({title : "Currency added successfully" , description : "Currency added successfully" , operation : "success"});
        }catch(error){
            console.log(`in the error clausee of adding new currency`)
            showToastUI({title : "Error Adding Currency" , description : "Error Adding Currency" , operation : "fail"});
        }finally{
            setLoaderActionButton(false);
        }
    }
    const handleDeleteCurrency = async(id : number , setRefresh : React.Dispatch<React.SetStateAction<boolean>>)=>{
        try{
            setDeleteCurrencyLoading(true);
            await deleteCurrency(id);
            setRefresh(prev => !prev);
            showToastUI({title : "Currency deleted successfully" , description : "Currency deleted successfully" , operation : "success"});
        }catch(error){
            console.log(`in the error clausee of deleting currency`)
            showToastUI({title : "Error Deleting Currency" , description : "Error Deleting Currency" , operation : "fail"});
        }finally{
            setDeleteCurrencyLoading(false);
        }
    }
    const handleRejectMethod = async(id : number , setRefresh : React.Dispatch<React.SetStateAction<boolean>>)=>{

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
                        <input type='text' name='code' required placeholder='Code' className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
                        <input type='text' name='currency' required placeholder='Currency' className='w-full rounded-xl max-md:py-1 py-3 bg-[#F9F9F9] text-black text-[1rem] border-[1px] border-[#B1B1B1] pl-3 max-md:pl-1 font-normal' />
                        <DialogFooter>
                            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
                                <button disabled={loaderActionButton} className={`${loaderActionButton == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderActionButton == true ? 'Loading..' : 'Add+'}</button>
                                <button className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div className='max-h-[500px]  px-8 max-md:px-4 overflow-auto w-full  mb-20 table-body'>
          <table className='min-w-full text-left mt-4 border-spacing-20 overflow-x-auto'>
            <thead className='text-success-502 text-center font-semibold table-auto font-manrope text-[22px] max-sm:text-[10px] underline  '>
              <tr>
                <th className='p-2 max-sm:p-1'>Code</th>
                <th className='p-2 max-sm:p-1'>Currency</th>
                <th className='p-2 max-sm:p-1'>Action</th>
              </tr>
            </thead>
            <tbody className='overflow-y-auto overflow-x-auto overflow-visible'>
              
              {loaderState == false  && Array.isArray(allCurrencies) && allCurrencies.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <tr className='bg-success-512 text-center relative  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-2 max-sm:p-3'>{item.code}</td>
                        <td className='p-2 max-sm:p-1'>{item.currency}</td>
                        <td className='p-2 max-sm:p-1'><DialogGeneric buttonText='Delete' dialogDescription='Are you sure you want to delete this currency?' dialogTitle='Delete Currency' handleMethodCall={handleDeleteCurrency} handleRejectMethod={handleRejectMethod} id={item.id} loaderActionButton={deleteCurrencyLoading} setRefresh={setRefresh} /></td>
                    </tr>
                    <tr>
                      <td  className='h-5'></td>
                    </tr>
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
               {loaderState == true &&<LoaderComp /> }
        </div>
        </div>
    )
}

export default Currency