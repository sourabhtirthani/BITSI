import { ethers } from 'ethers';
import dotenv from 'dotenv';
import {createClient} from 'redis'
import { coinContractAbi, coinContractAddress } from '../contracts/coin/index.js';
import { nftContractABI, nftContractAddress } from '../contracts/nft/index.js';

dotenv.config();


const client = createClient();
const provider = new ethers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);
const socketProvider = new ethers.WebSocketProvider(`wss://polygon-mainnet.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`);

async function connectToClient(){
    await client.connect();
    console.log(`connected to reddis`);
}

export const getTransfer = async () => {
    try {
        await connectToClient();
        // const provider = await new ethers.WebSocketProvider(`wss://sepolia.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`); //put it imn env
        // const provider = await new ethers.WebSocketProvider(`wss://polygon-mainnet.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`);
        socketProvider.websocket.on('open', () => console.log("WebSocket connection opened"));
        socketProvider.websocket.onerror = (error) => console.error("WebSocket error", error);

        const contract = await new ethers.Contract(nftContractAddress, nftContractABI, socketProvider);
        const contractCoin = await new ethers.Contract(coinContractAddress , coinContractAbi , socketProvider);
        // const router = new ethers.Contract(QUICKSWAP_ROUTER, ROUTER_ABI, socketProvider);

        contract.on('Transfer', async (from, to, tokenId, event) => {
            console.log(`from is ${from} and to is ${to} and token id is ${tokenId}`)
            console.log(`from is ${from} and to is ${to}`)
            const tokenIdAsNumber = await Number(event.args[2]);
            console.log(`token id is : ${Number(tokenId)}`)
            console.log(`token id in events : ${Number(event.args[2])}`)
            const transactionHash = await event.log.transactionHash;
            await getDetailsWithHashOfTransaction(transactionHash, tokenIdAsNumber , from , to , 'nft')
        });
        contractCoin.on('Transfer', async (from, to, tokenId, event) => {

            try{
            const tokensTransferred =  Number(tokenId)/10**18;
            const tokenIdAsNumber = await Number(event.args[2]);
            const transactionHash = await event.log.transactionHash;
            await transactionDetailsCoins(transactionHash, tokensTransferred , from , to , 'coin')
            }catch(error){
                console.log(`error in the script of transaction hash`);
                console.log(error)
            }
            
        });


    } catch (error) {
        console.log('error in the script');
        console.log(error)
    }
}

// for NFT
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
        console.log('transaction is :')
        console.log(transaction);
        const value = await ethers.formatEther(transaction.value)
        console.log('Value:', ethers.formatEther(transaction.value)); //  value from Wei to Ether
        console.log('to:', transaction.to);
        // console.log('from:', transaction.from);

        const blockNumber = transaction.blockNumber;
        const block = await provider.getBlock(blockNumber);
        const time = new Date(block.timestamp * 1000);
        // console.log(time.toISOString)
        // await buyEvent(from, to, time, value, nftId);
        const price = value;
        await client.lPush("events" , JSON.stringify({from, to, time, price, assetId , assetType}));
    } catch (error) {
        console.log(`error in the script of transaction hash`);
        console.log(error)
    }
}

export const transactionDetailsCoins = async(transactionHash  , tokensTransferred, from , to , assetType)=>{
    try{
        const transaction = await provider.getTransaction(transactionHash);
       
        if(!transaction){
            console.log(`no transactions found`)
            return ;
        }
        
        const value = await ethers.formatEther(transaction.value)
        // console.log('Value:', ethers.formatEther(transaction.value));
        const blockNumber = await transaction.blockNumber;
        const block = await provider.getBlock(blockNumber);
        const time = new Date(block.timestamp * 1000);
        const salePrice = await getSaleValue(transactionHash);
        console.log(`the sale price is : ${salePrice}`);
        console.log(`from is : ${from} and to is ${to} and valus is : ${value} tokens transaerred is : ${tokensTransferred} and assettype is : ${assetType}`)
        const price = value;
        await client.lPush("events" , JSON.stringify({from, to, time, price, tokensTransferred , assetType , salePrice}));

    }catch(error){
        console.log(`error in the script of transaction hash`);
        console.log(error)
    }
}






async function getSaleValue(transactionHash) {
    const transaction = await provider.getTransactionReceipt(transactionHash);
    const swapEvent = transaction.logs.find(log =>
        log.topics[0] === ethers.id("Swap(address,uint256,uint256,uint256,uint256,address)")
    );

    if (!swapEvent) {
        return '0';
    }

    const iface = new ethers.Interface([
        "event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)"
    ]);

    const decodedData = iface.parseLog({
        topics: swapEvent.topics,
        data: swapEvent.data
    });

    const maticAmount = decodedData.args.amount1Out > 0
        ? decodedData.args.amount1Out
        : decodedData.args.amount0Out;

    return ethers.formatEther(maticAmount);
}