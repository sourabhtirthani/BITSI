import cron from "node-cron";
import pool from "../database/index.js";
import dotenv from "dotenv";
import Web3 from "web3";
dotenv.config();

import contractABI from './insurance.json' assert { type: 'json' };

dotenv.config();

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.INFURA_URL));
const contract = new web3.eth.Contract(contractABI, process.env.CONTRACT_ADDRESS);
const privateKey = process.env.PRIVATE_KEY;
const adminAddress = web3.eth.accounts.privateKeyToAccount(privateKey).address;

export const deleteExpiredCoinInsurancePolicies = async () => {
  try {
    console.log("Fetching expired policies from blockchain...");

    // Call read-only function to check if there are expired policies
    const expiredPolicyIds = await contract.methods.getExpiredPolicies().call();
    console.log(`Found ${expiredPolicyIds.length} expired policies.`);

    if (expiredPolicyIds.length === 0) {
      console.log("No expired policies found.");
      return;
    }

    // Build and sign transaction to delete expired policies
    const txData = contract.methods.deleteExpiredPolicies().encodeABI();
    const tx = {
      to: process.env.CONTRACT_ADDRESS,
      data: txData,
      gas: 3000000,
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    console.log("Blockchain deletion tx receipt:", receipt.transactionHash);

    // Delete from PostgreSQL
    const dbQuery = `DELETE FROM "CoinInsurance" WHERE "expiration" <= NOW()`;
    const result = await pool.query(dbQuery);
    console.log(`${result.rowCount} expired policies deleted from database.`);
  } catch (error) {
    console.error("Error deleting expired policies:", error);
  }
};

export const insertCoinTransaction = async (
    coinsTransferred,
    eventName,
    from,
    to,
    price
  ) => {
    try {
      console.log(`Inserting new transaction event...`);
  
      const query = `
        INSERT INTO "CoinTransactionEvent" ("coinsTransferred", "eventName", "from", "to", "price")
        VALUES ($1, $2, $3, $4, $5)
      `;
      const values = [coinsTransferred, eventName, from, to, price];
  
      await pool.query(query, values);
  
      return { success: true };
    } catch (error) {
      console.error("Error inserting coin transaction:", error);
      return { success: false };
    }
  };

export const insertCoin = async (
    userAddress,
    totalAmount,
    totalCoins,
    unInsuredCoins
  ) => {
    try {
      console.log(`Inserting new coin record for user: ${userAddress}`);
  
      const query = `
  INSERT INTO "Coin" ("userAddress", "totalAmount", "totalCoins", "unInsuredCoins", "updatedAt")
  VALUES ($1, $2, $3, $4, $5)
`;
const updatedAt = new Date();
const values = [userAddress, totalCoins, totalCoins, unInsuredCoins, updatedAt];

      await pool.query(query, values);
  
      return { success: true };
    } catch (error) {
      console.error("Error inserting coin record:", error);
      return { success: false };
    }
  };
// Wrap the cron job in a function
export const startCronJob = () => {
    cron.schedule("0 0 * * *", async () => {
        console.log("Running cron job to delete expired policies...");
        await deleteExpiredCoinInsurancePolicies();
    }, {
        scheduled: true,
        timezone: "UTC",
    });

    console.log("Cron job scheduled to run daily at midnight UTC.");
};
