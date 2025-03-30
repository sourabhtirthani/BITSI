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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FormEventHandler, useState } from "react"
import { DropdownAdminWalletsType } from "./DropDownAdminWalletsType"
import { useToast } from "@/components/ui/use-toast"
import { createAdminWalletType, deleteAdminWalletsWithId } from "@/actions/uploadNft"
import Image from "next/image"

export function AdminDeleteSelectedWallet({setRefresh ,walletId} : {setRefresh : React.Dispatch<React.SetStateAction<boolean>> , walletId : number}) {
    const { toast } = useToast();
    const [open , setOpen] = useState(false);
    const [loaderForDeleteButton , setLoaderForDeleteButton] = useState(false);
    const [selectedOption ,setSelectedOption] = useState("")
    const handleDelete = async()=>{
        try{
            setLoaderForDeleteButton(true)
            await deleteAdminWalletsWithId(walletId);
            toast({ title: "Operation Success", description: "Successfully deleted Wallet", duration: 2000,
                style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope',},
              });
              setRefresh(prev => !prev);
              setOpen(false)
        }catch(error){
            toast({title: "Operation Failed",description:'Error deleting wallet ',duration: 2000,
                style: {backgroundColor: '#900808',color: 'white',fontFamily: 'Manrope',},});
        }finally{
            setLoaderForDeleteButton(false)
        }
    }
    return (
        <Dialog open = {open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="flex justify-center w-10 max-sm:w-fit">
            <Image src = '/icons/mdi_delete-circle.svg' height={24} width={24} alt='delete'  />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="font-manrope">DELELTE WALLET</DialogTitle>
                </DialogHeader>
                <DialogDescription className="text-black font-manrope font-semibold">
            Are you sure you want to delete wallet with ID ({walletId})
            </DialogDescription>
                <DialogFooter>
                    {loaderForDeleteButton ? <p className="font-manrope text-center w-[150px] text-black font-bold black-border p-2">Loading....</p> :
                    <button onClick={handleDelete} className="font-manrope w-[150px] text-black font-bold black-border p-2">YES</button>}
                    <button onClick={()=>{setOpen(false)}} className="font-manrope w-[150px] text-black font-bold black-border p-2">NO</button>
                </DialogFooter>
                
            </DialogContent>
        </Dialog>
    )
}
