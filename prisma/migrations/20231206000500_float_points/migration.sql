/*
  Warnings:

  - You are about to alter the column `points` on the `Indulgence` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Indulgence" ALTER COLUMN "points" SET DATA TYPE DOUBLE PRECISION;
