import {useState , Fragment, useEffect} from 'react'
import LoaderComp from './LoaderComp'
import { CoinTransaction } from '@/types';
import { formatAddressUserZone, getPriceInUserSpecifeidCurrency } from '@/lib/utils';
import { useCurrencyContext } from '@/context/User-Currency-Context';
// import { CoinTransaction } from '@prisma/client';
import currencySymbolMap from 'currency-symbol-map';

const MyHistoryUserZoneCoin = ({address , orderFilter , priceFilter} : {address : string , orderFilter : string , priceFilter : string}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [coinHistoryDetails , setCoinHistoryDetails] = useState<CoinTransaction[]>([]);
    const {currencyOfUser , valueInTheUserSpecifedCurrency} = useCurrencyContext();
    // const [maticValueInUserCurrency , setMaticValueInUserCurrency] = useState<number>(0);
    // const [filteredCoinHistoryDetails , setFilteredCoinHistoryDetails] = useState<CoinTransaction[]>([]);

    useEffect(()=>{
        const getUserCoinTransactions  = async()=>{
            try{
                const res = await fetch(`/api/userzone/history/coins/${address}` , {method : "GET" , next : {revalidate : 0} , } ,  )
                const resParsed = await res.json();
                setCoinHistoryDetails(resParsed);
            }catch(error){
                console.log(error)
            }finally{
                setLoaderState(false);
            }
        }
        getUserCoinTransactions();
    } ,[])

    useEffect(()=>{
        const sortDataBasedOnOrderOfDate = async()=>{
          
    
          if(orderFilter == 'Asc Order'){
            const sortedData = [...coinHistoryDetails].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            setCoinHistoryDetails(sortedData);
          }else if(orderFilter == 'Desc Order'){
            const sortedData = [...coinHistoryDetails].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            setCoinHistoryDetails(sortedData);
          } else{
    
          }
        }
        sortDataBasedOnOrderOfDate();
    
      } , [orderFilter])
    
      useEffect(()=>{
        const sortDataBasedOnPrice = async()=>{
          if(priceFilter == 'Low to High'){
            const sortedData = [...coinHistoryDetails].sort((a, b) => a.price - b.price);
            setCoinHistoryDetails(sortedData);
    
          }else if(priceFilter == 'High to Low'){
            const sortedData = [...coinHistoryDetails].sort((a, b) => b.price - a.price);
            setCoinHistoryDetails(sortedData);
          }else{
    
          }
        }
        sortDataBasedOnPrice();
      } , [priceFilter])
  return (
    <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
    <table className='w-full text-left mt-4 border-spacing-20'>
      <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
        <tr>
          <th className='p-2 max-sm:p-1'>Date</th>
          <th className='p-2 max-sm:p-1'>Event Name</th>
          <th className='p-2 max-sm:p-1'>from</th>
          <th className='p-2 max-sm:p-1'>to</th>
          <th className='p-2 max-sm:p-1'>Coins Transferred</th>
          {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Matic</th> */}
          <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
          {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Protected</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Coverage</th>
          <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th> */}
          {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Compensaion (IF)</th> */}
        </tr>
      </thead>
     
      <tbody className='overflow-y-auto '>
        
        {loaderState == false  && Array.isArray(coinHistoryDetails) && coinHistoryDetails.map((item, index) => {
          return (
            <Fragment key={index}>
              <tr className='bg-success-512 text-center relative secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                <td className='p-6 max-sm:p-3'>{new Date(item.createdAt).toDateString()}</td>
                <td className='p-2 max-sm:p-1'>{item.eventName}</td>
                <td className='p-2 max-sm:p-1 relative group cursor-default'>{formatAddressUserZone(item.from)}
                <p className='absolute max-md:hidden bg-white  text-black text-[12px] font-bold px-2 py-1 opacity-0 text-center rounded-xl group-hover:opacity-100 transition-opacity'>{item.from}</p>
                </td>
                <td className='p-2 max-sm:p-1 relative group cursor-default'>{formatAddressUserZone(item.to)}
                <p className='absolute max-md:hidden bg-white  text-black text-[12px] font-bold px-2 py-1 opacity-0 text-center rounded-xl group-hover:opacity-100 transition-opacity'>{item.to}</p>
                </td>
                <td className='p-2 max-sm:p-1'>{item.coinsTransferred.toFixed(2)} BITSI</td>
                {/* <td className='p-2 max-sm:p-1'>{item.price.toFixed(4)} MATIC</td> */}
                <td className='p-2 max-sm:p-1'>{(item.price * valueInTheUserSpecifedCurrency).toFixed(  4)} {currencySymbolMap(currencyOfUser)}</td>
                {/* <td className='p-2 max-sm:p-1'></td>
                <td className='p-2 max-sm:p-1'>{ new Date(item.nft.insurance.expiration) > new Date() ? 'Yes' : 'No'}</td>
                <td className='p-2 max-sm:p-1'>{item.nft.insurance.coverage} {balance?.symbol}</td>
                <td className='p-2 max-sm:p-1'>{item.nft.insurance.expiration && new Date(item.nft.insurance.expiration).toDateString() || '-'}</td> */}
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
  </div>
  )
}

export default MyHistoryUserZoneCoin