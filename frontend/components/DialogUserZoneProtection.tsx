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
import { extendInsurance, purchaseInsurance, upgradeInsurace } from "@/actions/uploadNft"

export function DialogUserZoneProtection({ setRefresh , assetId , assetName, action }: { setRefresh: React.Dispatch<React.SetStateAction<boolean>> , assetId:number , assetName : string, action : string }) {
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

    return (
        <Dialog open={open} onOpenChange={setOpen} >
            <DialogTrigger asChild >
                <button className='text-success-511 max-sm:text-[12px] hover:underline w-fit cursor-pointer px-4 font-semibold font-manrope text-[16px]'>Buy Policy</button>
            </DialogTrigger>
            {action =='extend' && <>
            <DialogContent className="sm:max-w-[425px]  bg-white font-mulish font-bold">
                <DialogHeader>
                    <DialogTitle className="font-manrope">Extend Insurance Policy</DialogTitle>
                </DialogHeader>
                <DialogDescription>Extending a new insurance policy will result in the addition of insurance coverage for up to 12 months.</DialogDescription>
                <DialogDescription>Do you wish to extend insurance policy for {assetName} - ({assetId})?</DialogDescription>
                <DialogFooter>
            <div className="flex gap-6 text-[20px]  text-black font-bold ">
         <button onClick={handleExtendInsuracePolicy} className={`${loaderBuy == true ? 'disabled: bg-gray-400' : 'bg-success-531'}  w-[110px] rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Buy'}</button>
         <button onClick={handleDecline}  className="bg-success-530 px-8 rounded-xl">Cancel</button>
           
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
                <DialogDescription>Do you wish to purchase insurance policy for {assetName} - ({assetId})?</DialogDescription>
                <DialogFooter>
            <div className="flex gap-6 text-[20px]  text-black font-bold ">
         <button onClick={handleBuyInsurancePolicy} className={`${loaderBuy == true ? 'disabled: bg-gray-400' : 'bg-success-531'}  w-[110px] rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Buy'}</button>
         <button onClick={handleDecline}  className="bg-success-530 px-8 rounded-xl">Cancel</button>
           
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
                <DialogDescription>Do you wish to purchase coverage policy for {assetName} - ({assetId})?</DialogDescription>
                <DialogFooter>
            <div className="flex gap-6 text-[20px]  text-black font-bold ">
         <button onClick={handleBuyUpgrade} className={`${loaderBuy == true ? 'disabled: bg-gray-400' : 'bg-success-531'}  w-[110px] rounded-xl`}>{loaderBuy == true ? 'Loading..' : 'Buy'}</button>
         <button onClick={handleDecline}  className="bg-success-530 px-8 rounded-xl">Cancel</button>
           
            </div>
        </DialogFooter>
            </DialogContent>
            </>}
        </Dialog>
    )
}
