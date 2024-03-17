-- CreateEnum
CREATE TYPE "Role" AS ENUM ('NURSE', 'HEADNURSE');

-- CreateEnum
CREATE TYPE "ScheduleStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELED', 'COMPLETED');

-- CreateTable
CREATE TABLE "Nurse" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cnic" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Nurse_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "causeOfIssue" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "dateOfAdmission" TIMESTAMP(3) NOT NULL,
    "diagnosis" TEXT NOT NULL,
    "dischargeSummary" TEXT NOT NULL,
    "medicationNotes" TEXT NOT NULL,
    "nurseId" INTEGER NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "status" "ScheduleStatus" NOT NULL,
    "nurseId" INTEGER NOT NULL,
    "patientId" INTEGER NOT NULL,
    "cancelNote" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Administration" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "patientId" INTEGER NOT NULL,

    CONSTRAINT "Administration_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminPoint" (
    "id" SERIAL NOT NULL,
    "administrationId" INTEGER NOT NULL,
    "note" TEXT NOT NULL,
    "picture" TEXT NOT NULL,
    "nurseNotes" TEXT NOT NULL,

    CONSTRAINT "AdminPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_cnic_key" ON "Nurse"("cnic");

-- CreateIndex
CREATE UNIQUE INDEX "Nurse_email_key" ON "Nurse"("email");

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "Nurse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_nurseId_fkey" FOREIGN KEY ("nurseId") REFERENCES "Nurse"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Administration" ADD CONSTRAINT "Administration_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdminPoint" ADD CONSTRAINT "AdminPoint_administrationId_fkey" FOREIGN KEY ("administrationId") REFERENCES "Administration"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
