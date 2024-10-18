/*
  Warnings:

  - You are about to drop the column `time` on the `rooms` table. All the data in the column will be lost.
  - Added the required column `time-end` to the `rooms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time-start` to the `rooms` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "time",
ADD COLUMN     "time-end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "time-start" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weekDays" TEXT[];
