/*
  Warnings:

  - Changed the type of `time-end` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `time-start` on the `rooms` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "rooms" DROP COLUMN "time-end",
ADD COLUMN     "time-end" TIME NOT NULL,
DROP COLUMN "time-start",
ADD COLUMN     "time-start" TIME NOT NULL;
