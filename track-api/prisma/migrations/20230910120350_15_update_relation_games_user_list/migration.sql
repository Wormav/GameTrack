/*
  Warnings:

  - You are about to drop the column `games_id` on the `UserList` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserList" DROP CONSTRAINT "UserList_games_id_fkey";

-- AlterTable
ALTER TABLE "UserList" DROP COLUMN "games_id";

-- CreateTable
CREATE TABLE "_GamesToUserList" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GamesToUserList_AB_unique" ON "_GamesToUserList"("A", "B");

-- CreateIndex
CREATE INDEX "_GamesToUserList_B_index" ON "_GamesToUserList"("B");

-- AddForeignKey
ALTER TABLE "_GamesToUserList" ADD CONSTRAINT "_GamesToUserList_A_fkey" FOREIGN KEY ("A") REFERENCES "Games"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GamesToUserList" ADD CONSTRAINT "_GamesToUserList_B_fkey" FOREIGN KEY ("B") REFERENCES "UserList"("id") ON DELETE CASCADE ON UPDATE CASCADE;
