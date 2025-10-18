/*
  Warnings:

  - You are about to drop the column `techStack` on the `Job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "techStack",
ADD COLUMN     "applicationDeadline" TIMESTAMP(3),
ADD COLUMN     "jobLevel" TEXT,
ADD COLUMN     "salary" TEXT;
