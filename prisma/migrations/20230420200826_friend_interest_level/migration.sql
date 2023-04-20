/*
  Warnings:

  - Added the required column `friendInterestLevel` to the `FriendInterest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "FriendInterest" ADD COLUMN     "friendInterestLevel" INTEGER NOT NULL;
