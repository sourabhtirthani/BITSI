import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

export function DialogInsuranceRadioGroup() {
  return (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center space-x-2">
      <Link href='/my-profile' className="flex items-center gap-4 mt-4">
        <RadioGroupItem value="" id="r1" />
       <Label htmlFor="r1" className="text-black font-manrope text-[20px] font-bold">Coin Insurance policy</Label></Link>
      </div>
      <div className="flex items-center space-x-2">
      <Link href='/my-profile' className="flex items-center gap-4 mt-4">
        <RadioGroupItem value="" id="r2" />
       <Label htmlFor="r2" className="text-black font-manrope text-[20px] font-bold">NFT Insurance policy</Label></Link>
      </div>
      <div className="flex items-center space-x-2">
      <Link href='/my-profile' className="flex items-center gap-4 mt-4">
        <RadioGroupItem value="" id="r3" />
       <Label htmlFor="r3" className="text-black font-manrope text-[20px] font-bold">Trade Insurance policy</Label></Link>
      </div>
      <div className="flex items-center space-x-2">
      <Link href='/my-profile' className="flex items-center gap-4 mt-4">
        <RadioGroupItem value="" id="r4" />
       <Label htmlFor="r4" className="text-black font-manrope text-[20px] font-bold">Stock Insurance policy</Label></Link>
      </div>
    </RadioGroup>
  )
}
