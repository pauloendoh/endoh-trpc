/*
  Warnings:

  - You are about to drop the column `exerciseId` on the `ExerciseTag` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExerciseTag" DROP CONSTRAINT "ExerciseTag_exerciseId_fkey";

-- AlterTable
ALTER TABLE "ExerciseTag" DROP COLUMN "exerciseId";

-- CreateTable
CREATE TABLE "_ExerciseToExerciseTag" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_ExerciseToExerciseTag_AB_unique" ON "_ExerciseToExerciseTag"("A", "B");

-- CreateIndex
CREATE INDEX "_ExerciseToExerciseTag_B_index" ON "_ExerciseToExerciseTag"("B");

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseTag" ADD FOREIGN KEY ("A") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ExerciseToExerciseTag" ADD FOREIGN KEY ("B") REFERENCES "ExerciseTag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
