/*
  Warnings:

  - You are about to drop the column `genre_id` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `platform_id` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `publisher` on the `Games` table. All the data in the column will be lost.
  - You are about to drop the column `release_date` on the `Games` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[game_id]` on the table `Games` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Games" DROP COLUMN "genre_id",
DROP COLUMN "platform_id",
DROP COLUMN "publisher",
DROP COLUMN "release_date";

-- CreateTable
CREATE TABLE "ReleaseDate" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3),
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "ReleaseDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InvolvedCompanies" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "InvolvedCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Games_game_id_key" ON "Games"("game_id");

-- AddForeignKey
ALTER TABLE "ReleaseDate" ADD CONSTRAINT "ReleaseDate_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvolvedCompanies" ADD CONSTRAINT "InvolvedCompanies_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
