/*
  Warnings:

  - Made the column `instagramUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `twitterUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tiktokUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `telegramUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `snapchatUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.
  - Made the column `youtubeUrl` on table `SocialMedia` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SocialMedia" ALTER COLUMN "instagramUrl" SET NOT NULL,
ALTER COLUMN "instagramUrl" DROP DEFAULT,
ALTER COLUMN "twitterUrl" SET NOT NULL,
ALTER COLUMN "twitterUrl" DROP DEFAULT,
ALTER COLUMN "tiktokUrl" SET NOT NULL,
ALTER COLUMN "tiktokUrl" DROP DEFAULT,
ALTER COLUMN "telegramUrl" SET NOT NULL,
ALTER COLUMN "telegramUrl" DROP DEFAULT,
ALTER COLUMN "snapchatUrl" SET NOT NULL,
ALTER COLUMN "snapchatUrl" DROP DEFAULT,
ALTER COLUMN "youtubeUrl" SET NOT NULL,
ALTER COLUMN "youtubeUrl" DROP DEFAULT;
