/*
  Warnings:

  - You are about to drop the column `insuranceId` on the `Compensation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[nftId]` on the table `Insurance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Compensation" DROP CONSTRAINT "Compensation_insuranceId_fkey";

-- DropIndex
DROP INDEX "Compensation_insuranceId_key";

-- AlterTable
ALTER TABLE "Compensation" DROP COLUMN "insuranceId";

-- CreateIndex
CREATE UNIQUE INDEX "Insurance_nftId_key" ON "Insurance"("nftId");
