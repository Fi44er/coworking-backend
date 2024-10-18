/*
  Warnings:

  - You are about to drop the column `time-end` on the `orders` table. All the data in the column will be lost.
  - Added the required column `duration` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `summaryEvent` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "time-end",
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "summaryEvent" TEXT NOT NULL;
