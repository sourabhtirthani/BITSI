/*
  Warnings:

  - The primary key for the `SupportTedCurrencies` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "SupportTedCurrencies" DROP CONSTRAINT "SupportTedCurrencies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "SupportTedCurrencies_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "SupportTedCurrencies_id_seq";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "supportTedCurrenciesId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_supportTedCurrenciesId_fkey" FOREIGN KEY ("supportTedCurrenciesId") REFERENCES "SupportTedCurrencies"("id") ON DELETE SET NULL ON UPDATE CASCADE;
