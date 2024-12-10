'use client'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { CoinInsuranceDetailsUserZone, NftDataWithInsurace } from '@/types';
import { DialogUserZoneProtection } from './DialogUserZoneProtection';
import { toast } from './ui/use-toast';
import { extendInsurance } from '@/actions/uploadNft';
import DialogCoinProtection from './DialogCoinProtection';
import { extendInsuranceForCoin } from '@/actions/coins';
import { useAccount, useWriteContract } from 'wagmi';
import { coinInsuranceAbi, coinInsuranceContranctAddress } from '@/lib/coinInsurance';
import { coinContractAbi, coinContractAddress } from '@/lib/coinContract';
// order filter sorts the data by date 
const MyInsuranceTableExtend = ({address} : {address : string}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [dataOfNftUserZoneExtend , setDataOfNftUserZoneExtend] = useState<NftDataWithInsurace[]>([])
    const [loaderStateCoin , setLoaderStateCoin] = useState(true);
    const [loaderActionButton , setLoaderActionButton] = useState(false)
    const [dataOfCoinInsurance , setDataOfCoinInsurance] = useState<CoinInsuranceDetailsUserZone[]>([])
    const [refreshCoin , setRefreshCoin] = useState(false);
    const [refresh , setRefresh] = useState(false);
    const {writeContractAsync} = useWriteContract();
    useEffect(()=>{
      const getDataOfNftOnLoad = async()=>{
        try{
          if(address){
            const responseFromServer = await  fetch(`/api/userzone/insurance/extend/nft/${address}`, { method: "GET", next: { revalidate: 0 }})
            const resInJson = await responseFromServer.json();
            setDataOfNftUserZoneExtend(resInJson);
          }
          setLoaderState(false)
        }catch(error){
          setLoaderState(false)
        }
      }
      getDataOfNftOnLoad();
    }, [address , refresh])

    useEffect(()=>{
      const getDataOfCoinOnLoad = async()=>{
        try{  
          if(address){
            const responseFromServer = await  fetch(`/api/userzone/insurance/extend/coin/${address}`, { method: "GET", next: { revalidate: 0 }})
            const resInJson = await responseFromServer.json();
            setDataOfCoinInsurance(resInJson)
          }

        }catch(error){
          console.log(`error on fetching data of coin`)
        }finally{
          setLoaderStateCoin(false);
        }
      }
      getDataOfCoinOnLoad();
    } , [address , refreshCoin])

    const handleExtendInsuranceOfCoin = async(insuranceId : number , setRefreshMethod : React.Dispatch<React.SetStateAction<boolean>>, numberOfCoins : number)=>{
      try{
        setLoaderActionButton(true);

        const approveContractTransaciton  = await writeContractAsync({
          address : coinContractAddress,
          abi : coinContractAbi,
          functionName : 'approve',
          args: [coinInsuranceContranctAddress , numberOfCoins]
        })
        await new Promise(resolve => setTimeout(resolve, 30000));
        const transaction  = await writeContractAsync({
          address : coinInsuranceContranctAddress,
          abi : coinInsuranceAbi,
          functionName : 'extendPolicy',
          args: [address , insuranceId],
        })
        if(!transaction){
          console.log('error in extending insurance');
          throw new Error('Error extending insurance');
        }
        const extendInsuranceOfUser = await extendInsuranceForCoin(insuranceId);
        setRefreshMethod(prev => !prev);
        toast({title: "Successfully extended insurance",description: 'You can now purchase insurance',duration: 2000, style: {backgroundColor: '#00b289',color: 'white',fontFamily: 'Manrope' }})
      }catch(error){
        toast({ title: "Error", description: "Error Purchasing Insurance", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
      }finally{
        setLoaderActionButton(false);
      }
    }


  return (
    <div>
    <div className='max-h-[500px] px-8 max-md:px-4 overflow-y-auto mb-20 table-body'>
      <p className='text-success-511 px-4 text-[1.2rem] font-semibold'>NFTs</p>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[16px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1' >Marketplace</th>
                  <th className='p-2 max-sm:p-1'>NFT&nbsp;ID</th>
                  <th className='p-2 max-sm:p-1'>NFT&nbsp;Name</th>

                  <th className='p-2 max-sm:p-1 overflow-hidden'>NFT&nbsp;Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Extend</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {dataOfNftUserZoneExtend && Array.isArray(dataOfNftUserZoneExtend) && dataOfNftUserZoneExtend.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        {/* <td className='p-2 max-sm:p-1'><Image src={item.NFT} height={50} width={50} alt='img' /></td> */}
                        <td className='p-2 py-5 max-sm:p-1'>{new Date(item.nft_mint_time).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'>BITSI</td>
                        <td className='p-2 max-sm:p-1'>{item.id}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_name}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_price}</td>
                        <td className='p-2 max-sm:p-1'>{new Date(item.insurance?.expiration ?? 0) > new Date() ? 'Yes' : 'No'}</td>
                        <td className='p-2 max-sm:p-1'>{item.insurance?.coverage}</td>
                        <td className='p-2 max-sm:p-1'>{item.insurance?.expiration && new Date(item.insurance.expiration).toDateString() || '-'}</td>
                        <td className='p-2 max-sm:p-1'><DialogUserZoneProtection buttonText='Extend Policy' action='extend' setRefresh={setRefresh} assetId={item.id} assetName={item.nft_name} /></td>
                        {/* <td>
                        <DropdownMyProfile setValue={setNftDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems} itemsInsideTable={['Convert to BITSI Coin' , 'Claim Compensation']}/></td> */}
                      </tr>
                      <tr>
                        <td  className='h-5'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
                {dataOfNftUserZoneExtend.length == 0 && loaderState == false && (
                    <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
                )}
            {loaderState == true &&<LoaderComp /> }
          </div>

          <div className='max-h-[500px] px-8 max-md:px-4 overflow-y-auto mb-20 table-body'>
          <p className='text-success-511 px-4 font-semibold  text-[1.2rem]'>Coins</p>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[16px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  {/* <th className='p-2 max-sm:p-1' >Marketplace</th> */}
                  {/* <th className='p-2 max-sm:p-1'>NFT&nbsp;ID</th> */}
                  {/* <th className='p-2 max-sm:p-1'>NFT&nbsp;Name</th> */}

                  <th className='p-2 max-sm:p-1 overflow-hidden'>Coins Insured</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Status</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Extend</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {dataOfCoinInsurance && Array.isArray(dataOfCoinInsurance) && dataOfCoinInsurance.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        {/* <td className='p-2 max-sm:p-1'><Image src={item.NFT} height={50} width={50} alt='img' /></td> */}
                        <td className='p-2 py-5 max-sm:p-1'>{new Date(item.startTime).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'>{item.coinsInsured}</td>
                        <td className='p-2 max-sm:p-1'>{item.status}</td>
                        <td className='p-2 max-sm:p-1'>{item.coverage.toFixed(4)}</td>
                        <td className='p-2 max-sm:p-1'>{new Date(item.expiration).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'><DialogCoinProtection numberOfCoins={item.coinsInsured} loaderActionButton = {loaderActionButton} action='extend' buttonText='Extend' coinInsuranceId={item.id} setRefresh={setRefreshCoin} handleMethodCall={handleExtendInsuranceOfCoin} dialogDescription='Extending the Insurance Policy will result in a 1-year extension of the policy duration.' dialogTitle='Extend Insurance Policy?' /></td>
                        {/* <td>
                        <DropdownMyProfile setValue={setNftDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems} itemsInsideTable={['Convert to BITSI Coin' , 'Claim Compensation']}/></td> */}
                      </tr>
                      <tr>
                        <td  className='h-5'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
                {dataOfCoinInsurance.length == 0 && loaderStateCoin == false && (
                    <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
                )}
            {loaderStateCoin == true &&<LoaderComp /> }
          </div>

          </div>
  )
}

export default MyInsuranceTableExtend