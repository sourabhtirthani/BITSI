'use client'
import  { Fragment, useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { InsuranceStatusTableAdminPanel , CoinInsuranceDetailsAdmin } from '@/types';
import { formatAddressUserZone } from '@/lib/utils';
import { toast } from './ui/use-toast';
import { DialogUserZoneProtection } from './DialogUserZoneProtection';
import DialogAdminCoinProtection from './DialogAdminCoinProtection';
import { approvePurchaseCoinInsrance } from '@/actions/coins';
// import { ref } from 'lit/directives/ref.js';


const AdminTablePolicyStatus = ({selectedTab} : {selectedTab : string}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [insuranceData , setInsuranceData] = useState<InsuranceStatusTableAdminPanel[]>([]);
    const [coinInsuranceData , setCoinInsuanceData] = useState<CoinInsuranceDetailsAdmin[]>([]);
    const [refreshCoinInsurance , setRefreshCoinInsurance] = useState(true);
    const [refresh , setRefresh] = useState(false);
    const [loaderStateCoinInsurance , setLoaderStateCoinInsurance] = useState(true);  
    useEffect(()=>{
        const getInsuranceData = async()=>{
            try{
          setLoaderState(true);
        const res = await fetch(`/api/admin/insurance/nft/${selectedTab.toLowerCase()}` , {method : "GET" , next : {revalidate : 0} , } ,  );
        const resJson = await res.json();
        setInsuranceData(resJson);          
            }catch(error){
                toast({ title: "Error", description: "Error fetching data", duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},});
            }finally{
                setLoaderState(false);
            }
        }
        getInsuranceData();
    }, [refresh , selectedTab])

    useEffect(()=>{
      const getCoinInsuranceData = async()=>{
        try{
          const res = await fetch(`/api/admin/insurance/coin/${selectedTab.toLowerCase()}` , {method : "GET" , next : {revalidate : 0} , } ,  );
          const resJson = await res.json();
          if(resJson!=null){
            setCoinInsuanceData(resJson);
          }
        }catch(error){
          console.log(error)
        }finally{
          setLoaderStateCoinInsurance(false);
        }
      }
      getCoinInsuranceData();
    }, [selectedTab , refreshCoinInsurance])

    const handleApproveCoinInsurance = async (id : number , setRefreshMethod : React.Dispatch<React.SetStateAction<boolean>>)=>{
      try{
        const approveInsurance = await approvePurchaseCoinInsrance(id);
        setRefreshMethod(prev => !prev);
        toast({title: "Successfully approved insurance",description: 'You can now purchase insurance',duration: 5000, style: {backgroundColor: '#00b289',color: 'white',fontFamily: 'Manrope' }})
      }catch(error){
        console.log(`error approving insurane`)
        console.log(error)
        toast({title: "Error approving insurance",description: 'Please try again later',duration: 5000, style: {backgroundColor: '#900808',color: 'white',fontFamily: 'Manrope' }})
      }
    }

    return (
      <div>
        <div className='max-h-[500px]  px-8 max-md:px-4 overflow-auto w-full  mb-20 table-body'>
          <table className='min-w-full text-left mt-4 border-spacing-20 overflow-x-auto'>
            <thead className='text-success-502 text-center font-semibold table-auto font-manrope text-[22px] max-sm:text-[10px] underline  '>
              <tr>
                <th className='p-2 max-sm:p-1'>Date</th>
                <th className='p-2 max-sm:p-1'>ID</th>
                <th className='p-2 max-sm:p-1'>Asset-Id</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Owner</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Status</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                {selectedTab == 'Pending' && 
                <th className='p-2 max-sm:p-1 overflow-hidden'>Approve</th>}
              </tr>
            </thead>
           
            <tbody className='overflow-y-auto overflow-x-auto overflow-visible'>
              
              {loaderState == false  && Array.isArray(insuranceData) && insuranceData.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <tr className='bg-success-512 text-center relative  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                      <td className='p-2 max-sm:p-3'>{new Date(item.startTime).toDateString()}</td>
                      <td className='p-2 max-sm:p-1'>{item.id}</td>
                      <td className='p-2 max-sm:p-1'>{item.nftId}</td>
                      <td className='p-2 max-sm:p-1'>{formatAddressUserZone(item.currentOwner)}</td>
                      <td  className='p-2 max-sm:p-1'>{item.status}</td>
                      <td className='p-2 max-sm:p-1'>{item.coverage} </td>
                      {selectedTab == 'Pending' && 
                      <td className='p-2 max-sm:p-1'><DialogUserZoneProtection insuranceId={item.id} assetId={item.nftId} assetName='' action='approveInsurace' buttonText='Approve' setRefresh={setRefresh} /> </td>}
                    </tr>
                    <tr>
                      <td  className='h-5'></td>
                    </tr>
                  </Fragment>
                )
              })}
      
            </tbody>
          </table>
               {loaderState == true &&<LoaderComp /> }
               {(insuranceData.length == 0 && loaderState == false ) &&
                  <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
               }
        </div> 


        <div className='max-h-[500px]  px-8 max-md:px-4 overflow-auto w-full  mb-20 table-body'>
          <table className='min-w-full text-left mt-4 border-spacing-20 overflow-x-auto'>
            <thead className='text-success-502 text-center font-semibold table-auto font-manrope text-[22px] max-sm:text-[10px] underline  '>
              <tr>
                {/* <th className='p-2 max-sm:p-1'>ID</th> */}
                <th className='p-2 max-sm:p-1'>Date</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Owner</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Status</th>
                <th className='p-2 max-sm:p-1'>Coins Insured</th>
                <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                {selectedTab == 'Pending' && 
                <th className='p-2 max-sm:p-1 overflow-hidden'>Approve</th>}
              </tr>
            </thead>
           
            <tbody className='overflow-y-auto overflow-x-auto overflow-visible'>
              
              {loaderStateCoinInsurance == false  && Array.isArray(coinInsuranceData) && coinInsuranceData.map((item, index) => {
                return (
                  <Fragment key={index}>
                    <tr className='bg-success-512 text-center relative  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                      <td className='p-4 max-sm:p-1'>{new Date(item.startTime).toDateString()}</td>
                      <td className='p-4 max-sm:p-1'>{formatAddressUserZone(item.coin.userAddress)}</td>
                      <td className='p-4 max-sm:p-1'>{item.status}</td>
                      <td className='p-4 max-sm:p-1'>{item.coinsInsured}</td>
                      <td className='p-4 max-sm:p-1'>{item.coverage} </td>
                      {selectedTab == 'Pending' && 
                      <td className='p-4 max-sm:p-1'><DialogAdminCoinProtection action={selectedTab} buttonText='Approve' coinInsuranceId={item.id} setRefresh={setRefreshCoinInsurance} handleMethodCall={handleApproveCoinInsurance} /></td>}
                    </tr>
                    <tr>
                      <td  className='h-5'></td>
                    </tr>
                  </Fragment>
                )
              })}
      
            </tbody>
          </table>
               {loaderStateCoinInsurance == true &&<LoaderComp /> }
               {(coinInsuranceData.length == 0 && loaderStateCoinInsurance == false ) &&
                  <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
               }
        </div> 
        </div>
        )
}

export default AdminTablePolicyStatus