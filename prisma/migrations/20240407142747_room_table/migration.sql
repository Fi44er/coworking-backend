/*
  Warnings:

  - You are about to drop the column `weekDays` on the `rooms` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "weekDays",
ADD COLUMN     "week-days" TEXT[];
