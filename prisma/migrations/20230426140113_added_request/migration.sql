/*
  Warnings:

  - Added the required column `birthdate` to the `Client` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "birthdate" DATE NOT NULL;

-- CreateTable
CREATE TABLE "Request" (
    "id" SERIAL NOT NULL,
    "dessertId" INTEGER NOT NULL DEFAULT 0,
    "mondayCount" INTEGER NOT NULL DEFAULT 0,
    "tuesdayCount" INTEGER NOT NULL DEFAULT 0,
    "wednesdayCount" INTEGER NOT NULL DEFAULT 0,
    "thursdayCount" INTEGER NOT NULL DEFAULT 0,
    "fridayCount" INTEGER NOT NULL DEFAULT 0,
    "saturdayCount" INTEGER NOT NULL DEFAULT 0,
    "sundayCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Request_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_dessertId_fkey" FOREIGN KEY ("dessertId") REFERENCES "Dessert"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
