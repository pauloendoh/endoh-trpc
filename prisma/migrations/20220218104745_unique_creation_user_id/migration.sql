/*
  Warnings:

  - A unique constraint covering the columns `[id,userId]` on the table `Creation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Creation_id_userId_key" ON "Creation"("id", "userId");
