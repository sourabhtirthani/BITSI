-- CreateTable
CREATE TABLE "SupportTedCurrencies" (
    "id" SERIAL NOT NULL,
    "currency" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SupportTedCurrencies_pkey" PRIMARY KEY ("id")
);
