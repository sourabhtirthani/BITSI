import {useState , Fragment, useEffect} from 'react'
import LoaderComp from './LoaderComp'
import { CoinTransaction } from '@/types';
// import { CoinTransaction } from '@prisma/client';

const MyHistoryUserZoneCoin = ({address} : {address : string}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [coinHistoryDetails , setCoinHistoryDetails] = useState<CoinTransaction[]>([]);
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
  return (
    <div className='max-h-[500px] px-8 max-md:px-4 overflow-x-scroll scrollbar-none overflow-y-auto mb-20 table-body'>
    <table className='w-full text-left mt-4 border-spacing-20'>
      <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
        <tr>
          <th className='p-2 max-sm:p-1'>Date</th>
          <th className='p-2 max-sm:p-1'>Event Name</th>
          <th className='p-2 max-sm:p-1'>Coins Transferred</th>
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
              <tr className='bg-success-512 text-center  secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                <td className='p-6 max-sm:p-3'>{new Date(item.createdAt).toDateString()}</td>
                <td className='p-2 max-sm:p-1'>{item.eventName}</td>
                <td className='p-2 max-sm:p-1'>{item.coinsTransferred.toFixed(2)}</td>
                <td className='p-2 max-sm:p-1'>{item.price.toFixed(4)}</td>
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