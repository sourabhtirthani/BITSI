/*
  Warnings:

  - You are about to drop the column `name` on the `AdminWallet` table. All the data in the column will be lost.
  - Added the required column `address` to the `AdminWallet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AdminWallet" DROP COLUMN "name",
ADD COLUMN     "address" TEXT NOT NULL;
