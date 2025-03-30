-- AlterTable
ALTER TABLE "Nft" ALTER COLUMN "nft_description" DROP NOT NULL,
ALTER COLUMN "nft_description" SET DATA TYPE TEXT;
