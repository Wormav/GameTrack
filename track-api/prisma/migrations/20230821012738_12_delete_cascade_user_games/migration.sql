-- DropForeignKey
ALTER TABLE "UserGames" DROP CONSTRAINT "UserGames_user_id_fkey";

-- AddForeignKey
ALTER TABLE "UserGames" ADD CONSTRAINT "UserGames_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
