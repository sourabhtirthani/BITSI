/*
  Warnings:

  - Added the required column `lossPercent` to the `Claims` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Claims" ADD COLUMN     "lossPercent" DOUBLE PRECISION NOT NULL;
