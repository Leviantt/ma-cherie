/*
  Warnings:

  - Added the required column `address` to the `Request` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "address" TEXT NOT NULL,
ALTER COLUMN "dessertId" DROP DEFAULT;
