/*
  Warnings:

  - The primary key for the `SupportTedCurrencies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `SupportTedCurrencies` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `supportTedCurrenciesId` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_supportTedCurrenciesId_fkey";

-- AlterTable
ALTER TABLE "SupportTedCurrencies" DROP CONSTRAINT "SupportTedCurrencies_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "SupportTedCurrencies_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "supportTedCurrenciesId",
ADD COLUMN     "supportTedCurrenciesId" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_supportTedCurrenciesId_fkey" FOREIGN KEY ("supportTedCurrenciesId") REFERENCES "SupportTedCurrencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
