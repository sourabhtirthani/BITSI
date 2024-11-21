/*
  Warnings:

  - You are about to drop the column `insuredCoins` on the `Coin` table. All the data in the column will be lost.
  - You are about to drop the column `numberOfCoins` on the `Coin` table. All the data in the column will be lost.
  - Added the required column `totalAmount` to the `Coin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCoins` to the `Coin` table without a default value. This is not possible if the table is not empty.
  - Added the required column `unInsuredCoins` to the `Coin` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coin" DROP COLUMN "insuredCoins",
DROP COLUMN "numberOfCoins",
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalCoins" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "unInsuredCoins" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "CoinInsurance" (
    "id" SERIAL NOT NULL,
    "insuredCoins" DOUBLE PRECISION NOT NULL,
    "coinId" INTEGER NOT NULL,

    CONSTRAINT "CoinInsurance_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoinInsurance" ADD CONSTRAINT "CoinInsurance_coinId_fkey" FOREIGN KEY ("coinId") REFERENCES "Coin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
