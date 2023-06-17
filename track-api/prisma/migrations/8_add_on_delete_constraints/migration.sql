-- DropForeignKey
ALTER TABLE "Genre" DROP CONSTRAINT "Genre_games_id_fkey";

-- DropForeignKey
ALTER TABLE "InvolvedCompanies" DROP CONSTRAINT "InvolvedCompanies_game_id_fkey";

-- DropForeignKey
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_games_id_fkey";

-- DropForeignKey
ALTER TABLE "ReleaseDate" DROP CONSTRAINT "ReleaseDate_game_id_fkey";

-- AlterTable
ALTER TABLE "Games" ADD COLUMN     "thumbnail" TEXT NOT NULL DEFAULT '';

-- AddForeignKey
ALTER TABLE "ReleaseDate" ADD CONSTRAINT "ReleaseDate_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InvolvedCompanies" ADD CONSTRAINT "InvolvedCompanies_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Platform" ADD CONSTRAINT "Platform_games_id_fkey" FOREIGN KEY ("games_id") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Genre" ADD CONSTRAINT "Genre_games_id_fkey" FOREIGN KEY ("games_id") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;
