/*
  Warnings:

  - Added the required column `nftId` to the `Nft_events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nft_events" ADD COLUMN     "nftId" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Nft_events_nftId_idx" ON "Nft_events"("nftId");

-- AddForeignKey
ALTER TABLE "Nft_events" ADD CONSTRAINT "Nft_events_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "Nft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
