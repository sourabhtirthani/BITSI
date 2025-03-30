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
 
export function AdminDialogImagesBulkNotUploaded({arrayOfNotUplaodedImageName} : {arrayOfNotUplaodedImageName : string[]}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="bg-success-511 rounded-xl font-bold px-4 py-1 text-white font-montserrat text-[20px]">View</button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[355px] max-sm:max-w-screen max-h-[250px] overflow-auto table-body bg-white">
       {arrayOfNotUplaodedImageName.map((item , index) =>{
        return (
            <div key={index} className="flex flex-col font-bold text-black font-montserrat text-[12px]">
                <p>{index+1}. {item}</p>
            </div>
        )
       })}
        
        <DialogFooter>
          
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}