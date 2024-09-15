'use server'
import {ethers} from 'ethers'

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
type getTransactionFromHashType = {success: boolean}
export const getTransactionFromHash = async(transactionHash :string):Promise<getTransactionFromHashType>=>{
    try{
        const transaction = await provider.getTransaction(transactionHash);
        await transaction?.wait();
        return {success : true}
    }catch(error){
        console.log(error);
        return {success : false}
    }
}