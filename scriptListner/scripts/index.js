import Web3 from 'web3';
import dotenv from 'dotenv';
import { coinContractAbi, coinContractAddress } from '../contracts/coin/index.js';
import { nftContractABI, nftContractAddress } from '../contracts/nft/index.js';
import { insertCoin, insertCoinTransaction, updateUserCoin } from '../cronJob/deleteExpriryPolicies.js';

dotenv.config();

const HTTP_PROVIDER = `https://polygon-mainnet.infura.io/v3/114591cebd3b4ba2a0e4bb9eee913b7e`;
const WS_PROVIDER = `wss://polygon-mainnet.infura.io/ws/v3/114591cebd3b4ba2a0e4bb9eee913b7e`;

const web3 = new Web3(new Web3.providers.HttpProvider(HTTP_PROVIDER));
const web3Socket = new Web3(new Web3.providers.WebsocketProvider(WS_PROVIDER));

// In-memory event storage (use DB in production)
const eventsStorage = [];

export const getTransfer = async () => {
    try {
        console.log("Listening for transfer events...");

        const nftContract = new web3Socket.eth.Contract(nftContractABI, nftContractAddress);
        const coinContract = new web3Socket.eth.Contract(coinContractAbi, coinContractAddress);

        nftContract.events.Transfer({})
            .on('data', async (event) => {
                const { from, to, tokenId } = event.returnValues;
                console.log(`NFT Transfer: from ${from} to ${to}, Token ID: ${tokenId}`);
                await getDetailsWithHashOfTransaction(event.transactionHash, tokenId, from, to, 'nft');
            })
            //.on('error', console.error);

        coinContract.events.Transfer({})
            .on('data', async (event) => {
                const { from, to, value } = event.returnValues;
                console.log("Coin Transfer Event");
                const tokensTransferred = web3.utils.fromWei(value, 'ether');
                const transactionHash = event.transactionHash;
                console.log("transactionHash", transactionHash);
                await transactionDetailsCoins(transactionHash, tokensTransferred, from, to, 'coin');
            })
            //.on('error', console.error);
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
        
        const tx = await web3.eth.getTransaction(transactionHash);
        if (!tx) {
            console.log(`No transaction found for hash: ${transactionHash}`);
            return;
        }

        const block = await web3.eth.getBlock(tx.blockNumber);
        const time = new Date(block.timestamp * 1000);
        const value = web3.utils.fromWei(tx.value, 'ether');

        eventsStorage.push({ from, to, time, value, assetId, assetType });
        console.log('NFT Transaction stored:', { from, to, time, value, assetId, assetType });

    } catch (error) {
        console.error(`Error retrieving NFT transaction details:`, error);
    }
};

const transactionDetailsCoins = async (transactionHash, tokensTransferred, from, to, assetType) => {
    try {
        const tx = await web3.eth.getTransaction(transactionHash);
        if (!tx) {
            console.log(`No transaction found for hash: ${transactionHash}`);
            return;
        }
        if (from === '0x0000000000000000000000000000000000000000') {
            console.log('Mint event detected.');
            return;
        }


        console.log("from, to, assetType",from, to, assetType);
        if(to.toLocaleLowerCase()==='0x1095692A6237d83C6a72F3F5eFEdb9A670C49223'.toLocaleLowerCase()) console.log("User buy tokens")
       

        const block = await web3.eth.getBlock(tx.blockNumber);
        const time = new Date(Number(block.timestamp) * 1000);
        const value = web3.utils.fromWei(tx.value, 'ether');
        const salePrice = await getSaleValue(transactionHash);

        const result = { from, to, time, value, tokensTransferred, assetType, salePrice };
        console.log("result",result);
        if(to.toLocaleLowerCase()==='0x6F570a154ab55b370a41E2332B831C6578b0B81E'.toLocaleLowerCase()) {
            console.log("User sell tokens")
            await updateUserCoin([from],[1],[1],[salePrice])
        }
        if(to.toLocaleLowerCase()!="0x54436942a5D8a0cb565A49C0b0eb0dECe36B34dc".toLocaleLowerCase())
       { 
        await insertCoin(to,salePrice,tokensTransferred,tokensTransferred);
        await insertCoinTransaction(tokensTransferred,"Buy",from,to,salePrice)
    }
        eventsStorage.push(result);
        console.log('Coin Transaction stored:', result);

    } catch (error) {
        console.error(`Error retrieving coin transaction details:`, error);
    }
};

const getSaleValue = async (transactionHash) => {
    try {
        const receipt = await web3.eth.getTransactionReceipt(transactionHash);
        const swapTopic = web3.utils.keccak256("Swap(address,uint256,uint256,uint256,uint256,address)");

        const swapLog = receipt.logs.find(log => log.topics[0] === swapTopic);
        if (!swapLog) return '0';

        const decoded = web3.eth.abi.decodeLog(
            [
                { type: 'uint256', name: 'amount0In' },
                { type: 'uint256', name: 'amount1In' },
                { type: 'uint256', name: 'amount0Out' },
                { type: 'uint256', name: 'amount1Out' }
            ],
            swapLog.data,
            swapLog.topics.slice(1)
        );

        const maticAmount = decoded.amount1Out > 0 ? decoded.amount1Out : decoded.amount0Out;
        return web3.utils.fromWei(maticAmount, 'ether');
    } catch (error) {
        console.error(`Error retrieving sale value:`, error);
        return '0';
    }
};
