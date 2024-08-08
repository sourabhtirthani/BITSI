
const { ethers } = require('ethers');
const contractAddr = "0x7EBbd6bc9e4900911b0711987C020Ef8f8eE5B51";
const Web3 = require('web3')
require('dotenv').config()
const contractAB =  [ { "inputs": [ { "internalType": "string", "name": "name", "type": "string" }, { "internalType": "string", "name": "symbol", "type": "string" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" } ], "name": "ERC721IncorrectOwner", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ERC721InsufficientApproval", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "approver", "type": "address" } ], "name": "ERC721InvalidApprover", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" } ], "name": "ERC721InvalidOperator", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "ERC721InvalidOwner", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "receiver", "type": "address" } ], "name": "ERC721InvalidReceiver", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "sender", "type": "address" } ], "name": "ERC721InvalidSender", "type": "error" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ERC721NonexistentToken", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "OwnableInvalidOwner", "type": "error" }, { "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "OwnableUnauthorizedAccount", "type": "error" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "_fromTokenId", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "_toTokenId", "type": "uint256" } ], "name": "BatchMetadataUpdate", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": false, "internalType": "uint256", "name": "_tokenId", "type": "uint256" } ], "name": "MetadataUpdate", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256[]", "name": "tokenIds", "type": "uint256[]" }, { "internalType": "uint256[]", "name": "buyPrices", "type": "uint256[]" } ], "name": "buyNFT", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "collectionExists", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "collections", "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "collectionId", "type": "uint256" }, { "internalType": "string", "name": "tokenURI", "type": "string" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "mint", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "collectionId", "type": "uint256" }, { "internalType": "uint256", "name": "price", "type": "uint256" } ], "name": "mintCollection", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "name": "nfts", "outputs": [ { "internalType": "uint256", "name": "id", "type": "uint256" }, { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "uint256", "name": "price", "type": "uint256" }, { "internalType": "uint256", "name": "collectionId", "type": "uint256" }, { "internalType": "bool", "name": "isForReSale", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "bool", "name": "_isResell", "type": "bool" } ], "name": "toggleResell", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" } ]


async function getTransfer() {
    const provider = await new ethers.WebSocketProvider(`wss://polygon-amoy.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`);
    // provider.on("pending" , async(tx : any)=>{
    //     const txInfo = await provider.getTransaction(tx);
    //     console.log(txInfo)
    //     console.log(tx)
    //     console.log('in here')
    // })
    
    const contract = await new ethers.Contract(contractAddr, contractAB, provider);
    console.log("in the script")
     contract.on('Transfer', async (from: any, to: any, value: any, event?: any) => {
        console.log(`Transfer event detected:`);
        console.log(`From: ${from}`);
        console.log(`To: ${to}`);
        console.log(`Value: ${ethers.utils.formatUnits(value, 18)} tokens`);
        console.log(event);
          const transferEvent = {
            from,
            to,
            value: value.toString(),
            eventData: event,
        };
        console.log('the event is called')
        // console.log(JSON.stringify(transferEvent, null, 4));
    });
}

getTransfer().catch(error => {
    console.error('Error in getTransfer:', error);
});



// import { contractABI, contractAddress } from '@/lib/contract';
// import Web3 from 'web3';
// import { Contract } from 'web3-eth-contract';

// const web3 = new Web3(`https://mainnet.infura.io/v3/${process.env.INFURA_PROJECT_ID}`);


// const nftContractABI: any[] = [
  
// ];
// // const nftContractAddress = 'YOUR_NFT_CONTRACT_ADDRESS';


// const nftContract = new web3.eth.Contract(contractABI, contractAddress);


// interface TransferEvent {
//     returnValues: {
//         from: string;
//         to: string;
//         tokenId: string;
//     };
//     event: string;
//     address: string;
//     blockNumber: number;
//     transactionHash: string;
// }

// const handleTransferEvent = (error: Error | null, event: TransferEvent | null) => {
//     if (error) {
//         console.error('Error subscribing to Transfer event:', error);
//     } else if (event) {
//         console.log('Transfer event:', event);
//         const { from, to, tokenId } = event.returnValues;
//         console.log(`NFT transferred from ${from} to ${to} with tokenId ${tokenId}`);
//     }
// };

// const subscribeToTransferEvent = () => {
//     nftContract.events.Transfer({
//         fromBlock: 'latest'
//     })
//     .on('data', (event: any) => handleTransferEvent(null, event as TransferEvent))
//     .on('error', (error: Error) => handleTransferEvent(error, null));
// };


// subscribeToTransferEvent();

// // Optional: Reconnect logic in case of disconnection
// (web3.currentProvider as any).on('end', (e: Error) => {
//     console.error('Connection closed:', e);
//     console.log('Attempting to reconnect...');
//     web3.setProvider(new Web3.providers.WebsocketProvider('wss://mainnet.infura.io/ws/v3/YOUR_INFURA_PROJECT_ID'));
//     subscribeToTransferEvent();
// });