-- CreateEnum
CREATE TYPE "InsuranceStatus" AS ENUM ('ApprovalPending', 'Approved', 'Active');

-- AlterTable
ALTER TABLE "Insurance" ADD COLUMN     "status" "InsuranceStatus" NOT NULL DEFAULT 'ApprovalPending';
