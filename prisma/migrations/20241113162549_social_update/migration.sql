/*
  Warnings:

  - Added the required column `youtubeUrl` to the `SocialMedia` table without a default value. This is not possible if the table is not empty.
  - Made the column `instagramUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `twitterUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tiktokUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telegramUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `snapchatUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SocialMedia" ADD COLUMN     "youtubeUrl" TEXT NOT NULL,
ALTER COLUMN "instagramUrl" SET NOT NULL,
ALTER COLUMN "twitterUrl" SET NOT NULL,
ALTER COLUMN "tiktokUrl" SET NOT NULL,
ALTER COLUMN "telegramUrl" SET NOT NULL,
ALTER COLUMN "snapchatUrl" SET NOT NULL;
