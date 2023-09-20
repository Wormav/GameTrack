-- CreateTable
CREATE TABLE "UserList" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "backgroundColor" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,
    "games_id" INTEGER NOT NULL,

    CONSTRAINT "UserList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserList_user_id_name_key" ON "UserList"("user_id", "name");

-- AddForeignKey
ALTER TABLE "UserList" ADD CONSTRAINT "UserList_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserList" ADD CONSTRAINT "UserList_games_id_fkey" FOREIGN KEY ("games_id") REFERENCES "Games"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
