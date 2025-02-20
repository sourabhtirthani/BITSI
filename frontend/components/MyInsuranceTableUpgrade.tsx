'use client'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { CoinInsuranceDetailsUserZone, NftDataWithInsurace } from '@/types';
import { DialogUserZoneProtection } from './DialogUserZoneProtection';
import { useAccount, useWriteContract } from 'wagmi';
import { coinInsuranceAbi, coinInsuranceContranctAddress } from '@/lib/coinInsurance';
import { getTransactionFromHash, getTransactionFromHashOnPolygon } from '@/lib/getTransactionFromHash';
import { toast } from './ui/use-toast';
import { upgradeInsuranceForCoin } from '@/actions/coins';
import DialogCoinProtection from './DialogCoinProtection';
import { useCreditContext } from '@/context/Credit-Context';
import { showToastUI } from '@/lib/utils';
// order filter sorts the data by date 
const MyInsuranceTableUpgrade = ({address} : {address : string}) => {
    const [inputValueForUpgrade , setInputValueForUpgrade] = useState<number | ''>('');
    const [loaderState , setLoaderState] = useState(true);
    const [dataOfNftUserZonePurchase , setDataOfNftUserZonePurchase] = useState<NftDataWithInsurace[]>([])
    const [refresh , setRefresh] =useState(false);
    const [loaderStateCoin , setLoaderStateCoin] = useState(true);
    const [refreshCoin , setRefreshCoin] = useState(false);
    const [dataOfCoinInsurance , setDataOfCoinInsurance] = useState<CoinInsuranceDetailsUserZone[]>([]);
    const [loaderActionButton , setLoaderActionButton] = useState(false); // used to set the laoding for the dialog of coin 
    const {writeContractAsync} = useWriteContract();
    const {creditScore , setRefreshCreditScore} = useCreditContext();
    // const {isConnected} = useAccount();
    useEffect(()=>{
      const getDataOfNftOnLoad = async()=>{
        try{
          if(address){
            const responseFromServer = await  fetch(`/api/userzone/insurance/upgrade/nft/${address}`, { method: "GET", next: { revalidate: 0 }})
            const resInJson = await responseFromServer.json();
            setDataOfNftUserZonePurchase(resInJson);
          }
          // setLoaderState(false)
        }catch(error){
          // setLoaderState(false)
        }finally{
          setLoaderState(false)
        }
      }
      getDataOfNftOnLoad();
    }, [address , refresh])

    useEffect(()=>{
      const getDataOfCoinOnLoad = async()=>{
        try{
          if(address){
            setLoaderStateCoin(true)
            const responseFromServer = await  fetch(`/api/userzone/insurance/upgrade/coin/${address}`, { method: "GET", next: { revalidate: 0 }})
            const resInJson = await responseFromServer.json();
            setDataOfCoinInsurance(resInJson);
          }
          // setLoaderState(false)
        }catch(error){
          // setLoaderState(false)
        }finally{
          setLoaderStateCoin(false)
        }
      }
      getDataOfCoinOnLoad();
    }, [address , refreshCoin])

    const handleUpgradeInsuraneOfCoin = async(insuranceId : number , setRefreshMethod : React.Dispatch<React.SetStateAction<boolean>>, numberOfCoins : number)=>{
      try{
        setLoaderActionButton(true);
        console.log(`the current input value is : ${inputValueForUpgrade}`)
        if(inputValueForUpgrade == ''){
          showToastUI({title : "ERROR!!!" , description : "Please enter the value to upgrade" , operation : "fail"});
          return;
        }
        if(Number(inputValueForUpgrade) > Number(creditScore)){ 
             showToastUI({title : "ERROR!!!" , description : "Current Value exceeds your Credit Score" , operation : "fail"});
             return;
        }
        // newPrice , upgradeAmount are the two new args, TO DO : Discuss them
        const transactionFromUpgradeInsurance  = await writeContractAsync({
          address : coinInsuranceContranctAddress,
          abi : coinInsuranceAbi,
          functionName : 'upgradePolicy', 
          args: [address , insuranceId , numberOfCoins*10**18],
        })
        if(transactionFromUpgradeInsurance){
          const waitForTransactionToBeSuccessful = await getTransactionFromHash(transactionFromUpgradeInsurance);
            const upgradeInsuranceOfUser = await upgradeInsuranceForCoin(insuranceId , address as string , inputValueForUpgrade);
            setRefreshMethod(prev => !prev);
             showToastUI({title : "Success" , description : "Successfully upgraded insurance" , operation : "success"});
            setRefreshCreditScore(prev => !prev);
        }

      }catch(error){
        console.log(error)
         showToastUI({title : "Error" , description : "Error Upgrading Insurance" , operation : "fail"});
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
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Upgrade</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {dataOfNftUserZonePurchase && Array.isArray(dataOfNftUserZonePurchase) && dataOfNftUserZonePurchase.map((item, index) => {
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
                        <td className='p-2 max-sm:p-1'><DialogUserZoneProtection  buttonText='Upgrade Policy' action='upgrade' setRefresh={setRefresh} assetId={item.id} assetName={item.nft_name} /></td>
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
                {dataOfNftUserZonePurchase.length == 0 && loaderState == false && (
                    <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
                )}
            {loaderState == true &&<LoaderComp /> }
          </div>

            {/* For Coins  */}
          <div className='max-h-[500px] px-8 max-md:px-4 overflow-y-auto mb-20 table-body'>
            <p className='text-success-511 px-4 font-semibold  text-[1.2rem]'>Coins</p>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[16px] underline  '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1'>Id</th>
                  <th className='p-2 max-sm:p-1' >Coins Insured</th>
                  <th className='p-2 max-sm:p-1'>Status</th>
                  <th className='p-2 max-sm:p-1'>Coverage</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Upgrade</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {dataOfCoinInsurance && Array.isArray(dataOfCoinInsurance) && dataOfCoinInsurance.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        {/* <td className='p-2 max-sm:p-1'><Image src={item.NFT} height={50} width={50} alt='img' /></td> */}
                        <td className='p-2 py-5 max-sm:p-1'>{new Date(item.startTime).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'>{item.id}</td>
                        <td className='p-2 max-sm:p-1'>{item.coinsInsured.toFixed(3)} BITSI</td>
                        <td className='p-2 max-sm:p-1'>{item.status}</td>
                        <td className='p-2 max-sm:p-1'>{item.coverage.toFixed(5)} MATIC</td>
                        <td className='p-2 max-sm:p-1'>{new Date(item.expiration).toDateString()}</td>
                        {/* <td className='p-2 max-sm:p-1'>{item.is_extended == true ? <DialogCoinProtection numberOfCoins={item.coinsInsured} loaderActionButton = {loaderActionButton} action='upgrade' buttonText='Upgrade' coinInsuranceId={item.id} setRefresh={setRefreshCoin} handleMethodCall={handleUpgradeInsuraneOfCoin} dialogDescription='Upgrading the Insurance Policy will change in coverage.' dialogTitle='Upgrade Insurance Policy?' /> 
                        : <div className='text-gray-400 max-sm:text-[12px] hover:underline   px-4 font-semibold font-manrope text-[16px] relative group cursor-default'>Upgrade
                          <p className='absolute max-md:hidden bg-white  text-black text-[12px] font-bold px-2 py-1 opacity-0 text-center rounded-xl group-hover:opacity-100 transition-opacity'>Cannot Upgrade without extending</p></div>}</td>
                           */}
                          <td className='p-2 max-sm:p-1'><DialogCoinProtection setUpgradeInputValue={setInputValueForUpgrade} numberOfCoins={item.coinsInsured} loaderActionButton = {loaderActionButton} action='upgrade' buttonText='Upgrade' coinInsuranceId={item.id} setRefresh={setRefreshCoin} handleMethodCall={handleUpgradeInsuraneOfCoin} dialogDescription='Upgrading the insurance policy will adjust the coverage, with the maximum upgrade limit determined by the user&apos;s credit value.' dialogTitle='Upgrade Insurance Policy?' /></td>
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

export default MyInsuranceTableUpgrade