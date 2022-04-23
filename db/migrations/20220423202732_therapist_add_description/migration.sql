/*
  Warnings:

  - Added the required column `description` to the `Therapist` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Therapist" ADD COLUMN     "description" TEXT NOT NULL;
