/*
  Warnings:

  - You are about to drop the column `description` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `Order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[phone]` on the table `Client` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `phone` to the `Client` table without a default value. This is not possible if the table is not empty.
  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Client" ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "description",
DROP COLUMN "totalPrice",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "deliveryPrice" DECIMAL(65,30) NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Client_phone_key" ON "Client"("phone");
