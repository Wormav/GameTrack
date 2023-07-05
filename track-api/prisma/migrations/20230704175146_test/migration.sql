-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_games_id_fkey";

-- DropForeignKey
ALTER TABLE "InvolvedCompanies" DROP CONSTRAINT "InvolvedCompanies_game_id_fkey";

-- DropForeignKey
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_games_id_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseDate" DROP CONSTRAINT "ReleaseDate_game_id_fkey";

-- CreateTable
CREATE TABLE "_GamesToReleaseDate" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GamesToInvolvedCompanies" (
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
CREATE UNIQUE INDEX "_GamesToInvolvedCompanies_AB_unique" ON "_GamesToInvolvedCompanies"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToInvolvedCompanies_B_index" ON "_GamesToInvolvedCompanies"("B");

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
ALTER TABLE "_GamesToInvolvedCompanies" ADD CONSTRAINT "_GamesToInvolvedCompanies_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToInvolvedCompanies" ADD CONSTRAINT "_GamesToInvolvedCompanies_B_fkey" FOREIGN KEY ("B") REFERENCES "InvolvedCompanies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPlatform" ADD CONSTRAINT "_GamesToPlatform_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToPlatform" ADD CONSTRAINT "_GamesToPlatform_B_fkey" FOREIGN KEY ("B") REFERENCES "Platform"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGenre" ADD CONSTRAINT "_GamesToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToGenre" ADD CONSTRAINT "_GamesToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
