import cron from "node-cron";
import pool from "../database/index.js";
import dotenv from "dotenv";

dotenv.config();

const deleteExpiredCoinInsurancePolicies = async () => {
    try {
        const query = `DELETE FROM "CoinInsurance" WHERE "expiration" <= NOW()`; // Use NOW() to compare timestamps
        const result = await pool.query(query);
        console.log(`${result.rowCount} expired policies deleted`);
    } catch (error) {
        console.error("Error deleting expired policies:", error);
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
