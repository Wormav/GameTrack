/*
  Warnings:

  - You are about to drop the column `userId` on the `UserGames` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,game_id]` on the table `UserGames` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `UserGames` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserGames" DROP CONSTRAINT "UserGames_userId_fkey";

-- DropIndex
DROP INDEX "UserGames_userId_game_id_key";

-- AlterTable
ALTER TABLE "UserGames" DROP COLUMN "userId",
ADD COLUMN     "done" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "UserGameTime" (
    "id" SERIAL NOT NULL,
    "user_game_id" INTEGER NOT NULL,
    "main_story" DOUBLE PRECISION,
    "main_extra" DOUBLE PRECISION,
    "completionist" DOUBLE PRECISION,
    "single_player" DOUBLE PRECISION,
    "solo" DOUBLE PRECISION,
    "coOp" DOUBLE PRECISION,
    "all_styles" DOUBLE PRECISION,

    CONSTRAINT "UserGameTime_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserGameTime_user_game_id_key" ON "UserGameTime"("user_game_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserGames_user_id_game_id_key" ON "UserGames"("user_id", "game_id");

-- AddForeignKey
ALTER TABLE "UserGames" ADD CONSTRAINT "UserGames_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserGameTime" ADD CONSTRAINT "UserGameTime_user_game_id_fkey" FOREIGN KEY ("user_game_id") REFERENCES "UserGames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
