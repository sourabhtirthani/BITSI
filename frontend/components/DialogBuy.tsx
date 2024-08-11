'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { buyNftDialogProps } from "@/types"
import Checkbox from "./Checkbox1"
import Link from "next/link"
import Image from 'next/image'
import { useState } from "react"
import { useAccount, useWriteContract, useBalance } from "wagmi"
import { useToast } from "@/components/ui/use-toast"
import { buyNft } from "@/actions/uploadNft"
import { useRouter } from 'next/navigation';
import { contractABI, contractAddress } from "@/lib/contract"
// import { InjectedConnector } from '@web3modal/wagmi';

export function DialogBuy({ totalItems, ownerAddress, lstOfItems, buttonName, showSelectedItem, nameOfClass, currencyText, pricesArray, nameOfNft, imgSrc, collectionName, nftPrice }: buyNftDialogProps) {
  // console.log(lstOfItems)
  // const numbersArray = lstOfItems.map(item => Number(item));
  // console.log(numbersArray);
  // const numberArray: number[] = stringArray.map(Number);
  const { address, isConnected } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { data: balance} = useBalance({address : address});
  const { push } = useRouter();
  const { writeContractAsync } = useWriteContract()

  const handleBuyClick = async () => {
    try{
    // console.log(lstOfItems)
    setIsLoading(true);
    if (isConnected) {
      if (address as string == ownerAddress) {
        console.log(lstOfItems)
        toast({
          title: "You already own that nft", description: 'You cannot buy your own NFT', duration: 2000,
          style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
        })
        setIsLoading(false);
        return;
      } else {
        let idOfNftsArr: number[] = [];
        let arrOfPrice : number[] = [];
        // for (let i = 0; i < lstOfItems.length; i++) {
        //   idOfNftsArr.push(Number(lstOfItems[i]));
        // }
        if(nftPrice){  // this is for single nft purchase 
          const priceInWei = Number(Math.floor(parseFloat(nftPrice) * 10 ** 18));
          arrOfPrice.push(priceInWei)
          // console.log('the lenth of lst of itmes is ', lstOfItems.length);
          // console.log(arrOfPrice)
          idOfNftsArr.push(Number(lstOfItems[0]))
          // console.log(idOfNftsArr)
          let sum  = 0  ;
          for(let i = 0; i< arrOfPrice.length ; i++){
            sum = sum + arrOfPrice[i];
          }
          const transaction = await writeContractAsync({
            address: contractAddress,
            abi: contractABI,
            functionName: 'buyNFT',
            args: [idOfNftsArr, arrOfPrice],
           
            value: BigInt(sum),
           
          });

          if(!transaction){
            toast({
              title: "Transaction Failed", description: 'Please Try again.', duration: 2000,
              style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
            })
            setIsLoading(false);
            return;
          }
        }else{
          if(pricesArray!= null){
          let sum  = 0  ;
          for(let i = 0; i< pricesArray.length ; i++){
            sum = sum + pricesArray[i];
          
          }
          // if(pricesArray!= null){

          // }
          idOfNftsArr = lstOfItems.map(item => Number(item))   
          console.log(lstOfItems)
          console.log(pricesArray)

          const transaction = await writeContractAsync({
            address: contractAddress,
            abi: contractABI,
            functionName: 'buyNFT',
            args: [lstOfItems, pricesArray], 
            value : BigInt(sum)
          });
          
          if(!transaction){
            toast({
              title: "Transaction Failed", description: 'Please Try again.', duration: 2000,
              style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
            })
            setIsLoading(false);
            return;
          }
        }
        }
        console.log(`all the ids here are`)
        console.log(idOfNftsArr)
        const purchaseNftAction = await buyNft(address as string , idOfNftsArr);
        if(purchaseNftAction.success){
          toast({title: "Operation Success",description: "You have successfully bought the nfts.",duration: 2000,
            style: {backgroundColor: '#4CAF50',color: 'white',fontFamily: 'Manrope',}})
          setIsLoading(false);
          push('/');
        }
      }
    } else {
      toast({
        title: "Please Connect Wallet To continue", description: 'You cannot buy your own NFT', duration: 2000,
        style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
      })
      setIsLoading(false);
      return;
    }
  }catch(error){
    console.log(error);
    setIsLoading(false);
    toast({
      title: "Error Buying Nfts", description: 'error occured while buying NFT', duration: 2000,
      style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }
    })
  }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className={nameOfClass}>{buttonName}</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[370px] bg-white ">
        <DialogHeader>
          <DialogTitle className="text-black font-montserrat  font-bold">Checkout</DialogTitle>
          <DialogDescription className="flex flex-col gap-3">
            {!showSelectedItem && (<><p className="font-semibold text-black font-montserrat ">Total NFTs - {totalItems}</p> </>)}
            {showSelectedItem && (<>
              <p className="font-semibold text-black font-montserrat ">Selected Item:</p>
              <div className="flex items-center p-3 border-2 border-success-511 gap-3">
                <Image src={imgSrc || ''} height={63.48} width={70} alt="nft image" className="w-[70px] h-[65px]" />
                <div className="flex flex-col gap-2 overflow-clip">
                  <p className="text-black font-manrope font-bold text-[22px]">{nameOfNft}</p>
                  <div className="flex">
                    {/* <p className="text-black text-[12px] font-montserrat font-semibold">Royality&nbsp;</p>
                    <p className=" bg-nft-text-gradient bg-clip-text text-transparent text-[12px] font-montserrat font-semibold">{royalty}%&nbsp;</p> */}
                    <p className="text-black text-[12px] font-montserrat font-semibold">Collection&nbsp;</p>
                    <p className="bg-nft-text-gradient bg-clip-text text-transparent text-nft-text-gradient text-[12px] font-montserrat font-semibold">{collectionName && collectionName?.length > 7 ? `${collectionName?.slice(0, 7)}...` : `${collectionName}`}</p>
                  </div>
                </div>
              </div>
            </>
            )}
            {isConnected ? <>
              <div className="flex items-center gap-2 ">
                <Checkbox className=" bg-success-521 checked:bg-success-521 " />
                <p className="font-mulish text-[10px]">I agree to the <Link href='/abcdr'><span className="underline text-success-522 font-bold">INSURANCE</span></Link></p>
              </div>

              <div className="flex flex-col border-2 border-success-511 p-4 gap-5">
                <div className="flex justify-between">
                  <p className="text-black font-montserrat font-semibold">Your&nbsp;Balance</p>
                  <p className="text-black font-montserrat font-semibold">{balance ? `${balance.formatted.slice(0,4)} ${balance.symbol}` : 'N/A'}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-black font-montserrat font-semibold">NFT Price</p>
                  <p className="text-black font-montserrat font-semibold">{nftPrice} {currencyText}</p>
                </div>
                {/* <div className="flex justify-between">
                  <p className="text-black font-montserrat font-semibold">Insurance Price</p>
                  <p className="text-black font-montserrat font-semibold">1.02 {currencyText}</p>
                </div> */}
                {/* <div className="flex justify-between">
                  <p className="text-black font-montserrat font-semibold">Total Price</p>
                  <p className="text-black font-montserrat font-semibold">1.11 {currencyText}</p>
                </div> */}
                {address === ownerAddress ?  (<div className="w-full  font-montserrat flex justify-center bg-red-500 text-white font-bold py-4 rounded-xl">Owned</div>)
                  :
                  (<div className="self-center w-full">
                    <button onClick={handleBuyClick} disabled={isLoading} className={`${isLoading ? 'bg-gray-300 ' : 'bg-nft-text-gradient '} font-montserrat w-full flex justify-center text-white font bold  py-4  text-[22px] font-bold rounded-xl `}>{isLoading ? <div className="spinner mr-2 "></div> : 'Buy'}</button>
                  </div>)}
              </div> </> :
              <div className="bg-red-500 text-white w-full py-4 font-montserrat flex justify-center ofnt-bold rounded-xl cursor-pointer font-bold">Wallet Not Connected</div>
            }
          </DialogDescription>
        </DialogHeader>

      </DialogContent>
    </Dialog>
  )
}