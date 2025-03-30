/*
  Warnings:

  - The primary key for the `Otp` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Otp" DROP CONSTRAINT "Otp_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Otp_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Otp_id_seq";
