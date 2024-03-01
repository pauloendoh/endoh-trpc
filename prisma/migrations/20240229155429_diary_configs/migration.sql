-- CreateTable
CREATE TABLE "DiaryDayConfig" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pointsPerHour" DOUBLE PRECISION NOT NULL,
    "availableHours" DOUBLE PRECISION NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiaryDayConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryGlobalConfig" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "pointsPerHour" DOUBLE PRECISION NOT NULL,
    "availableHours" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DiaryGlobalConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiaryGlobalConfig_userId_key" ON "DiaryGlobalConfig"("userId");

-- AddForeignKey
ALTER TABLE "DiaryDayConfig" ADD CONSTRAINT "DiaryDayConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryGlobalConfig" ADD CONSTRAINT "DiaryGlobalConfig_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
