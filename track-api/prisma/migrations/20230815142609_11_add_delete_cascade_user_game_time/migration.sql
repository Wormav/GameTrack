-- DropForeignKey
ALTER TABLE "UserGameTime" DROP CONSTRAINT "UserGameTime_user_game_id_fkey";

-- AddForeignKey
ALTER TABLE "UserGameTime" ADD CONSTRAINT "UserGameTime_user_game_id_fkey" FOREIGN KEY ("user_game_id") REFERENCES "UserGames"("id") ON DELETE CASCADE ON UPDATE CASCADE;
