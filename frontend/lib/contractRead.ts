import { useAccount, useWriteContract , useReadContract , UseReadContractReturnType , useReadContracts} from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"
import { readContract } from '@wagmi/core'
import { config } from '@/config'

export const readAddressFromContract =async(fnctnName : string) =>{
    const addressFromContract = await readContract(config , {
        abi: contractABI,
        address: contractAddress,
        functionName: fnctnName
    })
    return addressFromContract;
}