/*
  Warnings:

  - Added the required column `nft_collection_name` to the `Nft` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nft" ADD COLUMN     "nft_collection_name" TEXT NOT NULL;
