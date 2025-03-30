/*
  Warnings:

  - A unique constraint covering the columns `[claimId]` on the table `Compensation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `claimId` to the `Compensation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Compensation" ADD COLUMN     "claimId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Claims" (
    "id" SERIAL NOT NULL,
    "userAddress" TEXT NOT NULL,
    "compensationGenerated" BOOLEAN NOT NULL DEFAULT false,
    "expiration" TIMESTAMP(3) NOT NULL,
    "buyPrice" DOUBLE PRECISION NOT NULL,
    "soldPrice" DOUBLE PRECISION NOT NULL,
    "loss" DOUBLE PRECISION NOT NULL,
    "assetId" INTEGER NOT NULL,
    "coverage" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Claims_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Compensation_claimId_key" ON "Compensation"("claimId");

-- AddForeignKey
ALTER TABLE "Compensation" ADD CONSTRAINT "Compensation_claimId_fkey" FOREIGN KEY ("claimId") REFERENCES "Claims"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
