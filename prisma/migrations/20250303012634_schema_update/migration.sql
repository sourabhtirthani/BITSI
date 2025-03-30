/*
  Warnings:

  - You are about to drop the column `buyPrice` on the `CoinInsurance` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoinInsurance" DROP COLUMN "buyPrice",
ADD COLUMN     "buyPricePerCoin" DOUBLE PRECISION NOT NULL DEFAULT 0;
