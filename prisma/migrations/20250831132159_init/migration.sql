-- CreateEnum
CREATE TYPE "public"."Transport" AS ENUM ('Bus', 'Train', 'Metro', 'Other');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('pending', 'in_progress', 'resolved');

-- CreateEnum
CREATE TYPE "public"."IssueType" AS ENUM ('busdelay', 'Overcrowding', 'RudeStaff', 'UncleanVehicle', 'FaultyAC', 'Other');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "phone" INTEGER,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "role" TEXT NOT NULL DEFAULT 'user',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Complaint" (
    "id" SERIAL NOT NULL,
    "transport" "public"."Transport" NOT NULL,
    "issueType" "public"."IssueType" NOT NULL,
    "vehicleNo" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "dateOfIncident" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "mediaFiles" JSONB,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "contactName" TEXT NOT NULL DEFAULT 'Anonymous',
    "contactEmail" TEXT NOT NULL DEFAULT 'Anonymous',
    "status" "public"."Status" NOT NULL DEFAULT 'pending',
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "inProgressAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "remarkId" INTEGER,

    CONSTRAINT "Complaint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Remark" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "addedBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Remark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Complaint_remarkId_key" ON "public"."Complaint"("remarkId");

-- AddForeignKey
ALTER TABLE "public"."Complaint" ADD CONSTRAINT "Complaint_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Complaint" ADD CONSTRAINT "Complaint_remarkId_fkey" FOREIGN KEY ("remarkId") REFERENCES "public"."Remark"("id") ON DELETE SET NULL ON UPDATE CASCADE;
