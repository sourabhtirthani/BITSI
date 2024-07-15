"use client";

import Link from "next/link";

// import { Button } from "./ui/button";

import { useSDK, MetaMaskProvider } from "@metamask/sdk-react";
import { formatAddress } from "../lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import Image from "next/image";

export const ConnectWalletButton = () => {
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  return (
    <div className="relative">
      {connected ? (
        <Popover>
          <PopoverTrigger>
            {/* <button className="bg-white text-black px-4 py-2 xl:mr-6 rounded-full flex items-center max-md:mr-2 hover:bg-black duration-300 hover:text-white">
                {formatAddress(account)}
                </button> */}
                <button  className="bg-white text-black px-4 py-2 xl:mr-6 rounded-full flex items-center max-md:mr-2 hover:bg-black duration-300">
        <span className='text-yellow-500 bg-curent flex items-center gap-1 '>
          <Image src = '/icons/wallet.svg' alt = 'wallet' height={34} width={34} className='max-md:h-[20px] max-md:w-[20px]' />
          {formatAddress(account)}</span>
      </button>
          </PopoverTrigger>
          <PopoverContent className="w-fit py-0 hover:bg-black rounded-2xl bg-gray-100 border  shadow-lg right-0 z-10 top-10 ">
            <button
              onClick={disconnect}
              className="block w-full p-2 text-left font-manrope text-[#F05252] "
            >
              Disconnect
            </button>
          </PopoverContent>
        </Popover>
      ) : (
        // <button disabled={connecting} onClick={connect}>
        //   <WalletIcon className="mr-2 h-4 w-4" /> Connect Wallet
        // </button>
        <button disabled={connecting} onClick={connect} className="bg-white text-black px-4 py-2 xl:mr-6 rounded-full flex items-center max-md:mr-2 hover:bg-black duration-300">
        <span className='text-yellow-500 bg-curent flex items-center gap-1 '>
          <Image src = '/icons/wallet.svg' alt = 'wallet' height={34} width={34} className='max-md:h-[20px] max-md:w-[20px]' />
          Wallet</span>
      </button>
      )}
    </div>
  );
};