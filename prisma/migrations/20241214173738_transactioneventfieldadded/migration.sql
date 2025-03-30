/*
  Warnings:

  - You are about to drop the column `coinsAffected` on the `CoinInsuranceEvent` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoinInsuranceEvent" DROP COLUMN "coinsAffected";

-- AlterTable
ALTER TABLE "CoinTransactionEvent" ADD COLUMN     "showInInsurance" BOOLEAN DEFAULT true;
