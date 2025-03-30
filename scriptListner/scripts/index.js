import { ethers } from 'ethers';
import dotenv from 'dotenv';
import { coinContractAbi, coinContractAddress } from '../contracts/coin/index.js';
import { nftContractABI, nftContractAddress } from '../contracts/nft/index.js';

dotenv.config();

const provider = new ethers.JsonRpcProvider(`https://polygon-mainnet.infura.io/v3/114591cebd3b4ba2a0e4bb9eee913b7e}`);
const socketProvider = new ethers.WebSocketProvider(`wss://polygon-mainnet.infura.io/ws/v3/114591cebd3b4ba2a0e4bb9eee913b7e`);

// In-memory event storage (Replace with a database in production)
const eventsStorage = [];

export const getTransfer = async () => {
    try {
        console.log("Listening for transfer events...");
        
        const contract = new ethers.Contract(nftContractAddress, nftContractABI, socketProvider);
        const contractCoin = new ethers.Contract(coinContractAddress, coinContractAbi, socketProvider);

        contract.on('Transfer', async (from, to, tokenId, event) => {
            console.log(`NFT Transfer: from ${from} to ${to}, Token ID: ${tokenId}`);
            const transactionHash = event.transactionHash;
            await getDetailsWithHashOfTransaction(transactionHash, tokenId, from, to, 'nft');
        });

        contractCoin.on('Transfer', async (from, to, amount, event) => {
            try {
                const tokensTransferred = Number(amount) / 10 ** 18;
                const transactionHash = event.transactionHash;
                await transactionDetailsCoins(transactionHash, tokensTransferred, from, to, 'coin');
            } catch (error) {
                console.error(`Error processing coin transaction:`, error);
            }
        });
    } catch (error) {
        console.error('Error initializing transfer event listener:', error);
    }
};

const getDetailsWithHashOfTransaction = async (transactionHash, assetId, from, to, assetType) => {
    try {
        if (from === '0x0000000000000000000000000000000000000000') {
            console.log('Mint event detected.');
            return;
        }
        const transaction = await provider.getTransaction(transactionHash);
        if (!transaction) {
            console.log(`No transaction found for hash: ${transactionHash}`);
            return;
        }
        const value = ethers.formatEther(transaction.value);
        const block = await provider.getBlock(transaction.blockNumber);
        const time = new Date(block.timestamp * 1000);
        
        // Store event in memory
        eventsStorage.push({ from, to, time, value, assetId, assetType });
        console.log('NFT Transaction stored:', { from, to, time, value, assetId, assetType });
    } catch (error) {
        console.error(`Error retrieving transaction details:`, error);
    }
};

const transactionDetailsCoins = async (transactionHash, tokensTransferred, from, to, assetType) => {
    try {
        const transaction = await provider.getTransaction(transactionHash);
        if (!transaction) {
            console.log(`No transaction found for hash: ${transactionHash}`);
            return;
        }
        const value = ethers.formatEther(transaction.value);
        const block = await provider.getBlock(transaction.blockNumber);
        const time = new Date(block.timestamp * 1000);
        const salePrice = await getSaleValue(transactionHash);
        
        // Store event in memory
        eventsStorage.push({ from, to, time, value, tokensTransferred, assetType, salePrice });
        console.log('Coin Transaction stored:', { from, to, time, value, tokensTransferred, assetType, salePrice });
    } catch (error) {
        console.error(`Error retrieving coin transaction details:`, error);
    }
};

async function getSaleValue(transactionHash) {
    try {
        const transaction = await provider.getTransactionReceipt(transactionHash);
        const swapEvent = transaction.logs.find(log =>
            log.topics[0] === ethers.id("Swap(address,uint256,uint256,uint256,uint256,address)")
        );
        if (!swapEvent) return '0';

        const iface = new ethers.Interface([
            "event Swap(address indexed sender, uint256 amount0In, uint256 amount1In, uint256 amount0Out, uint256 amount1Out, address indexed to)"
        ]);
        const decodedData = iface.parseLog({ topics: swapEvent.topics, data: swapEvent.data });
        const maticAmount = decodedData.args.amount1Out > 0 ? decodedData.args.amount1Out : decodedData.args.amount0Out;
        return ethers.formatEther(maticAmount);
    } catch (error) {
        console.error(`Error retrieving sale value:`, error);
        return '0';
    }
}
