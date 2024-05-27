-- AlterTable
ALTER TABLE "Administration" ADD COLUMN     "scheduleId" INTEGER;

-- AddForeignKey
ALTER TABLE "Administration" ADD CONSTRAINT "Administration_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
