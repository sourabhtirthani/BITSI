-- CreateEnum
CREATE TYPE "ENUM_InvestorStatus" AS ENUM ('NonInvestor', 'Pending', 'Approved', 'Rejected');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "creditScore" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "investorStatus" "ENUM_InvestorStatus" NOT NULL DEFAULT 'NonInvestor';
