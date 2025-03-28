/*
  Warnings:

  - You are about to drop the column `description` on the `Center` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Center" DROP COLUMN "description",
ADD COLUMN     "area" TEXT,
ADD COLUMN     "grade" TEXT;

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "author" DROP NOT NULL;
