/*
  Warnings:

  - You are about to drop the column `content` on the `LegalDocument` table. All the data in the column will be lost.
  - Added the required column `fileUrl` to the `LegalDocument` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LegalDocument" DROP COLUMN "content",
ADD COLUMN     "fileUrl" TEXT NOT NULL;
