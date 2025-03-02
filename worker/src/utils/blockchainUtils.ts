import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { coinContractAbi, coinContractAddress } from '../contracts/coin';

dotenv.config();

const provider = new ethers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const coinContract = new ethers.Contract(coinContractAddress , coinContractAbi , provider);

export const getBalanceOfUser = async(userAddress : string) : Promise<number> => {
    try{
        const balanceOfUser = await coinContract.getFunction('balanceOf')(userAddress);
        // const balance = await coinContract.balanceOf(userAddress)
        // console.log(`the balance of the user is : ${balance} with the 13 line number and balakce of user is : ${balanceOfUser} with 12 line number`)
        if(balanceOfUser){
            return Number(balanceOfUser/10**18);
        }else{
            return 0;
        }

    }catch(error){
        // console.log(error);
        return 0;
        console.log(`in the error clause`)
    }
}