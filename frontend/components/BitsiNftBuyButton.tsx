// import React from 'react'

// const BitsiNftBuyButton = ({checkedItems} : {checkedItems :string[]}) => {
//     const handleButtonClick = () => {
//         console.log(checkedItems)
        
//         if(checkedItems.length == 0){
//           toast({
//             title: "Selection Required",
//             description: "Please select the NFTs you wish to purchase or click directly on the desired NFT.",
//             duration : 2000,
//             style: {
//               backgroundColor: '#900808',
//               color : 'white',
//               fontFamily: 'Manrope',
//             },
//           })
//           return;
//         }else if(checkedItems.length != 0){
//         const queryString = generateQueryString(checkedItems)
//         console.log(queryString)
//         router.push(`/bitsi-nft/buy-collection?${queryString}`);
//         }
//       };
//   return (
//     <button onClick={handleButtonClick}   className='bg-success-513 font-bold rounded-3xl p-2 text-white font-manrope px-8 text-lg disabled:bg-slate-600'> Buy Selected Items</button>
//   )
// }

// export default BitsiNftBuyButton