/*
  Warnings:

  - You are about to drop the column `date` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "date",
ADD COLUMN     "dateEnd" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dateStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
