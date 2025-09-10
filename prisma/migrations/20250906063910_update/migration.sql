/*
  Warnings:

  - You are about to drop the column `remarkId` on the `Complaint` table. All the data in the column will be lost.
  - Added the required column `complaintId` to the `Remark` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Complaint" DROP CONSTRAINT "Complaint_remarkId_fkey";

-- DropIndex
DROP INDEX "public"."Complaint_remarkId_key";

-- AlterTable
ALTER TABLE "public"."Complaint" DROP COLUMN "remarkId";

-- AlterTable
ALTER TABLE "public"."Remark" ADD COLUMN     "complaintId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "public"."Remark" ADD CONSTRAINT "Remark_complaintId_fkey" FOREIGN KEY ("complaintId") REFERENCES "public"."Complaint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
