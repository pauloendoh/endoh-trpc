-- AlterTable
ALTER TABLE "DiaryDayConfig" ADD COLUMN     "limitHour" INTEGER NOT NULL DEFAULT 23;

-- AlterTable
ALTER TABLE "DiaryGlobalConfig" ADD COLUMN     "limitHour" INTEGER NOT NULL DEFAULT 23;
