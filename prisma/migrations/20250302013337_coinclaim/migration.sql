-- CreateTable
CREATE TABLE "CoinClaim" (
    "id" SERIAL NOT NULL,
    "userAddress" TEXT NOT NULL,
    "compensationGiven" BOOLEAN NOT NULL DEFAULT false,
    "buyPrice" DOUBLE PRECISION NOT NULL,
    "sellPrice" DOUBLE PRECISION NOT NULL,
    "loss" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lossPercent" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "coinInsuranceId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CoinClaim_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CoinClaim" ADD CONSTRAINT "CoinClaim_coinInsuranceId_fkey" FOREIGN KEY ("coinInsuranceId") REFERENCES "CoinInsurance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
