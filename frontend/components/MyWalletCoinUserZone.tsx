'use client'
import { useEffect, useState, Fragment } from 'react'
import LoaderComp from './LoaderComp';
import { CoinTransaction, WalletUserZoneCoin } from '@/types';
import { readContract } from '@wagmi/core';
import { coinContractAbi, coinContractAddress } from '@/lib/coinContract';
import { config } from '@/config';
import { read } from 'fs';

const MyWalletCoinUserZone = ({ address , orderFilter , priceFilter }: { address: string , orderFilter : string , priceFilter : string }) => {
  const [loaderState, setLoaderState] = useState(true);
  const [loaderStateForMultipleTransaction, setLoaderStateForMultipleTransaction] = useState(true);
  const [userCoins, setUserCoins] = useState<WalletUserZoneCoin[]>([]);
  const [coinHistoryDetailsWalletUserZone, setCoinHistoryDetailsWalletUserZone] = useState<CoinTransaction[]>([]);
  const [totalCoinsofUser , setTotalCoinsOfUser] = useState('');
  useEffect(() => {
    const getAlluserCoins = async () => {
      try {
        const responseFromServer = await fetch(`/api/userzone/coins/user/${address}`, { method: "GET", next: { revalidate: 0 } })
        const resInJson = await responseFromServer.json();
        if (resInJson == null) {
          setLoaderState(false);
          return;
        }
        console.log('reacher hrer')
        setUserCoins([resInJson]);
        console.log(resInJson)
        console.log(`this is the res in json`)
      } catch (error) {
        console.log(error)
      } finally {
        setLoaderState(false);
      }
    }
    getAlluserCoins();
  }, [address])
  useEffect(() => {
    const getUserCoinTransactions = async () => {
      try {
        const res = await fetch(`/api/userzone/history/coins/${address}?type=userwallet`, { method: "GET", next: { revalidate: 0 }, },)
        const resParsed = await res.json();
        setCoinHistoryDetailsWalletUserZone(resParsed);
      } catch (error) {
        console.log(error)
      } finally {
        setLoaderStateForMultipleTransaction(false);
      }
    }
    getUserCoinTransactions();
  }, [address])

  useEffect(()=>{
    const readTotalCoinsFromContract = async()=>{
      try{
        const totalCoins = await readContract(config , {
          abi : coinContractAbi,
          address : coinContractAddress,
          functionName : 'balanceOf',
          args : [address]
        })
        console.log(`the total coinse response is `)
        console.log(Number(totalCoins))
        const coinsFormatted = Number(totalCoins)/10**18;
        setTotalCoinsOfUser(coinsFormatted.toString());
      }catch(error){
        console.log(error);
        console.log(`in the error clause of reading the total coins of the user`);
      }
    }
    readTotalCoinsFromContract();
  } ,[address])

  useEffect(()=>{
        const sortDataBasedOnOrderOfDate = async()=>{
          
  
          if(orderFilter == 'Asc Order'){
            const sortedData = [...coinHistoryDetailsWalletUserZone].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setCoinHistoryDetailsWalletUserZone(sortedData);
          }else if(orderFilter == 'Desc Order'){
            const sortedData = [...coinHistoryDetailsWalletUserZone].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setCoinHistoryDetailsWalletUserZone(sortedData);
          } else{
  
          }
        }
        sortDataBasedOnOrderOfDate();
  
      } , [orderFilter])
  
      useEffect(()=>{
        const sortDataBasedOnPrice = async()=>{
          if(priceFilter == 'Low to High'){
            const sortedData = [...coinHistoryDetailsWalletUserZone].sort((a, b) => a.price - b.price);
            setCoinHistoryDetailsWalletUserZone(sortedData);
  
          }else if(priceFilter == 'High to Low'){
            const sortedData = [...coinHistoryDetailsWalletUserZone].sort((a, b) => b.price - a.price);
            setCoinHistoryDetailsWalletUserZone(sortedData);
          }else{
  
          }
        }
        sortDataBasedOnPrice();
      } , [priceFilter])

  return (
    <div>
      <div className='max-h-[200px] h-fit overflow-y-auto  table-body px-4 md:px-8'>
        <p className='text-success-511 text-[1.25rem]  font-bold px-2 flex justify-start'>{userCoins?.length > 0 ? ` Total Balance - ${totalCoinsofUser} BITSI` : ''}</p>
        {/* <table className='w-full text-left mt-4 border-spacing-20'>
          <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
            <tr>
             
              <th className='p-2 max-sm:p-1'>Coin Name</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Total Coins</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Total Amount</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Insured Coins</th>
             
            </tr>
          </thead>
          <tbody className='overflow-y-auto '>
            {userCoins != null && Array.isArray(userCoins) && userCoins.map((item, index) => {
              return (
                <Fragment key={index}>
                  <tr className='bg-success-512 text-center secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                    <td className='p-2 py-5 max-sm:p-1'>BITSI COIN</td>
                    <td className='p-2 max-sm:p-1'>{item.totalCoins.toFixed(5)} BITSI</td>
                    <td className='p-2 max-sm:p-1'>{item.totalAmount.toFixed(5)} MATIC</td>
                    <td className='p-2 max-sm:p-1'>{item.totalCoins - item.unInsuredCoins}</td>
                  
                  </tr>
                  <tr>
                    <td className='h-6'></td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>

        </table> */}
        {/* {loaderState == true && <LoaderComp />} */}
      </div>
      <div className='max-h-[500px] overflow-y-auto mb-20 table-body px-4 md:px-8'>
        <table className='w-full text-left mt-4 border-spacing-20'>
          <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
            <tr>
              {/* <th className='p-2 max-sm:p-1'>Date</th> */}
              {/* <th className='p-2 max-sm:p-1' >Marketplace</th> */}
              <th>Date</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Coins</th>
              <th className='p-2 max-sm:p-1 overflow-hidden'>Amount</th>
              {/* <th className='p-2 max-sm:p-1 overflow-hidden'></th> */}
              {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th> */}
            </tr>
          </thead>
          <tbody className='overflow-y-auto '>
            {coinHistoryDetailsWalletUserZone != null && Array.isArray(coinHistoryDetailsWalletUserZone) && coinHistoryDetailsWalletUserZone.map((item, index) => {
              return (
                <Fragment key={index}>
                  <tr className='bg-success-512 text-center secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                    <td className='p-2 py-5 max-sm:p-1'>{new Date(item.createdAt).toDateString()}</td>
                    <td className='p-2 max-sm:p-1'>{item.coinsTransferred.toFixed(5)} BITSI</td>
                    <td className='p-2 max-sm:p-1'>{item.price.toFixed(5)} MATIC</td>
                    {/* <td className='p-2 max-sm:p-1'>{}</td> */}
                    {/* <DropdownMyProfile setValue={setCoinDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems} itemsInsideTable={['Claim Compensation']}/> */}
                  </tr>
                  <tr>
                    <td className='h-6'></td>
                  </tr>
                </Fragment>
              )
            })}
          </tbody>

        </table>
        {loaderStateForMultipleTransaction == true && <LoaderComp />}
      </div>



    </div>
  )
}

export default MyWalletCoinUserZone