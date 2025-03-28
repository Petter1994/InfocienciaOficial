/*
  Warnings:

  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PostTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_PostTags" DROP CONSTRAINT "_PostTags_A_fkey";

-- DropForeignKey
ALTER TABLE "_PostTags" DROP CONSTRAINT "_PostTags_B_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "tags" TEXT;

-- DropTable
DROP TABLE "Tag";

-- DropTable
DROP TABLE "_PostTags";
