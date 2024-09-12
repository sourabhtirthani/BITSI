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
import { createAdminWalletType } from "@/actions/uploadNft"
import { useAccount, useWriteContract } from "wagmi"
import { readAddressFromContract } from "@/lib/contractRead"
import { contractABI, contractAddress } from "@/lib/contract"
import { getTransactionFromHash } from "@/lib/getTransactionFromHash"

export function DialogAdminWalletAdd({ setRefresh }: { setRefresh: React.Dispatch<React.SetStateAction<boolean>> }) {
    const { writeContractAsync } = useWriteContract()

    const { address, isConnected } = useAccount();
    const { toast } = useToast();
    const [open, setOpen] = useState(false);
    const [loaderForSubmitButton, setLoaderForSubmitButton] = useState(false);
    const [selectedOption, setSelectedOption] = useState("")
    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        try {
            setLoaderForSubmitButton(true);
            event.preventDefault();
            if (!isConnected) {
                toast({ title: "Connect wallet", description: 'Please connect wallet in order to continue', duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, });
                setOpen(false);
                setLoaderForSubmitButton(false);
                return;
            }
            const formData = new FormData(event.currentTarget);
            const addressWallet = formData.get("address") as string;
            const walletType = formData.get("walletType") as string;
            const checkedMainWallet = formData.get("mainWallet") as string;
            if(!addressWallet || !walletType){
                toast({ title: "Incomplete details", description: 'Please fill in all the details to conitnue', duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, });
                setLoaderForSubmitButton(false);
                return;
            }

            if (checkedMainWallet) {
                if (walletType == "COMPENSATION") {
                    const ownerWalletAddress = await readAddressFromContract("ownerWallet");
                    const transaction = await writeContractAsync({
                        address: contractAddress,
                        abi: contractABI,
                        functionName: 'setCompensationWallet',
                        args: [addressWallet, ownerWalletAddress],
                      });
                      await getTransactionFromHash(transaction);

                } else if (walletType == "OWNER") {
                    const compensationWalletAddress = await readAddressFromContract("compensationWallet")
                    const transaction = await writeContractAsync({
                        address: contractAddress,
                        abi: contractABI,
                        functionName: 'setCompensationWallet',
                        args: [compensationWalletAddress, addressWallet],
                      });
                      await getTransactionFromHash(transaction);
                }
            }
            const updateDbWithWallets = await createAdminWalletType(addressWallet, walletType);
            setRefresh(prev => !prev);
            setOpen(false)
            toast({ title: "Operation Success", description: "Successfully added new Wallet", duration: 2000, style: { backgroundColor: '#4CAF50', color: 'white', fontFamily: 'Manrope', } });
        } catch (error) {
            console.log(error)
            toast({ title: "Operation Failed", description: 'Error Adding new Wallet ', duration: 2000, style: { backgroundColor: '#900808', color: 'white', fontFamily: 'Manrope', }, });
        } finally {
            setLoaderForSubmitButton(false);
        }
    };
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild >
                <button className='text-success-511 hover:underline w-fit cursor-pointer justify-end items-end font-semibold font-manrope text-12px'>+ Add new</button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader>
                    <DialogTitle className="font-manrope">Add new Wallet</DialogTitle>

                </DialogHeader>
                <form onSubmit={handleFormSubmit}>
                    <div className="grid gap-4 py-4 font-manrope font-bold">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Wallet Address" className="text-right font-manrope font-bold">
                                Wallet Address
                            </Label>
                            <Input
                                id="address"
                                name="address"
                                required
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="Wallet Type" className="text-right font-manrope font-bold">
                                Wallet Type
                            </Label>
                            <div className="col-span-3">
                                <DropdownAdminWalletsType selectedOption={selectedOption} setSelectedOption={setSelectedOption} /></div>
                            <input
                                value={selectedOption}
                                required
                                hidden
                                id="walletType"
                                name="walletType"
                                className="col-span-3 "
                            />
                        </div>
                        {(selectedOption == "COMPENSATION" || selectedOption == "OWNER") &&
                            <div className="flex gap-2 -mt-3 items-center justify-end">
                                <input type="checkbox" id="mainWallet" name="mainWallet" ></input>
                                <p className="text-[16px]">Main&nbsp;Wallet</p>
                            </div>}
                    </div>
                    <DialogFooter>
                        {loaderForSubmitButton ? <p className=" bg-gray-400 font-manrope text-center w-[150px] text-black font-bold black-border p-2">Loading....</p> :
                            <button type="submit" className="font-manrope w-[150px] text-black font-bold black-border p-2">Save&nbsp;Changes</button>}
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
