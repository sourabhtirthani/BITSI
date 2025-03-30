-- DropIndex
DROP INDEX "Compensation_insuranceId_key";

-- AlterTable
ALTER TABLE "Nft_events" ADD COLUMN     "claim_requested" BOOLEAN NOT NULL DEFAULT false;
