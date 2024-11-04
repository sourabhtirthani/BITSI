-- CreateTable
CREATE TABLE "Coin" (
    "id" SERIAL NOT NULL,
    "userAddress" TEXT NOT NULL,
    "numberOfCoins" DOUBLE PRECISION NOT NULL,
    "insuredCoins" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coin_pkey" PRIMARY KEY ("id")
);
