-- CreateTable
CREATE TABLE "Insurance" (
    "id" SERIAL NOT NULL,
    "coverage" INTEGER NOT NULL DEFAULT 100,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiration" TIMESTAMP(3) NOT NULL,
    "active" BOOLEAN NOT NULL,
    "approved" BOOLEAN NOT NULL,
    "soldValue" DOUBLE PRECISION NOT NULL,
    "nftId" INTEGER NOT NULL,

    CONSTRAINT "Insurance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Insurance_nftId_key" ON "Insurance"("nftId");

-- AddForeignKey
ALTER TABLE "Insurance" ADD CONSTRAINT "Insurance_nftId_fkey" FOREIGN KEY ("nftId") REFERENCES "Nft"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
