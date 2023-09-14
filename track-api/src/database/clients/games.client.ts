import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export async function getGamesInDb(gameName: string, offset: number) {
  try {
    const cleanedGameName = gameName
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, ' ')
      .trim();

    const keywords = cleanedGameName.split(' ');

    const res = await prisma.games.findMany({
      where: {
        AND: keywords.map((keyword) => ({
          title: {
            contains: keyword,
            mode: 'insensitive',
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
            mode: 'insensitive',
          },
        })),
      },
    });

    const remainingCount = totalCount - offset - 10;
    return {
      games: res,
      hasNextPage: remainingCount > 0,
    };
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function getOneGameInDb(
  id: number,
  fields: string[] = [
    'id',
    'game_id',
    'title',
    'description',
    'genre',
    'platform',
    'publisher',
    'release_date',
    'cover',
    'thumbnail',
    'update_at',
    'multiplayer',
    'user_games'],
) {
  try {
    const selectedFields = fields.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {} as Record<string, boolean>);
    const res = await prisma.games.findUnique({
      where: {
        id,
      },
      select: selectedFields,
    });
    return res;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}

export async function deleteGame(id: number | undefined, name: string | undefined) {
  if (!id && !name) {
    throw new Error('You must provide either an id or a name');
  }

  const game = await prisma.games.findFirst({
    where: {
      title: name,
      id,
    },
    select: {
      title: true,
      game_id: true,
    },
  });
  if (!game) {
    throw new Error('Game not found');
  }

  const { game_id } = game;

  try {
    Promise.all([
      prisma.userGames.deleteMany({
        where: {
          game_id,
        },
      }),
      prisma.releaseDate.deleteMany({
        where: {
          game_id,
        },
      }),
      prisma.publisher.deleteMany({
        where: {
          game_id,
        },
      }),
      prisma.genre.deleteMany({
        where: {
          game_id,
        },
      }),
      prisma.platform.deleteMany({
        where: {
          game_id,
        },
      }),
    ]).then(async () => {
      await prisma.games.delete({
        where: {
          game_id,
        },
      });
    }).catch((err) => {
      throw new Error(err as string);
    });

    return game.title;
  } catch (error) {
    console.error(error);
    return '';
  } finally {
    await prisma.$disconnect();
  }
}
