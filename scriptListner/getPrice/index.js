import Web3 from 'web3';
import axios from 'axios';

// Constants
const BITSI_CONTRACT_ADDRESS = '0x94d58ceeceec489fc3c74556f8912608097ee3ab'; // BITSI Token
const UNISWAP_V2_ROUTER_ADDRESS = '0xedf6066a2b290C185783862C7F4776A2C8077AD1'; // Uniswap V2 Router Address
const MATIC_ADDRESS = '0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270'; // MATIC Native Address (WETH)
const POLYGON_RPC_URL = 'https://polygon-mainnet.infura.io/v3/114591cebd3b4ba2a0e4bb9eee913b7e'; // Replace with your actual RPC URL

const web3 = new Web3(new Web3.providers.HttpProvider(POLYGON_RPC_URL));

// Uniswap V2 Router ABI (simplified for `getAmountsOut`)
const UNISWAP_V2_ROUTER_ABI = [
  {
    "constant": true,
    "inputs": [
      { "name": "amountIn", "type": "uint256" },
      { "name": "path", "type": "address[]" }
    ],
    "name": "getAmountsOut",
    "outputs": [
      { "name": "", "type": "uint256[]" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

/**
 * Get BITSI price in MATIC using Uniswap V2 Router
 */
export const getBitsiPriceWithAmountsOut = async () => {
  const path = [BITSI_CONTRACT_ADDRESS, MATIC_ADDRESS]; 
  const amountIn = web3.utils.toWei('1', 'ether');

  try {
    // Create Uniswap V2 Router contract instance
    const routerContract = new web3.eth.Contract(UNISWAP_V2_ROUTER_ABI, UNISWAP_V2_ROUTER_ADDRESS);

    // Get amounts out
    console.log(amountIn, path);
    const amountsOut = await routerContract.methods.getAmountsOut(amountIn, path).call();
    const bitsiToMatic = web3.utils.fromWei(amountsOut[1], 'ether'); // Price of 1 BITSI in MATIC

    console.log(`✅ 1 BITSI = ${bitsiToMatic} MATIC`);
    return bitsiToMatic;
  } catch (error) {
    console.error("❌ Error fetching BITSI price from Uniswap V2:", error);
    return 0;
  }
};

/**
 * Get MATIC price in USD using CoinGecko
 */
const getMaticToUSD = async () => {
  try {
    const response = await axios.get("https://api.coingecko.com/api/v3/simple/price?ids=matic-network&vs_currencies=usd");
    return response.data['matic-network'].usd;
  } catch (error) {
    console.error("❌ Error fetching MATIC price from CoinGecko:", error);
    return 1; // Default fallback
  }
};

/**
 * Get BITSI price in USD
 */
export const getBitsiPriceInUSD = async () => {
  const bitsiToMatic = await getBitsiPriceWithAmountsOut();
  const maticToUSD = await getMaticToUSD();
  const bitsiToUSD = bitsiToMatic * maticToUSD;

  console.log(`✅ 1 BITSI = ${bitsiToUSD.toFixed(4)} USD`);
  return bitsiToUSD;
};

