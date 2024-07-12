/*
  Warnings:

  - Made the column `nft_description` on table `Nft` required. This step will fail if there are existing NULL values in that column.
  - Made the column `nft_owner_address` on table `Nft` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Nft" ALTER COLUMN "nft_description" SET NOT NULL,
ALTER COLUMN "nft_description" SET DEFAULT 'no description provided',
ALTER COLUMN "nft_owner_address" SET NOT NULL,
ALTER COLUMN "nft_mint_time" SET DEFAULT CURRENT_TIMESTAMP;
