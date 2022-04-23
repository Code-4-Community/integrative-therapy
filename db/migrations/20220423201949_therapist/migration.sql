-- CreateEnum
CREATE TYPE "TherapyType" AS ENUM ('SOMETHING');

-- CreateEnum
CREATE TYPE "Language" AS ENUM ('ENGLISH', 'FRENCH', 'SPANISH');

-- CreateTable
CREATE TABLE "Location" (
    "id" SERIAL NOT NULL,
    "zipCode" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Therapist" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "type" "TherapyType" NOT NULL,
    "locationId" INTEGER NOT NULL,
    "website" TEXT NOT NULL,
    "providesInHomeServices" BOOLEAN NOT NULL,
    "languagesSpoken" "Language"[],
    "certifications" TEXT[],
    "minimumAgeServed" INTEGER NOT NULL,
    "profileImageUrl" TEXT,

    CONSTRAINT "Therapist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Therapist_locationId_key" ON "Therapist"("locationId");

-- AddForeignKey
ALTER TABLE "Therapist" ADD CONSTRAINT "Therapist_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
