/*
  Warnings:

  - Made the column `currentOwner` on table `Insurance` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Insurance" ALTER COLUMN "currentOwner" SET NOT NULL;

-- AlterTable
ALTER TABLE "Insurance_events" ADD COLUMN     "assetType" TEXT NOT NULL DEFAULT 'Nft';
