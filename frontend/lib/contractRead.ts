import { useAccount, useWriteContract , useReadContract , UseReadContractReturnType , useReadContracts} from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"
import { readContract } from '@wagmi/core'
import { config } from '@/config'
import { insuraceContractAddress, insuranceContractABI } from "./insuranceContract"

export const readAddressFromContract =async(fnctnName : string) =>{
    const addressFromContract = await readContract(config , {
        abi: contractABI,
        address: contractAddress,
        functionName: fnctnName
    })
    return addressFromContract;
}


export const readInsuranceContractParamentes = async(fnctnName : string) =>{
    const dataFromContract = await readContract(config , {
        abi : insuranceContractABI,
        address : insuraceContractAddress,
        functionName : fnctnName
    })
    return dataFromContract;
}