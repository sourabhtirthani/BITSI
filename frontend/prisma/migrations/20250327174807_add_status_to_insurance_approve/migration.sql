-- CreateTable
CREATE TABLE "InsuranceApprove" (
    "id" SERIAL NOT NULL,
    "address" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InsuranceApprove_pkey" PRIMARY KEY ("id")
);
