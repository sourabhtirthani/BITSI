/*
  Warnings:

  - Added the required column `Status` to the `Compensation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Compensation" ADD COLUMN     "Status" TEXT NOT NULL;
