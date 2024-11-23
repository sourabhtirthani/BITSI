'use client'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import {  CoinWithInsurances, PurcahseInsuraceUserZone } from '@/types';
import { DialogUserZoneProtection } from './DialogUserZoneProtection';

// order filter sorts the data by date 
const MyInsuraceTablePurchase = ({address} : {address : string}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [loaderStateCoin , setLoaderStateCoin] = useState(true);  
    const [dataOfNftUserZonePurchase , setDataOfNftUserZonePurchase] = useState<PurcahseInsuraceUserZone[]>([])
    const [dataOfCoinUserZonePurchase , setDataOfCoinUserZonePurchase] = useState<CoinWithInsurances[]>([])
    
    const [refresh , setRefresh] =useState(false);
    useEffect(()=>{
      const getPurchaseInsuranceDetails = async()=>{
        try{
          if(address){
            const responseFromServer = await  fetch(`/api/userzone/insurance/purchase/nft/${address}`, { method: "GET", next: { revalidate: 0 }})
            const resInJson = await responseFromServer.json();
            setDataOfNftUserZonePurchase(resInJson);
            const responseFromServerCoin = await  fetch(`/api/userzone/insurance/purchase/coin/${address}`, { method: "GET", next: { revalidate: 0 }})
            const resInJsonCoin = await responseFromServerCoin.json();
            setDataOfCoinUserZonePurchase([resInJsonCoin]);
          }
        }catch(error){
          setLoaderState(false)
          setLoaderStateCoin(false)
        }
        finally{
          setLoaderState(false)
          setLoaderStateCoin(false)
        }
      }
      getPurchaseInsuranceDetails();
    }, [address , refresh])

  return (
    <div>
    <div className='max-h-[500px] px-8 max-md:px-4 overflow-y-auto mb-20 table-body'>
      <h1 className='text-success-511 font-bold px-6 max-md:px-3'>NFTs</h1> 
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[16px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  {/* <th className='p-2 max-sm:p-1' >Marketplace</th> */}
                  <th className='p-2 max-sm:p-1'>NFT&nbsp;ID</th>
                  <th className='p-2 max-sm:p-1'>NFT&nbsp;Name</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>NFT&nbsp;Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Status</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Purchase</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {dataOfNftUserZonePurchase && Array.isArray(dataOfNftUserZonePurchase) && dataOfNftUserZonePurchase.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        {/* <td className='p-2 max-sm:p-1'><Image src={item.NFT} height={50} width={50} alt='img' /></td> */}
                        <td className='p-2 py-5 max-sm:p-1'>{new Date(item.nft_mint_time).toDateString()}</td>
                        {/* <td className='p-2 max-sm:p-1'>BITSI</td> */}
                        <td className='p-2 max-sm:p-1'>{item.id}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_name}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_price}</td>
                        <td className='p-2 max-sm:p-1'>No</td>
                        <td className='p-2 max-sm:p-1'>{item.insurance?.coverage}</td>
                        <td className='p-2 max-sm:p-1'>{item.insurance?.status}</td>
                        {(item.insurance?.status == 'Approved'  || item.insurance == null) && 
                        <td className='p-2 max-sm:p-1'><DialogUserZoneProtection buttonText='Purchase Policy' action='purchase' insuranceStatus={item.insurance?.status ?? 'Not Created'} setRefresh={setRefresh} assetId={item.id} assetName={item.nft_name} /></td> }
                      </tr>
                      <tr>
                        <td  className='h-5'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
                {dataOfNftUserZonePurchase.length == 0 && loaderState == false && (
                    <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
                )}
            {loaderState == true &&<LoaderComp /> }
          </div>


          <div className='max-h-[500px] px-8 max-md:px-4 overflow-y-auto mb-20 table-body'>
          <h1 className='text-success-511 font-bold px-6 max-md:px-3'>Coins</h1>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[16px] underline  '>
                <tr>
                  {/* <th className='p-2 max-sm:p-1'>Date</th> */}
                  {/* <th className='p-2 max-sm:p-1' >Marketplace</th> */}
                  {/* <th className='p-2 max-sm:p-1'>NFT&nbsp;ID</th> */}
                  <th className='p-2 max-sm:p-1'>Coin&nbsp;Name</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Total Coins</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Uninsured Coins</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Purcssshase</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {dataOfCoinUserZonePurchase && Array.isArray(dataOfCoinUserZonePurchase) && dataOfCoinUserZonePurchase.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        {/* <td className='p-2 max-sm:p-1'><Image src={item.NFT} height={50} width={50} alt='img' /></td> */}
                        <td className='p-2 py-5 max-sm:p-1'>BITSI COIN</td>
                        {/* <td className='p-2 max-sm:p-1'>BITSI</td> */}
                        <td className='p-2 max-sm:p-1'>{item.totalCoins}</td>
                        <td className='p-2 max-sm:p-1'>{item.unInsuredCoins}</td>
                        <td className='p-2 max-sm:p-1'>ACITON IN PROGRESS</td>
                      </tr>
                      <tr>
                        <td  className='h-5'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
                {dataOfCoinUserZonePurchase.length == 0 && loaderState == false && (
                    <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
                )}
            {loaderState == true &&<LoaderComp /> }
          </div>
          </div>
  )
}

export default MyInsuraceTablePurchase