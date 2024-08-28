/*
  Warnings:

  - You are about to drop the column `assetName` on the `Nft_events` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Nft_events" DROP COLUMN "assetName",
ADD COLUMN     "asset_name" TEXT NOT NULL DEFAULT 'NFT';
