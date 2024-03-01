/*
  Warnings:

  - You are about to drop the column `isFromYesterday` on the `RecurrentDiaryEntry` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DiaryEntry" ADD COLUMN     "isFromYesterday" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RecurrentDiaryEntry" DROP COLUMN "isFromYesterday";
