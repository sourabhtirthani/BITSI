// import React from 'react';
// import dynamic from 'next/dynamic';

// const MoonPayProvider = dynamic(
//   () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayProvider),
//   { ssr: false },
// );

// const MoonPayBuyWidget = dynamic(
//   () => import('@moonpay/moonpay-react').then((mod) => mod.MoonPayBuyWidget),
//   { ssr: false },
// );
// import { contractAddress } from '@/lib/contract';
// interface MoonPayCheckoutProps {
//   tokenId: string;
// }

// const MoonPayBuyNft: React.FC<MoonPayCheckoutProps> = ({  tokenId }) => {
//   return (
//     <>
//     <p>MoonPay Test Page</p>
//     <MoonPayBuyWidget
//       variant="overlay"
//       baseCurrencyCode="usd"
//       baseCurrencyAmount="100"
//       defaultCurrencyCode="eth"
//       visible={true}
//     />
//     </>
//   );
// };

// export default MoonPayBuyNft;