'use server'
import {ethers} from 'ethers'

const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
type getTransactionFromHashType = {success: boolean}
export const getTransactionFromHash = async(transactionHash :string):Promise<getTransactionFromHashType>=>{
    try{
        console.log(`the id is ${process.env.INFURA_PROJECT_ID}`)
        const transaction = await provider.getTransaction(transactionHash);
        await transaction?.wait();
        console.log(`success`)
        return {success : true}
    }catch(error){
        console.log(error);
        return {success : false}
    }
}