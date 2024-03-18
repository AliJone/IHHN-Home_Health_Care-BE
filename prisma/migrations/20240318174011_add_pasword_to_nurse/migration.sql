/*
  Warnings:

  - Added the required column `password` to the `Nurse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Nurse" ADD COLUMN     "password" TEXT NOT NULL;
