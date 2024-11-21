/*
  Warnings:

  - A unique constraint covering the columns `[userAddress]` on the table `Coin` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Coin_userAddress_key" ON "Coin"("userAddress");
