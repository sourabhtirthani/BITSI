/*
  Warnings:

  - You are about to drop the column `insuredCoins` on the `CoinInsurance` table. All the data in the column will be lost.
  - Added the required column `coinsInsured` to the `CoinInsurance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverage` to the `CoinInsurance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiration` to the `CoinInsurance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "InsuranceStatus" ADD VALUE 'Expired';
ALTER TYPE "InsuranceStatus" ADD VALUE 'Claimed';

-- AlterTable
ALTER TABLE "Coin" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CoinInsurance" DROP COLUMN "insuredCoins",
ADD COLUMN     "coinsInsured" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "coverage" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "expiration" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "is_extended" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "status" "InsuranceStatus" NOT NULL DEFAULT 'ApprovalPending';

-- CreateTable
CREATE TABLE "CoinInsuranceEvent" (
    "id" SERIAL NOT NULL,
    "insuranceId" INTEGER NOT NULL,
    "eventName" TEXT NOT NULL,
    "description" TEXT,
    "coinsAffected" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinInsuranceEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoinInsuranceEvent" ADD CONSTRAINT "CoinInsuranceEvent_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "CoinInsurance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
