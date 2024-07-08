import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"
type DialogInsuranceRadioGroupProps = {
  redirectTo: string[];
};

export function DialogInsuranceRadioGroup({redirectTo }: DialogInsuranceRadioGroupProps) {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
      <Link href={`/my-profile?ysldef=${redirectTo[0]}`} className="flex items-center gap-4 mt-4">
        <RadioGroupItem value="" id="r1" />
       <Label htmlFor="r1" className="text-black font-manrope text-[20px] font-bold">Coin Insurance policy</Label></Link>
      </div>
      <div className="flex items-center space-x-2">
      <Link href={`/my-profile?ysldef=${redirectTo[1]}`} className="flex items-center gap-4 mt-4">
        <RadioGroupItem value="" id="r2" />
       <Label htmlFor="r2" className="text-black font-manrope text-[20px] font-bold">NFT Insurance policy</Label></Link>
      </div>
      <div className="flex items-center space-x-2">
      <Link href={`/my-profile?ysldef=${redirectTo[2]}`} className="flex items-center gap-4 mt-4">
        <RadioGroupItem value="" id="r3" />
       <Label htmlFor="r3" className="text-black font-manrope text-[20px] font-bold">Trade Insurance policy</Label></Link>
      </div>
      <div className="flex items-center space-x-2">
      <Link href={`/my-profile?ysldef=${redirectTo[3]}`} className="flex items-center gap-4 mt-4">
        <RadioGroupItem value="" id="r4" />
       <Label htmlFor="r4" className="text-black font-manrope text-[20px] font-bold">Stock Insurance policy</Label></Link>
      </div>
    </RadioGroup>
  )
}
