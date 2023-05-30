/*
  Warnings:

  - A unique constraint covering the columns `[userId,games_list_id]` on the table `UserGames` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserGames_userId_games_list_id_key" ON "UserGames"("userId", "games_list_id");
