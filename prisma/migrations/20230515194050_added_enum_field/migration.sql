/*
  Warnings:

  - Changed the type of `deliveryMethod` on the `Order` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "deliveryMethod",
ADD COLUMN     "deliveryMethod" "DeliveryMethod" NOT NULL;
