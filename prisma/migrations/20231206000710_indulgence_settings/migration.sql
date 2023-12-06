-- CreateTable
CREATE TABLE "IndulgenceSettings" (
    "userId" TEXT NOT NULL,
    "resetsOnDay" INTEGER NOT NULL,
    "maxPointsPerWeek" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "IndulgenceSettings_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "IndulgenceSettings" ADD CONSTRAINT "IndulgenceSettings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
