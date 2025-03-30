'use server'
import {ethers} from 'ethers'

// const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const provider = new ethers.JsonRpcProvider(`https://polygon-rpc.com`);
// const provider = ''
type getTransactionFromHashType = {success: boolean}
export const getTransactionFromHash = async(transactionHash :string):Promise<getTransactionFromHashType>=>{
    try{
        let retries = 0;
        const maxRetries = 20;
        let transaction = await provider.getTransaction(transactionHash);
        while (!transaction && retries < maxRetries) {
            console.log(transaction)
            console.log(`Transaction not found, retrying (${retries + 1}/${maxRetries})...`);
            await new Promise((resolve) => setTimeout(resolve, 3000)); 
            transaction = await provider.getTransaction(transactionHash);
            retries++;
          }
        console.log(`crossed the while loop`)
        await transaction?.wait();
        console.log("in here after the line of transaction . wait function is called ")
        return {success : true}
    }catch(error){
        console.log(error);
        return {success : false}
    }
}


// type getTransactionFromHashType = {success: boolean}
const providerPolygon = new ethers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
export const getTransactionFromHashOnPolygon = async(transactionHash :string):Promise<getTransactionFromHashType>=>{
    try{
        console.log(transactionHash)
        // 0x5548f931e59394a137e6b77123d3517713fa2b6fb1fb400ed780784a3834df45
        console.log(`in here in the get transaction from hash`)
        const transaction = await providerPolygon.getTransaction(transactionHash);
        console.log(transaction)
      
        await transaction?.wait();
        console.log("in here after the line of transaction . wait function is called ")
        return {success : true}
    }catch(error){
        console.log(error);
        return {success : false}
    }
}