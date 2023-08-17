import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export interface gamesTimeInterface {
  mainStory?: number;
  mainExtra?: number;
  completionist?: number;
  solo?: number;
  coop?: number;
  vs?: number;
}

export async function updateCompletionTime(
  id: number,
  gameId: number,
  times: gamesTimeInterface | undefined,
  done: boolean | undefined
) {

  const timesData = {
    main_story: times?.mainStory,        
    main_extra: times?.mainExtra,        
    completionist: times?.completionist  ,
    solo: times?.solo,
    coop: times?.coop,
    vs: times?.vs
  }

  try {
    const userGame = await prisma.userGames.upsert({
      where: {
        user_id_game_id: {
          user_id: id,
          game_id: gameId
        }
      },
      create: {
        done: done,
        game_time: {
          create: timesData
        },
        user: {
          connect: {
            id: id
          }
        },
        game: {
          connect: {
            game_id: gameId
          }
        }
      },
      update: {
        done: done,
        game_time: {
          upsert: {
            create: timesData,
            update: timesData
          }
        }
      }
    });
    return userGame;
  } catch (error) {
    console.error("updateUserGameTime error", error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


export async function getUserGames(id: number) {
  try {
    const res = await prisma.userGames.findMany({
      where: {
        user_id: id,
      },
      include: {
        game: true,
        game_time: true,
      },
    });
    if (res) {
      return res.map((userGame) => userGame);
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
        user_id: userId,
        game_id: gameId
      }
    });
    if (row) {
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
