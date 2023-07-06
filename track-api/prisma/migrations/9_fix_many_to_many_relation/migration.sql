/*
  Warnings:

  - You are about to drop the column `games_id` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `games_id` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `genre_id` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `games_list_id` on the `UserGames` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[game_id,name,genre_id]` on the table `Genre` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[game_id,name]` on the table `Platform` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[game_id,name,company_id]` on the table `Publisher` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[game_id,date]` on the table `ReleaseDate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,game_id]` on the table `UserGames` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `game_id` to the `Genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_id` to the `Platform` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform_id` to the `Platform` table without a default value. This is not possible if the table is not empty.
  - Made the column `date` on table `ReleaseDate` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `game_id` to the `UserGames` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_games_id_fkey";

-- DropForeignKey
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_games_id_fkey";

-- DropForeignKey
ALTER TABLE "Publisher" DROP CONSTRAINT "Publisher_game_id_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseDate" DROP CONSTRAINT "ReleaseDate_game_id_fkey";

-- DropForeignKey
ALTER TABLE "UserGames" DROP CONSTRAINT "UserGames_games_list_id_fkey";

-- DropIndex
DROP INDEX "UserGames_userId_games_list_id_key";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "games_id",
ADD COLUMN     "game_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "games_id",
DROP COLUMN "genre_id",
ADD COLUMN     "game_id" INTEGER NOT NULL,
ADD COLUMN     "platform_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ReleaseDate" ALTER COLUMN "date" SET NOT NULL;

-- AlterTable
ALTER TABLE "UserGames" DROP COLUMN "games_list_id",
ADD COLUMN     "game_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "_GamesToReleaseDate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToPublisher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToPlatform" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToGenre" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToReleaseDate_AB_unique" ON "_GamesToReleaseDate"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToReleaseDate_B_index" ON "_GamesToReleaseDate"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToPublisher_AB_unique" ON "_GamesToPublisher"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToPublisher_B_index" ON "_GamesToPublisher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToPlatform_AB_unique" ON "_GamesToPlatform"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToPlatform_B_index" ON "_GamesToPlatform"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToGenre_AB_unique" ON "_GamesToGenre"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToGenre_B_index" ON "_GamesToGenre"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Genre_game_id_name_genre_id_key" ON "Genre"("game_id", "name", "genre_id");

-- CreateIndex
CREATE UNIQUE INDEX "Platform_game_id_name_key" ON "Platform"("game_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Publisher_game_id_name_company_id_key" ON "Publisher"("game_id", "name", "company_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReleaseDate_game_id_date_key" ON "ReleaseDate"("game_id", "date");

-- CreateIndex
CREATE UNIQUE INDEX "UserGames_userId_game_id_key" ON "UserGames"("userId", "game_id");

-- AddForeignKey
ALTER TABLE "UserGames" ADD CONSTRAINT "UserGames_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToReleaseDate" ADD CONSTRAINT "_GamesToReleaseDate_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToReleaseDate" ADD CONSTRAINT "_GamesToReleaseDate_B_fkey" FOREIGN KEY ("B") REFERENCES "ReleaseDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPublisher" ADD CONSTRAINT "_GamesToPublisher_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPublisher" ADD CONSTRAINT "_GamesToPublisher_B_fkey" FOREIGN KEY ("B") REFERENCES "Publisher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPlatform" ADD CONSTRAINT "_GamesToPlatform_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPlatform" ADD CONSTRAINT "_GamesToPlatform_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGenre" ADD CONSTRAINT "_GamesToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGenre" ADD CONSTRAINT "_GamesToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
