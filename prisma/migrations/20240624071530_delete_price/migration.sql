/*
  Warnings:

  - You are about to drop the column `payment` on the `orders` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "payment";

-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "price";
