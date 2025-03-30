-- AlterTable
ALTER TABLE "User" ADD COLUMN     "ifKYCVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isInvestor" BOOLEAN NOT NULL DEFAULT false;
