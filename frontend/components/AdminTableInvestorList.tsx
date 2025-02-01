import { AdminInvestorList } from '@/types';
import React, { useEffect, useState } from 'react'
import { toast } from './ui/use-toast';
import LoaderComp from './LoaderComp';
import { formatAddressUserZone, showToastUI } from '@/lib/utils';
import DialogGeneric from './DialogGeneric';
import { approveInsuranceRequest } from '@/actions/uploadNft';
import { approveUserAsInvestor, rejectUserAsInvestor } from '@/actions/users';
import { sendWelcomeEmailToInvestor } from '@/lib/sendEmails';

const AdminTableInvestorList = ({ status }: { status: string }) => {
    const [loaderState, setLoaderState] = useState(true);
    const [investorList, setInvestorList] = useState<AdminInvestorList[]>([]);
    const [loaderForDialog, setLoaderForDialog] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    useEffect(() => {
        const getInvestorList = async () => {
            try {
                setLoaderState(true)
                console.log(`this is the status ${status.toLowerCase()}`)
                const res = await fetch(`/api/admin/users/investors/${status.toLowerCase()}`, { method: "GET", next: { revalidate: 0 }, },)
                console.log(`this is the url ${res.url}`)
                const resParsed = await res.json();
                setInvestorList(resParsed);
                console.log(investorList)
            } catch (error) {
                console.log(`error fetching all the investors data`);
                console.log(error);
            } finally {
                setLoaderState(false);
            }
        }
        getInvestorList();
    }, [status, refreshList])

    const handleApproveUserAsInvestor = async (id: number, refreshMethod: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            setLoaderForDialog(true);
            await approveUserAsInvestor(id);
            setRefreshList(prev=>!prev);
            showToastUI({title : "Successfully approved" , description : 'User is now marked as investor' , operation : "success"});
            } catch (error) {
            showToastUI({title : "Error!" , description : 'Error occured' , operation : "fail"});
            console.log(error)
        }finally{
            setLoaderForDialog(false);
        }
    }

    const handleRejectUserAsInvestor = async (id: number, refreshMethod: React.Dispatch<React.SetStateAction<boolean>>) => {
        try {
            await rejectUserAsInvestor(id);
            setRefreshList(prev=>!prev);
            showToastUI({title : "Successfully Rejected" , description : 'Rejected user from being an investor' , operation : "success"});
        } catch (error) {
            showToastUI({title : "Error!" , description : 'Error occured' , operation : "fail"});
        }
    }
    return (
        <div className='max-h-[500px]  px-8 max-md:px-4 overflow-auto w-full  mb-20 table-body'>
            <table className='min-w-full text-left mt-4 border-spacing-20 overflow-x-auto'>
                <thead className='text-success-502 text-center font-semibold table-auto font-manrope text-[22px] max-sm:text-[10px] underline  '>
                    <tr>
                        <th className='p-2 max-sm:p-1'>Date</th>
                        <th className='p-2 max-sm:p-1'>Name</th>
                        <th className='p-2 max-sm:p-1 overflow-hidden'>Email</th>
                        <th className='p-2 max-sm:p-1'>Country</th>
                        <th className='p-2 max-sm:p-1'>Address</th>
                        <th className='p-2 max-sm:p-1 overflow-hidden'>Credit</th>
                      {status == "Pending" &&   <th className='p-2 max-sm:p-1 overflow-hidden'>Action</th> }
                    </tr>
                </thead>

                <tbody className='overflow-y-auto overflow-x-auto overflow-visible'>

                    {loaderState == false && Array.isArray(investorList) && investorList.map((investor, index) => {
                        return (
                            <React.Fragment key={index}>
                                <tr className='bg-success-512 text-center relative  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                                    <td className="p-2 max-sm:p-1">{new Date(investor.createdAt ?? '').toDateString()}</td>

                                    <td className="p-2 max-sm:p-1">{investor.name || '-'}</td>
                                    <td className="p-2 max-sm:p-1">{investor.email || '-'}</td>
                                    <td className="p-2 max-sm:p-1">{investor.country ?? '-'}</td>
                                    <td className="p-2 max-sm:p-1 relative group cursor-pointer">{formatAddressUserZone(investor.walletAddress || '')}
                                    <p className='absolute max-md:hidden bg-white  text-black text-[12px] font-bold px-2 py-1 opacity-0 text-center rounded-xl group-hover:opacity-100 transition-opacity'>{investor.walletAddress}</p>
                                    </td>
                                    <td className="p-2 max-sm:p-1">{investor.creditScore?.toFixed(2)}</td>
                                    {status == 'Pending' && <td className='p-2 max-sm:p-1'><DialogGeneric handleMethodCall={handleApproveUserAsInvestor} handleRejectMethod={handleRejectUserAsInvestor} setRefresh={setRefreshList} loaderActionButton={loaderForDialog} id={investor.id ?? 0} dialogDescription='Approving investor will add the user as investor' dialogTitle='Approve Investor' buttonText='Approve' /></td>}
                                </tr>
                                <tr>
                                    <td className='h-5'></td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </tbody>

            </table>
            {loaderState == true && <LoaderComp />}
        </div>
    )
}

export default AdminTableInvestorList