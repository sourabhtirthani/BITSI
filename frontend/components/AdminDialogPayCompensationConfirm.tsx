import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogClose,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { revalidatePath } from "next/cache"
 
export function AdminDialogPayCompensationConfirm({amount , userAddress} : {amount : number , userAddress : string}) {
    const handleClick = async()=>{
        return new Promise(resolve => setTimeout(resolve, 10000));
    }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-success-511 text-[15px] font-bold font-manrope max-sm:text-[12px] max-sm:p-0.5">Compensate</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-sm:max-w-[320px] bg-white">
        <DialogHeader>
          <DialogTitle>Compensation</DialogTitle>
        </DialogHeader>
          <DialogDescription className="overflow-x-auto ">
            You are about to pay compensation of {amount} to the user {userAddress}
          </DialogDescription>
        <DialogFooter>
        <DialogClose asChild>
            <div className="flex gap-6 text-[20px]  text-black font-bold font-manrope">
         <button onClick={handleClick} className="bg-success-531 px-8 rounded-xl">Pay</button>
         <button className="bg-success-530 px-8 rounded-xl">Decline</button>
            </div>
            </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}