/*
  Warnings:

  - Changed the type of `date` on the `Creation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Creation" DROP COLUMN "date",
ADD COLUMN     "date" TIMESTAMP(3) ;
