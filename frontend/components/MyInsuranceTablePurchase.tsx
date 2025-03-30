'use client'
import React, { use, useEffect, useState } from 'react'
import LoaderComp from './LoaderComp';
import { CoinTransaction, CoinWithInsurances, PurcahseInsuraceUserZone } from '@/types';
import { DialogUserZoneProtection } from './DialogUserZoneProtection';
import DialogPurcahseCoinInsurancePolicy from './DialogPurcahseCoinInsurancePolicy';
import { purchaseCoinInsuranceAfterApproval } from '@/actions/coins';
import { toast } from './ui/use-toast';
import DialogCoinProtection from './DialogCoinProtection';
import { useAccount, useWriteContract } from 'wagmi';
import { coinInsuranceAbi, coinInsuranceContranctAddress } from '@/lib/coinInsurance';
import { coinContractAbi, coinContractAddress } from '@/lib/coinContract';
import { getTransactionFromHash, getTransactionFromHashOnPolygon } from '@/lib/getTransactionFromHash';
import currencySymbolMap from 'currency-symbol-map';
import { useCurrencyContext } from '@/context/User-Currency-Context';
import { showToastUI } from '@/lib/utils';

// order filter sorts the data by date 
const MyInsuraceTablePurchase = ({ address }: { address: string }) => {
  const [loaderState, setLoaderState] = useState(true);
  const [loaderStateForTransactions, setLoaderStateForTransactions] = useState(true);
  const [loaderActionButton, setLoaderActionButton] = useState(false);
  const [loaderStateCoin, setLoaderStateCoin] = useState(true);
  const [dataOfNftUserZonePurchase, setDataOfNftUserZonePurchase] = useState<PurcahseInsuraceUserZone[]>([])
  const [dataOfCoinUserZonePurchase, setDataOfCoinUserZonePurchase] = useState<CoinWithInsurances[]>([]);
  const [unInsuredTransactions, setUninsuredTransactions] = useState<CoinTransaction[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [maxCoinsAvailableForInsurance, setMaxCoinsAvailableForInsurance] = useState(0);
  const [refreshCoin, setRefreshCoin] = useState(false);
  const [refreshCoinTransactions, setRefreshCoinTransactions] = useState(false);
  const { writeContractAsync } = useWriteContract();
  const { isConnected } = useAccount();
  const { currencyOfUser, valueInTheUserSpecifedCurrency } = useCurrencyContext();


  useEffect(() => {
    const getPurchaseInsuranceDetails = async () => {
      try {
        if (address) {
          const responseFromServer = await fetch(`/api/userzone/insurance/purchase/nft/${address}`, { method: "GET", next: { revalidate: 0 } })
          const resInJson = await responseFromServer.json();
          if (resInJson != null) {
            setDataOfNftUserZonePurchase(resInJson);
          }

        }
      } catch (error) {
        console.log(error)
        console.log(`error fetching data from the api`)
      }
      finally {
        setLoaderState(false)

      }
    }
    getPurchaseInsuranceDetails();
  }, [address, refresh])

  useEffect(() => {
    const getCoinInsurancePurchaseDetails = async () => {
      try {
        if (address) {
          setLoaderStateCoin(true)
          const responseFromServerCoin = await fetch(`/api/userzone/insurance/purchase/coin/${address}`, { method: "GET", next: { revalidate: 0 } })
          const resInJsonCoin = await responseFromServerCoin.json();
          console.log("resInJsonCoin in neww", resInJsonCoin);
          if (resInJsonCoin != null) {
            console.log("hello in res")
            setDataOfCoinUserZonePurchase([resInJsonCoin]);
            if (resInJsonCoin && resInJsonCoin.insurances && resInJsonCoin.insurances.length > 0) {
              console.log("in the if conditon")
              let coinsInsuredPendingOrApproved = 0;
              console.log(resInJsonCoin.insurances)
              for (let i = 0; i < resInJsonCoin.insurances.length; i++) {
                coinsInsuredPendingOrApproved = coinsInsuredPendingOrApproved + resInJsonCoin.insurances[i].coinsInsured;
              }
              setMaxCoinsAvailableForInsurance(resInJsonCoin.totalCoins - coinsInsuredPendingOrApproved);
            } else {
              console.log("in the else conditon")

              setMaxCoinsAvailableForInsurance(resInJsonCoin.unInsuredCoins);
            }
          }
        }
      } catch (error) {
        console.log(error)
        console.log(`error fetching data from the api`)
      } finally {
        setLoaderStateCoin(false)
      }
    }
    getCoinInsurancePurchaseDetails();
  }, [address, refreshCoin])

  useEffect(() => {
    const getTransactionsThatAreNotInsured = async () => {
      try {
        setLoaderStateForTransactions(true);
        const res = await fetch(`/api/userzone/history/coins/${address}?type=protection`, { method: "GET", next: { revalidate: 0 }, },)
        const resParsed = await res.json();
        setUninsuredTransactions(resParsed);

      } catch (error) {
        toast({ title: "Error", description: "Error getting transactions", duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, })
      } finally {
        setLoaderStateForTransactions(false);
      }
    }
    getTransactionsThatAreNotInsured();
  }, [address, refreshCoinTransactions])

  const handleCoinInsurancePurchase = async (coinInsuranceId: number, setRefreshMethod: React.Dispatch<React.SetStateAction<boolean>>, numberOfCoins: number, numberOfYears: number) => {
    try {
      if (!isConnected) {
        throw new Error('Please connect wallet to purchase insurance');
      }
      setLoaderActionButton(true);
      const getCurrentCoinDetails = await fetch(`https://api.dexscreener.com/latest/dex/tokens/0x628211398E10a014826bc7d943a39b2cE6126D72`, { method: 'GET' });
      const getCurrentCoinDetailsParsed = await getCurrentCoinDetails.json();
      const currentCoinPrice = getCurrentCoinDetailsParsed.pairs[0].priceNative;
      // const totalPriceOfInsurance = (Number(currentCoinPrice) * numberOfCoins)*(80/100);
      const totalPriceOfInsurance = (Number(currentCoinPrice) * 1);
      console.log(`this is the total price of insurance : ${totalPriceOfInsurance}`)
      const priceInWei = BigInt(totalPriceOfInsurance * 10 ** 18);
      // const maxUint256 = BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935");
      // const approveContractTransaciton  = await writeContractAsync({
      //   address : coinContractAddress,
      //   abi : coinContractAbi,
      //   functionName : 'approve',
      //   args: [coinInsuranceContranctAddress , maxUint256]
      // })
      // const waitForApproveTransaction = await getTransactionFromHashOnPolygon(approveContractTransaciton);
      // await new Promise(resolve => setTimeout(resolve, 30000));

      // if(waitForApproveTransaction.success == true){
      // TO DO : discuss this transaction with the blockchain team
      const transaction = await writeContractAsync({
        address: coinInsuranceContranctAddress,
        abi: coinInsuranceAbi,
        functionName: 'activatePolicy',
        args: [address, coinInsuranceId, priceInWei, numberOfYears, coinContractAddress, numberOfCoins],
      })
      if (!transaction) {
        console.log('error in transaction during purchase');
        throw new Error('Error purchasing policty of the user');
      }
      const purchaseCoinInsurace = await purchaseCoinInsuranceAfterApproval(coinInsuranceId, Number(currentCoinPrice), numberOfYears);
      setRefreshMethod(prev => !prev);
      toast({ title: "Operation Success", description: "Successfully purchased insurance", duration: 2000, style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope', } })
      // }
    } catch (error) {
      console.log(error)
      toast({ title: "Error", description: "Error Purchasing Insurance", duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', } })
    } finally {
      setLoaderActionButton(false);
    }
  }

  const wrappedHandler = (coinInsuranceId: number, setRefreshMethod: React.Dispatch<React.SetStateAction<boolean>>, numberOfCoins: number) => {

    const expirationTime = 123;
    // const currentInsuranceItem = item.insurances.find(insurance => insurance.id === id);
    const currentInsuranceItem = dataOfCoinUserZonePurchase.flatMap(item => item.insurances).find(insurance => insurance?.id === coinInsuranceId);
    console.log(`the id of tha is and the expiraiton time is : ${currentInsuranceItem?.expiration} , the id is ${currentInsuranceItem?.id}`)
    // const years = Math.floor((new Date(currentInsuranceItem?.expiration.getFullYear()) - new Date(currentInsuranceItem?.startTime.getFullYear())) / (1000 * 60 * 60 * 24 * 365.25));
    const years = new Date(currentInsuranceItem?.expiration ?? "").getFullYear() - new Date(currentInsuranceItem?.startTime ?? "").getFullYear();
    return handleCoinInsurancePurchase(coinInsuranceId, setRefreshMethod, numberOfCoins, years);
  }

  const purchaseRequest = async (item: any) => {

    try {
      const response = await fetch(`/api/userzone/insurance/purchase/coin/${address}`, {
        method: "POST",  // Ensure it's "POST"
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: 1, id: item.id }),
      });

      if (response.status) {
        showToastUI({ title: "Success", description: "Request submitted successfully", operation: "success" });
      }

      console.log("Response Status:", response.status);

      const data = await response.json();
      console.log("Response Data:", data);

    } catch (error) {
      console.error("Fetch Error:", error);
    }
  };

  const purchaseNow = async (item: any) => {
    console.log("purchase Now", item)
  }

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
                    {(item.insurance?.status == 'Approved' || item.insurance == null) &&
                      <td className='p-2 max-sm:p-1'><DialogUserZoneProtection buttonText='Purchase Policy' action='purchase' insuranceStatus={item.insurance?.status ?? 'Not Created'} setRefresh={setRefresh} assetId={item.id} assetName={item.nft_name} /></td>}
                  </tr>
                  <tr>
                    <td className='h-5'></td>
                  </tr>
                </React.Fragment>
              )
            })}
          </tbody>

        </table>
        {dataOfNftUserZonePurchase.length == 0 && loaderState == false && (
          <div className='text-success-511 w-full font-bold flex justify-center mt-10 self-center'>NO DATA FOUND</div>
        )}
        {loaderState == true && <LoaderComp />}
      </div>


      <div className='max-h-[500px] px-8 max-md:px-4 overflow-y-auto mb-20 table-body'>
        <h1 className='text-success-511 font-bold px-6 max-md:px-3'>Coins</h1>
        <table className='w-full text-left mt-4 border-spacing-20'>
          <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[16px] underline'>
            <tr>
              <th className='p-2 max-sm:p-1'>ID</th>
              <th className='p-2 max-sm:p-1'>User Address</th>
              <th className='p-2 max-sm:p-1'>Total Coins</th>
              <th className='p-2 max-sm:p-1'>Total Amount</th>
              <th className='p-2 max-sm:p-1'>Uninsured Coins</th>
              <th className='p-2 max-sm:p-1'>Created At</th>
              <th className='p-2 max-sm:p-1'>Updated At</th>
              <th className='p-2 max-sm:p-1'>Purchase</th>
            </tr>
          </thead>
          <tbody>
            {dataOfCoinUserZonePurchase && Array.isArray(dataOfCoinUserZonePurchase) && dataOfCoinUserZonePurchase.length > 0 ? (
              dataOfCoinUserZonePurchase.map((item, index) => (
                <tr key={index} className='bg-success-509 text-center text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                  <td className='p-2'>{item.id}</td>
                  <td className='p-2'>{item.userAddress}</td>
                  <td className='p-2'>{item.totalCoins}</td>
                  <td className='p-2'>{item.totalAmount}</td>
                  <td className='p-2'>{item.unInsuredCoins}</td>
                  <td className='p-2'>{new Date(item.createdAt).toDateString()}</td>
                  <td className='p-2'>{new Date(item.updatedAt).toDateString()}</td>
                  {/* <td className='p-2'>Purchase Function Here</td> */}
                  <td className='p-2'>
                    {item.status === 0 && (
                      <button
                        onClick={() => purchaseRequest(item)}
                        className='px-4 py-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out'
                      >
                        Purchase Request
                      </button>
                    )}
                    {item.status === 1 && <span className='text-yellow-400 font-semibold'>Approval Pending</span>}
                    {item.status === 2 && (
                      <button
                        onClick={() => purchaseNow(item)}
                        className='px-4 py-1 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-md transition duration-200 ease-in-out'
                      >
                        Purchase Now
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className='text-success-511 w-full font-bold text-center py-4'>NO DATA FOUND</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MyInsuraceTablePurchase