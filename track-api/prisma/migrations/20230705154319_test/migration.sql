/*
  Warnings:

  - You are about to drop the column `games_id` on the `Genre` table. All the data in the column will be lost.
  - You are about to drop the column `games_id` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the `InvolvedCompanies` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `game_id` to the `Genre` table without a default value. This is not possible if the table is not empty.
  - Added the required column `game_id` to the `Platform` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_games_id_fkey";

-- DropForeignKey
ALTER TABLE "InvolvedCompanies" DROP CONSTRAINT "InvolvedCompanies_game_id_fkey";

-- DropForeignKey
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_games_id_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseDate" DROP CONSTRAINT "ReleaseDate_game_id_fkey";

-- AlterTable
ALTER TABLE "Genre" DROP COLUMN "games_id",
ADD COLUMN     "game_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "games_id",
ADD COLUMN     "game_id" INTEGER NOT NULL;

-- DropTable
DROP TABLE "InvolvedCompanies";

-- CreateTable
CREATE TABLE "Publisher" (
    "id" SERIAL NOT NULL,
    "company_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "game_id" INTEGER NOT NULL,

    CONSTRAINT "Publisher_pkey" PRIMARY KEY ("id")
);

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
