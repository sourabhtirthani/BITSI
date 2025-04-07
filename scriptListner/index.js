import express from "express";
import { getBitsiPriceInUSD } from "./getPrice/index.js"; // Importing the function
import { getTransfer } from "./scripts/index.js";
import { startCronJob,insertCoinTransaction,insertCoin } from "./cronJob/deleteExpriryPolicies.js";

const app = express();
const PORT = process.env.PORT || 5000;

startCronJob(); 

getTransfer().catch((error) => {
  console.error("Error in getTransfer:", error);
  console.log("In the error clause");
});

// API Route to Get BITSI Price in a Given Currency
app.get("/api/bitsi-price", async (req, res) => {
  try {
    const priceData = await getBitsiPriceInUSD();
    res.json(priceData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch BITSI price" });
  }
});

// Start Express Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
