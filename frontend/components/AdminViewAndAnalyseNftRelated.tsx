'use client'
import { tableAdminViewAndAnalysis } from '@/constants'
import {  Nfts } from '@/types'
import React, { useEffect, useState } from 'react'
import LoaderComp from './LoaderComp'
import { useAccount } from 'wagmi'
import { toast } from './ui/use-toast'
import { DialogUserZoneProtection } from './DialogUserZoneProtection'

const AdminViewAndAnalyseNftRelated = ({searchValue} : {searchValue : string}) => {
    const [loaderInitial , setLoaderInitial] = useState(true);
    const {address} = useAccount();
    const [nfts , setNFts] = useState<Nfts[]>([])
    const [filteredNft ,setFilteredNft] = useState<Nfts[]>([]);
    const [refresh , setRefresh] = useState(false);
    useEffect(()=>{
        const getAllNFtEvents = async()=>{
            try{
              if(address){
                const response = await fetch(`/api/admin/nfts/${address}`, { method: "GET", next: { revalidate: 0 }, },)
                const responseOfnfts = await response.json();
                console.log(responseOfnfts)
                setNFts(responseOfnfts);
               setFilteredNft(responseOfnfts);
              }else{
                setNFts([]);
               setFilteredNft([]);
                toast({ title: "Walllet not connected", description: "Please connect wallet to see nfts", duration: 2000,
                  style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},
                });
              }
            }catch(error){
                console.log('in here in the error clasue')
                
            }finally{
                setLoaderInitial(false);
            }
        }
        getAllNFtEvents();
    }, [refresh , address])
    useEffect(()=>{
        if(searchValue == ''){
            setFilteredNft(nfts)
        }else{
            const filteredNfts = nfts.filter(event =>
                event.nft_name.toLowerCase().includes(searchValue.toLowerCase())
              );
              setFilteredNft(filteredNfts)
        }
    } , [searchValue])
  return (
    
     <div className='max-h-[500px]  px-8 max-md:px-4 overflow-x-scroll max-xl:table-body xl:scrollbar-none overflow-y-auto  table-body'>
            <table className='w-full text-left mt-4  border-spacing-20'>
              <thead className='text-success-502  bg-success-511 font-semibold font-manrope text-[22px] max-sm:text-[10px]   '>
                <tr>
                  <th className='p-2 max-sm:p-1'>Date</th>
                  <th className='p-2 max-sm:p-1' >NFTID</th>
                  <th className='p-2 max-sm:p-1'>Name</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Collection</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Price</th>
                  <th className='p-2 max-sm:p-1 overflow-hidden'>Burn NFt</th>
                </tr>
              </thead>
              <tbody className='overflow-y-auto '>
                {loaderInitial == false && Array.isArray(filteredNft) &&  filteredNft.map((item, index) => {
                  return (
                    <React.Fragment key={index}>
                      <tr className=' w-full text-white font-montserrat text-[12px] max-sm:text-[8px] font-semibold'>
                        <td className='p-2 max-sm:p-1'>{new Date(item.nft_mint_time).toDateString()}</td>
                        <td className='p-2 max-sm:p-1'>{item.id}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_name}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_collection_name}</td>
                        <td className='p-2 max-sm:p-1'>{item.nft_price} ETH</td>
                        <td className='p-2 max-sm:p-1'><DialogUserZoneProtection buttonText='Burn NFT' action='burnNft' setRefresh={setRefresh} assetId={item.id} assetName={item.nft_name} /></td>
                      </tr>
                      <tr>
                        <td  className='h-4'></td>
                      </tr>
                    </React.Fragment>
                  )
                })}
              </tbody>

            </table>
            {loaderInitial == true && <LoaderComp />}
          </div>
          
  )
}

export default AdminViewAndAnalyseNftRelated