import type { Metadata } from "next";
import { Inter, Poppins, Manrope, Montserrat, Moon_Dance , Mulish , Poller_One } from "next/font/google";
import "./globals.css";


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


export const metadata: Metadata = {
  title: "BITSI",
  description: "NFT MarketPlace",
  icons:{
    icon:'/icons/bitsi.svg'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppinss.variable} ${manrope.variable} ${montserratt.variable} ${moonDance.variable} ${mulish.variable} ${pollerOne.variable}`}>
        
        {children}
        
        </body>
    </html>
  );
}
