/*
  Warnings:

  - You are about to drop the column `certifications` on the `Therapist` table. All the data in the column will be lost.
  - You are about to drop the column `languagesSpoken` on the `Therapist` table. All the data in the column will be lost.
  - You are about to drop the column `minimumAgeServed` on the `Therapist` table. All the data in the column will be lost.
  - You are about to drop the column `profileImageUrl` on the `Therapist` table. All the data in the column will be lost.
  - You are about to drop the column `providesInHomeServices` on the `Therapist` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Therapist` table. All the data in the column will be lost.
  - You are about to drop the column `website` on the `Therapist` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Therapist" DROP COLUMN "certifications",
DROP COLUMN "languagesSpoken",
DROP COLUMN "minimumAgeServed",
DROP COLUMN "profileImageUrl",
DROP COLUMN "providesInHomeServices",
DROP COLUMN "type",
DROP COLUMN "website";
