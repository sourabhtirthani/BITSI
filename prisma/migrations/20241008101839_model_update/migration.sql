/*
  Warnings:

  - A unique constraint covering the columns `[insuranceId]` on the table `Compensation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Insurance_nftId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Compensation_insuranceId_key" ON "Compensation"("insuranceId");
