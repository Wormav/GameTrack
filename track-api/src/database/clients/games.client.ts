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

    const totalCount = await prisma.games.count({
      where: {
        AND: keywords.map((keyword) => ({
          title: {
            contains: keyword,
            mode: "insensitive",
          },
        })),
      },
    });

    const remainingCount = totalCount - offset - 10; 
    return {
      games: res,
      hasNextPage: remainingCount > 0,
    }
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
        games_list: true,
      },
    });
    if (res) {
      return res.map((userGame) => userGame.games_list);
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

export async function createUserGames(userId: number, gameListId: number) {
  try {
    const res = await prisma.userGames.create({
      data: {
        user: { connect: { id: userId } },
        games_list: { connect: { id: gameListId } },
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

export async function deleteUserGames(userId: number, gameListId: number) {
  try {
    const row = await prisma.userGames.findFirst({
      where: {
        userId : userId,
        games_list_id: gameListId
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
