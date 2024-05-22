-- AlterTable
ALTER TABLE "Administration" ADD COLUMN     "nurseId" INTEGER;

-- AddForeignKey
ALTER TABLE "Administration" ADD CONSTRAINT "Administration_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "Nurse"("id") ON DELETE SET NULL ON UPDATE CASCADE;
