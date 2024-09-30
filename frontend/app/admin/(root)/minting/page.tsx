// 'use client'
// import React, { useState } from 'react'
// import Image from 'next/image'
// import { tableAdminWallets } from '@/constants';
// const Minting = () => {
//     const [coinValue , setCoinValue] = useState(1);

//     const onPlusClick = ()=>{
//         setCoinValue(coinValue+1);
//     }
//     const onSubtractClick = ()=>{
//         if(coinValue <= 1){
//             return;
//         }
//         setCoinValue(coinValue -1);

//     }

//     return (
//         <div className='p-8 max-md:p-4 w-full'>
//         <div className='flex justify-between mb-14 max-md:mb-7 items-center'>
//             <p className='font-manrope font-bold text-[18px] text-success-511'>MINTING </p>
//             <button className='bg-white rounded-3xl font-bold text-[20px] px-5 py-2 font-manrope text-success-511 '>Connect</button>
//         </div>
//         {/* <div className='flex flex-col mt-4 gap-10 w-1/4'> */}
//         <div className='max-h-[500px] w-3/4  px-8 max-md:px-4  max-xl:table-body mb-20 table-body'>
//         <table className='w-full text-left mt-4 border-spacing-20'>
//           <thead className='text-black text-center bg-white font-semibold font-manrope text-[22px] max-sm:text-[10px]   '>
//             <tr>
//               <th className='p-2 max-sm:p-1'>Wallet Id</th>
//               <th className='p-2 max-sm:p-1' >Wallet Type</th>
//               <th className='p-2 max-sm:p-1'></th>
//             </tr>
//           </thead>
//           <tbody className='overflow-y-auto '>
           
//             {tableAdminWallets.map((item, index) => {
//               return (
//                 <React.Fragment key={index}>
                    
//                   <tr className=' w-full  text-white text-center font-montserrat text-[18px] max-sm:text-[8px] font-semibold'>
//                     <td className='p-2 max-sm:p-1 border-2 border-gray-600'>{item.walletId}</td>
//                     <td className='p-2 max-sm:p-1 border-2 border-r-0  border-gray-600'>{item.walletType}</td>
//                     <td className='p-2 max-sm:p-1 border-2 border-l-0 border-gray-600'><Image src = '/icons/mdi_delete-circle.svg' height={24} width={24} alt='delete'  /></td>
//                   </tr>
//                   {/* <tr>
//                     <td  className='h-4 '></td>
//                   </tr> */}
                  
//                 </React.Fragment>
//               )
//             })}
//             <tr >
//                 <td></td>
//                 <td ></td>
//             </tr>
//           </tbody>

//         </table>
//       </div>
//         </div>
//         // </div>
//     )
// }

// export default Minting


// {/* <div className='flex flex-col gap-12 p-10 '>
//             <h1 className='text-success-511 text-[18px] '>Minting</h1>
//             <div className='flex flex-col gap-4 '>
//                 <p className='text-white text-[16px] underline font-manrope font-semibold'>Introducing Mint NFT to Wallet</p>
//                 <p className='text-white font-manrope text-[16px] font-normal'>Minting an NFT (Non-Fungible Token) involves creating a unique digital asset on the blockchain. BITSI&apos;s platform provides an easy way to mint NFTs directly to your wallet. Follow these steps to mint an NFT on the BITSI website.</p>
//                 <button className='bg-white px-20 py-2 w-fit font-bold font-manrope'>Mint Now</button>
//             </div>

//             <div className='flex flex-col gap-4 '>
//                 <p className='text-white text-[16px] underline font-manrope font-semibold'>Introducing Mint Coin to Wallet</p>
//                 <p className='text-white font-manrope text-[16px] font-normal'>Minting an Coin involves creating a unique digital asset on the blockchain. BITSI&apos;s platform provides an easy way to mint Coin directly to your wallet.</p>
//                 <button className='bg-white px-20 py-2 w-fit font-bold font-manrope'>Mint Now</button>
//             </div>
//             <h1 className='text-success-511 text-[18px]'>Manage Wallets</h1>
//             {/* <div>table for wallets</div> */}

//             // <div className='flex flex-col gap-4 '>
//             //     <p className='text-white text-[16px] underline font-manrope font-semibold'>Mint NFt to Wallet</p>
//             //     <div className='flex max-lg:flex-col gap-10 '>
                
//             //         <button className='bg-white xl:w-[234px] px-1 max-xl:px-10 flex items-center py-2 justify-center gap-1 font-bold font-manrope'>Upload Nft <Image src='/icons/upload-icon.svg' height={24} width={24} alt='upload' /></button>
//             //         <button className='bg-white xl:w-[234px] px-1 max-xl:px-10  py-2 flex gap-1 justify-center font-bold font-manrope'>Upload Collection <span><Image src='/icons/upload-icon.svg' height={24} width={24} alt='upload' /></span></button>
//             //         <button className='bg-success-511 xl:w-[234px] max-xl:px-10 px-1   py-2 text-black font-manrope font-bold rounded-3xl'>Mint</button>

//             //     </div>
//             // </div>

//             // <div className='flex flex-col gap-4 '>
//             // <p className='text-white text-[16px] underline font-manrope font-semibold'>Mint Coin to Wallet</p>
//             // <p className='text-white text-[16px]  font-manrope font-semibold text-opacity-40'>Choose how many coins you want to mint to your wallet</p>
//             // <div className='flex max-md:flex-col max-md:items-center lg:gap-10 gap-4'>
//             // <div className='flex items-center justify-between bg-white w-fit max-sm:gap-24 gap-52  p-2'>
//             //     <div className='flex justify-between items-center '>
//             //         <div className='flex items-center '>
//             //             <Image src='/icons/bitsi.svg' height={79.05} width={80} alt='bitsi logo' />
//             //             <p className='font-manrope text-black text-[22px] max-sm:text-[16px] font-bold'>BITSI&nbsp;Coin</p>
//             //         </div>
//             //         </div>
                    
//             //         <div className='flex items-center justify-center px-2'>
//             //             <p onClick={onPlusClick} className='text-black cursor-pointer font-black text-[30px] selection:bg-white'>+</p>
//             //             <div className='bg-black w-[30px] h-[35px] flex justify-center items-center'><p className='text-[22px] text-white font-manrope font-bold'>{coinValue}</p></div>
//             //             <p onClick={onSubtractClick} className='text-black cursor-pointer font-black text-[30px] selection:bg-white'>-</p>
//             //         </div> 
//             // </div>
//             // <div className='flex items-center w-full'>
//             // <button className='bg-success-511 xl:w-[234px] max-xl:px-10 px-1 py-2 max-md:w-full  text-black font-manrope font-bold rounded-3xl'>Mint</button>
//             // </div>
//             // </div>
//             // </div>
//         // </div> */}