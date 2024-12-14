/*
  Warnings:

  - Made the column `showInInsurance` on table `CoinTransactionEvent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "CoinTransactionEvent" ALTER COLUMN "showInInsurance" SET NOT NULL;
