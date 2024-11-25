'use client'
import {useEffect, useState , Fragment} from 'react'
import LoaderComp from './LoaderComp';
import { WalletUserZoneCoin } from '@/types';

const MyWalletCoinUserZone = ({address} : {address : string}) => {
    const [loaderState , setLoaderState] = useState(true);
    const [userCoins , setUserCoins] = useState<WalletUserZoneCoin[]>([]);
    useEffect(()=>{
        const getAlluserCoins = async()=>{
            try{
                const responseFromServer = await  fetch(`/api/userzone/coins/user/${address}`, { method: "GET", next: { revalidate: 0 }})
                const resInJson = await responseFromServer.json();
                if(resInJson == null){
                  setLoaderState(false);
                  return;
                }
                console.log('reacher hrer')
                setUserCoins([resInJson]);
                console.log(resInJson)
                console.log(`this is the res in json`)
            }catch(error){
                console.log(error)
            }finally{
                setLoaderState(false);
            }
        }
        getAlluserCoins();
    }, [address])
  return (
    <div className='max-h-[500px] overflow-y-auto mb-20 table-body p-4 md:p-8'>
            <table className='w-full text-left mt-4 border-spacing-20'>
              <thead className='text-success-502 text-center font-semibold font-manrope text-[22px] max-sm:text-[10px] underline  '>
                <tr>
                  {/* <th className='p-2 max-sm:p-1'>Date</th> */}
                  {/* <th className='p-2 max-sm:p-1' >Marketplace</th> */}
                  <th className='p-2 max-sm:p-1'>Coin Name</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Total Coins</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Total Amount</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Insured Coins</th>
                  {/* <th className='p-2 max-sm:p-1 overflow-hidden'>Expiration</th> */}
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {userCoins != null && Array.isArray(userCoins) && userCoins.map((item, index) => {
                  return (
                    <Fragment key={index}>
                      <tr className='bg-success-512 text-center secondary-shadow11 w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-2 py-5 max-sm:p-1'>BITSI COIN {userCoins.length}</td>
                        <td className='p-2 max-sm:p-1'>{item.totalCoins}</td>
                        <td className='p-2 max-sm:p-1'>{item.totalAmount}</td>
                        <td className='p-2 max-sm:p-1'>{item.totalCoins - item.unInsuredCoins}</td>
                        {/* <DropdownMyProfile setValue={setCoinDetailsFilterValue} insideTable={true} iconName='/icons/iconDotsVertical.svg' items={myProfileNftOrderDropDownItems} itemsInsideTable={['Claim Compensation']}/> */}
                      </tr>
                      <tr>
                        <td  className='h-6'></td>
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

export default MyWalletCoinUserZone