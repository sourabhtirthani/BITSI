/*
  Warnings:

  - You are about to drop the column `coinId` on the `CoinTransactionEvent` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "CoinTransactionEvent" DROP CONSTRAINT "CoinTransactionEvent_coinId_fkey";

-- AlterTable
ALTER TABLE "CoinTransactionEvent" DROP COLUMN "coinId";
