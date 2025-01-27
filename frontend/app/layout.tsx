import type { Metadata } from "next";
import { Inter, Poppins, Manrope, Montserrat, Moon_Dance , Mulish , Poller_One, Montaga } from "next/font/google";
import "./globals.css";
import { config } from '@/config'
import Web3ModalProvider from '@/context'
import { cookieToInitialState } from 'wagmi'
import { headers } from 'next/headers'
import NextTopLoader from 'nextjs-toploader';
import SignupPopup from "@/components/SignupPopup";

const inter = Inter({ subsets: ["latin"], variable : '--font-inter' });
const poppinss = Poppins({
  subsets : ["latin"],
  weight : ['400' , '700'],
  variable : '--font-poppins'
})
const manrope = Manrope({
  subsets : ["latin"],
  weight : ['400' , '700'],
  variable : '--font-manrope'
})
const montserratt = Montserrat({
  subsets : ["latin"],
  weight : ['400' , '700'],
  variable : '--font-montserrat'
})

const moonDance = Moon_Dance({
  subsets : ["latin"],
  weight : ['400'],
  variable : '--font-moon-dance'
})

const mulish = Mulish({
  subsets : ["latin"],
  weight : ['400'],
  variable : '--font-mulish'
})

const pollerOne = Poller_One({
  subsets : ["latin"],
  weight : ['400'],
  variable : '--font-poller-one'
})
const montaga = Montaga({
  subsets : ["latin"],
  weight : ['400'],
  variable : '--font-montaga'
})



export const metadata: Metadata = {
  title: "BITSI",
  description: "NFT MarketPlace",
  icons:{
    icon:'/icons/bitsi.svg'
  }
};
// export const dynamic = 'force-dynamic';  // this and next line is added to have no cache
// export const revalidate = 0;
// export const fetchCache = 'force-no-store';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(config, headers().get('cookie'))
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppinss.variable} ${manrope.variable} ${montserratt.variable} ${moonDance.variable} ${mulish.variable} ${pollerOne.variable} ${montaga.variable}`}>
      <NextTopLoader showSpinner = {false}   />
      <Web3ModalProvider initialState={initialState}>{children}
       
      </Web3ModalProvider>
        </body>
      {/* <Script defer src="https://app.fastbots.ai/embed.js" data-bot-id="clyzhodvg0gf6r9bcqn59tpxl"  ></Script> */}
    </html>
  );
}
