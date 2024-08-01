-- CreateEnum
CREATE TYPE "ClothingType" AS ENUM ('home', 'outside');

-- AlterTable
ALTER TABLE "Clothing" ADD COLUMN     "type" "ClothingType" NOT NULL DEFAULT 'home';
