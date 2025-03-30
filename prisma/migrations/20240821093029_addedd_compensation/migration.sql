-- CreateTable
CREATE TABLE "Compensation" (
    "id" SERIAL NOT NULL,
    "requestDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "loss" DOUBLE PRECISION NOT NULL,
    "lossPercent" DOUBLE PRECISION NOT NULL,
    "compensationAmount" DOUBLE PRECISION NOT NULL,
    "userAdress" TEXT NOT NULL,
    "insuranceId" INTEGER NOT NULL,
    "assetId" INTEGER NOT NULL,

    CONSTRAINT "Compensation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Compensation_insuranceId_key" ON "Compensation"("insuranceId");

-- AddForeignKey
ALTER TABLE "Compensation" ADD CONSTRAINT "Compensation_insuranceId_fkey" FOREIGN KEY ("insuranceId") REFERENCES "Insurance"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
