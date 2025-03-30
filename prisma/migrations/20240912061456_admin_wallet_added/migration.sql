-- CreateEnum
CREATE TYPE "WalletType" AS ENUM ('MINT', 'COMPENSATION', 'OWNER');

-- CreateTable
CREATE TABLE "AdminWallet" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" "WalletType" NOT NULL,

    CONSTRAINT "AdminWallet_pkey" PRIMARY KEY ("id")
);
