/*
  Warnings:

  - You are about to drop the column `lastCompletedAt` on the `FriendInterest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "lastCompletedAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "FriendInterest" DROP COLUMN "lastCompletedAt";
