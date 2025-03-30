/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `SupportTedCurrencies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `SupportTedCurrencies` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SupportTedCurrencies" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SupportTedCurrencies_code_key" ON "SupportTedCurrencies"("code");
