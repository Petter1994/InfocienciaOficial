/*
  Warnings:

  - You are about to drop the column `grade` on the `Center` table. All the data in the column will be lost.
  - Made the column `area` on table `Center` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Center" DROP COLUMN "grade",
ADD COLUMN     "discipline" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "investigationLine" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "investigators" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "investigatorsDoc" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "investigatorsMaster" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mission" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "projects" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "results" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "services" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "strategy" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "vision" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "area" SET NOT NULL,
ALTER COLUMN "area" SET DEFAULT '';
