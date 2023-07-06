import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function getGamesInDb(gameName: string, offset: number) {
  try {
    const cleanedGameName = gameName
      .replace(/[^a-zA-Z0-9 ]/g, "")
      .replace(/\s+/g, " ")
      .trim();

    const keywords = cleanedGameName.split(" ");

    const res = await prisma.games.findMany({
      where: {
        AND: keywords.map((keyword) => ({
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        })),
      },
      include: {
        release_date: true,
        platform: true,
        genre: true,
        publisher: true,
      },
      take: 10,
      skip: offset,
    });
    return res;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getOneGameInDb(id: number) {
  try {
    const res = await prisma.games.findUnique({
      where: {
        id: id,
      },
      include: {
        release_date: true,
        platform: true,
        genre: true,
        publisher: true,
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
export async function getUserGames(id: number) {
  try {
    const res = await prisma.userGames.findMany({
      where: {
        userId: id,
      },
      include: {
        game: true,
      },
    });
    if (res) {
      return res.map((userGame) => userGame.game);
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function createUserGames(userId: number, gameId: number) {
  try {
    const res = await prisma.userGames.create({
      data: {
        user: { connect: { id: userId } },
        game: { connect: { id: gameId } },
      },
    });
    return res;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteUserGames(userId: number, gameId: number) {
  try {
    const row = await prisma.userGames.findFirst({
      where: {
        userId : userId,
        game_id: gameId
      }
    });
    if(row){
      const res = await prisma.userGames.delete({
        where: {
          id: row.id
        }
      })
      return res;
    }
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
