-- CreateTable
CREATE TABLE "UserGames" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "games_list_id" INTEGER NOT NULL,

    CONSTRAINT "UserGames_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserGames" ADD CONSTRAINT "UserGames_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGames" ADD CONSTRAINT "UserGames_games_list_id_fkey" FOREIGN KEY ("games_list_id") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
