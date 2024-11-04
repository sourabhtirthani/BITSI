import { ethers } from 'ethers';
import dotenv from 'dotenv';
import {createClient} from 'redis'
import { coinContractAbi, coinContractAddress } from '../contracts/coin/index.js';
import { nftContractABI, nftContractAddress } from '../contracts/nft/index.js';


dotenv.config();

const client = createClient();
const provider = new ethers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);

async function connectToClient(){
    await client.connect();
    console.log(`connected to reddis`);
}


export const getTransfer = async () => {
    try {
        await connectToClient();
        const provider = await new ethers.WebSocketProvider(`wss://sepolia.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`); //put it imn env
        provider.websocket.on('open', () => console.log("WebSocket connection opened"));
        provider.websocket.onerror = (error) => console.error("WebSocket error", error);

        const contract = await new ethers.Contract(nftContractAddress, nftContractABI, provider);
        const contractCoin = await new ethers.Contract(coinContractAddress , coinContractAbi , provider);


        contract.on('Transfer', async (from, to, tokenId, event) => {
            console.log(`from is ${from} and to is ${to}`)
            const tokenIdAsNumber = await Number(event.args[2]);
            console.log(`token id is : ${Number(tokenId)}`)
            console.log(`token id in events : ${Number(event.args[2])}`)
            const transactionHash = await event.log.transactionHash;
            await getDetailsWithHashOfTransaction(transactionHash, tokenIdAsNumber , from , to , 'nft')
        });

        contractCoin.on('Transfer', async (from, to, tokenId, event) => {
            console.log(`from is ${from} and to is ${to}`)
            const tokenIdAsNumber = await Number(event.args[2]);
            console.log(`token id is : ${Number(tokenId)}`)
            console.log(`token id in events : ${Number(event.args[2])}`)
            const transactionHash = await event.log.transactionHash;
            await getDetailsWithHashOfTransaction(transactionHash, tokenIdAsNumber , from , to , 'coin')
        });


    } catch (error) {
        console.log('error in the script');
        console.log(error)
    }
}


export const getDetailsWithHashOfTransaction = async (transactionHash, assetId , from , to , assetType) => {
    try {
        if(from == '0x0000000000000000000000000000000000000000'){
            console.log('A mint function ');
            return;
        }
        const transaction = await provider.getTransaction(transactionHash);
        // console.log(transaction)
        if(!transaction){
            console.log(`no transactions found`)
            return ;
        }
        const value = await ethers.formatEther(transaction.value)
        // console.log('Value:', ethers.formatEther(transaction.value)); //  value from Wei to Ether
        console.log('to:', transaction.to);
        // console.log('from:', transaction.from);

        const blockNumber = transaction.blockNumber;
        const block = await provider.getBlock(blockNumber);
        const time = new Date(block.timestamp * 1000);
        // console.log(time.toISOString)
        // await buyEvent(from, to, time, value, nftId);
        await client.lPush("events" , JSON.stringify({from, to, time, value, assetId , assetType}));
    } catch (error) {
        console.log(`error in the script of transaction hash`);
        console.log(error)
    }
}