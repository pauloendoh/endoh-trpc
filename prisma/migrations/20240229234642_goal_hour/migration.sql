/*
  Warnings:

  - You are about to drop the column `limitHour` on the `DiaryDayConfig` table. All the data in the column will be lost.
  - You are about to drop the column `limitHour` on the `DiaryGlobalConfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DiaryDayConfig" DROP COLUMN "limitHour",
ADD COLUMN     "goalHour" INTEGER NOT NULL DEFAULT 21;

-- AlterTable
ALTER TABLE "DiaryGlobalConfig" DROP COLUMN "limitHour",
ADD COLUMN     "goalHour" INTEGER NOT NULL DEFAULT 21;
