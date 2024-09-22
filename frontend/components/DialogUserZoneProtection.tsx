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

import {  useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { useAccount, useWriteContract } from "wagmi"
import { readAddressFromContract } from "@/lib/contractRead"
import { contractABI, contractAddress } from "@/lib/contract"
import { getTransactionFromHash } from "@/lib/getTransactionFromHash"
import { burnNft, extendInsurance, generateCompensation1, purchaseInsurance, upgradeInsurace } from "@/actions/uploadNft"
import { DialogUserZoneProtectionProps } from "@/types"

// this dialog is also used in admin panel(view and analyse last column) and everywhere in my protection(when button at last column is clicked)
export function DialogUserZoneProtection({ setRefresh , assetId , assetName, action , buttonText , insuranceId, lossAmount , soldValue , eventId }:  DialogUserZoneProtectionProps ) {
    const { writeContractAsync } = useWriteContract()
    const { address, isConnected } = useAccount();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loaderBuy , setLoaderBuy] = useState(false);
    const handleDecline = ()=>{
        setOpen(false)
    }

    const handleBuyInsurancePolicy = async()=>{
        try{
            setLoaderBuy(true);
            const purchaseInsurace = await purchaseInsurance(assetId);
            toast({ title: "Operation Success", description: "Successfully Purchased Policy", duration: 2000,style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope',},});
          setRefresh(prev => !prev);
        }catch(error){
            toast({ title: "Error", description: "Error Purchasing Insurance", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
            console.log(error);
        }finally{
            setLoaderBuy(false);
            setOpen(false);
        }
    }

    const handleExtendInsuracePolicy =async ()=>{
        try{    
            setLoaderBuy(true);
            const res = await extendInsurance(assetId)
            toast({ title: "Operation Success", description: "Successfully Extended Policy", duration: 2000,style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope',},});
            setRefresh(prev => !prev);
        }catch(error){
            toast({ title: "Error", description: "Error Purchasing Insurance", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
            console.log(error);
        }finally{
            setLoaderBuy(false);
            setOpen(false);
        }
    }


    const handleBuyUpgrade = async()=>{
        try{
            setLoaderBuy(true);
            const res = await upgradeInsurace(assetId);
            toast({ title: "Operation Success", description: "Successfully Upgraded Policy", duration: 2000,style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope',},});
            setRefresh(prev => !prev);
        }catch(error){
            console.log(error);
            toast({ title: "Error", description: "Error Upgrading Insurace", duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
            console.log(error);
        }finally{
            setLoaderBuy(false);
            setOpen(false);
        }
    }

    const handleClaimInsurancePolicy = async()=>{
        try{
            setLoaderBuy(true);
            if(soldValue && insuranceId && lossAmount && address && eventId){
                // console.log(`the price at which this was sold at was ${soldValue} and the insurance id is : ${insuranceId} and the loss that occured is 
                //     ${lossAmount} and the nft name is : ${assetName} and the asset id : ${assetId}`)
                    const res = await generateCompensation1(address as string , assetId , lossAmount, soldValue, insuranceId , eventId);
                    if('error' in res){
                        toast({title: "Error occured", description: res.error, duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},})
                        }
                        else{
                      toast({title: "Operation Success",description: "Please wait for us to view your request.",duration: 2000,style: {backgroundColor: '#4CAF50',color: 'white',fontFamily: 'Manrope',},});
                      setRefresh(prev => !prev);
                    }
            }
        }catch(error){
            toast({title: "Error occured", description: 'Internal server error', duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},});
            console.log(error)
        }finally{
            setLoaderBuy(false);
            setOpen(false);
        }
    }

    const handleBurnNft = async()=>{
        try{
            setLoaderBuy(true);
            const transactionBurnNft = await writeContractAsync({
                address: contractAddress,
                abi: contractABI,
                functionName: 'burnNfts',
                args: [assetId],
            });
            await getTransactionFromHash(transactionBurnNft);
            if(transactionBurnNft){
            const res = await burnNft(assetId);
            toast({title: "Operation Success",description: "Successfully burned NFT",duration: 2000,style: {backgroundColor: '#4CAF50',color: 'white',fontFamily: 'Manrope',},});
            setRefresh(prev => !prev);
            }
        }catch(error){
            toast({title: "Error occured", description: 'Internal server error', duration: 2000,style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope',},});
            console.log(error)
        }finally{
            setLoaderBuy(false);
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild >
                <button className='text-success-511 max-sm:text-[12px] hover:underline w-fit cursor-pointer px-4 font-semibold font-manrope text-[16px]'>{buttonText}</button>
            </DialogTrigger>
            {action =='extend' && <>
            <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                <DialogHeader>
                    <DialogTitle className="font-manrope">Extend Insurance Policy</DialogTitle>
                </DialogHeader>
                <DialogDescription>Extending a new insurance policy will result in the addition of insurance coverage for up to 12 months.</DialogDescription>
                <DialogDescription>Do you wish to extend {assetName} - ({assetId}) insurance policy?</DialogDescription>
                <DialogFooter>
            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
         <button onClick={handleExtendInsuracePolicy} disabled = {loaderBuy} className={`${loaderBuy == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1 w-[110px] rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Buy'}</button>
         <button onClick={handleDecline}  className="bg-red-500 px-8 text-white rounded-xl py-1">Cancel</button>
           
            </div>
        </DialogFooter>
            </DialogContent>
            </>}

            {action =='purchase' && <>
            <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                <DialogHeader>
                    <DialogTitle className="font-manrope">Purchase Insurance Policy</DialogTitle>
                </DialogHeader>
                <DialogDescription>Purchasing a new insurance policy will result in the addition of insurance coverage for up to 2 years.</DialogDescription>
                <DialogDescription>Do you wish to purchase {assetName} - ({assetId}) insurance policy?</DialogDescription>
                <DialogFooter>
            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
         <button onClick={handleBuyInsurancePolicy} disabled = {loaderBuy} className={`${loaderBuy == true ? 'text-black bg-gray-400' : 'bg-green-600 text-white'} py-1  w-[110px] rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Buy'}</button>
         <button onClick={handleDecline}  className="bg-red-500 py-1 px-8 text-white rounded-xl">Cancel</button>
           
            </div>
        </DialogFooter>
            </DialogContent>
            </>}

            {action =='upgrade' && <>
            <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                <DialogHeader>
                    <DialogTitle className="font-manrope">Upgrade Insurance Policy</DialogTitle>
                </DialogHeader>
                <DialogDescription>Upgrading the insurance policy will result in the asset&apos;s coverage being set to 100%</DialogDescription>
                <DialogDescription>Do you wish to purchase {assetName} - ({assetId}) coverage policy?</DialogDescription>
                <DialogFooter>
            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
         <button onClick={handleBuyUpgrade} disabled = {loaderBuy} className={`${loaderBuy == true ? ' text-black disabled: bg-gray-400' : 'bg-green-600 text-white'}  w-[110px] py-1 rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Buy'}</button>
         <button onClick={handleDecline}  className="bg-red-500 px-8 py-1 text-white rounded-xl">Cancel</button>
           
            </div>
        </DialogFooter>
            </DialogContent>
            </>}

            {action =='claim' && <>
            <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                <DialogHeader>
                    <DialogTitle className="font-manrope">Claim Insurance</DialogTitle>
                </DialogHeader>
                <DialogDescription>Claiming the insurance policy will result in return of funds that were lost if approved</DialogDescription>
                <DialogDescription>Do you wish to claim {assetName} - ({assetId})?</DialogDescription>
                <DialogFooter>
            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
         <button onClick={handleClaimInsurancePolicy} disabled = {loaderBuy} className={`${loaderBuy == true ? ' text-black disabled: bg-gray-400' : 'bg-green-600 text-white'}  w-[110px] py-1 rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Claim'}</button>
         <button onClick={handleDecline}  className="bg-red-500 px-8 py-1 text-white rounded-xl">Cancel</button>
           
            </div>
        </DialogFooter>
            </DialogContent>
            </>}

            {action =='burnNft' && <>
            <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                <DialogHeader>
                    <DialogTitle className="font-manrope">BURN NFT</DialogTitle>
                </DialogHeader>
                <DialogDescription> By burning this NFT, the asset will be permanently removed</DialogDescription>
                <DialogDescription> Are you sure you want to proceed with burning : {assetName} (ID: {assetId})?</DialogDescription>
                <DialogFooter>
            <div className="flex gap-6 text-[20px]  text-black font-medium  ">
         <button onClick={handleBurnNft} disabled = {loaderBuy} className={`${loaderBuy == true ? ' text-black disabled: bg-gray-400' : 'bg-green-600 text-white'}  w-[110px] py-1 rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'BURN'}</button>
         <button onClick={handleDecline}  className="bg-red-500 px-8 py-1 text-white rounded-xl">Cancel</button>
           
            </div>
        </DialogFooter>
            </DialogContent>
            </>}
        </Dialog>
    )
}
