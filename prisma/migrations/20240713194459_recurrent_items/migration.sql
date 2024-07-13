-- CreateTable
CREATE TABLE "RecurrentItem" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "everyNDays" INTEGER NOT NULL,
    "nextDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecurrentItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecurrentItem" ADD CONSTRAINT "RecurrentItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
