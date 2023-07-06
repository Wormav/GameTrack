import { PrismaClient , Prisma} from '@prisma/client';
import { IGame, IGenre, IPublisher, IPlatforms, IReleaseDate } from './igdbGames.interface';

export const prisma = new PrismaClient();

export async function addGame({
  gameId, title, description, release_dates, publisher, platforms, genres, multiplayer, cover, thumbnail
}: IGame) {
  if (!title) {
    return null;
  }
  const gameData = {
    game_id: gameId,
    title,
    description: description ?? "",
    release_date: {
      connectOrCreate: release_dates?.map((el: IReleaseDate) => ({
        where: { 
          game_id_date: {
            date: new Date(el.date),
            game_id: gameId,
          }
        },
        create: {
          date: el.date ? new Date(el.date) : null,
          game_id: gameId,
        }
      }))
    },
    publisher: {
      connectOrCreate: publisher?.map((el: IPublisher) => ({
        where: { 
          game_id_name_company_id: {
            name: el.company.name,
            game_id: gameId,
            company_id: el.company.id
          }
        },
        create: {
          company_id: el.company.id,
          name: el.company.name,
          game_id: gameId,
        }
      }))
    },
    platform: {
      connectOrCreate: platforms?.map((el: IPlatforms) => ({
        where: { 
          game_id_name: {
            name: el.name,
            game_id: gameId
          }
        },
        create: {
          platform_id: el.id,
          name: el.name,
          logo: "",
          game_id: gameId
        }
      }))
    },
    genre: {
      connectOrCreate: genres?.map((el: IGenre) => ({
        where: { 
          game_id_name_genre_id: {
            genre_id: el.id,
            name: el.name,
            game_id: gameId
          }
        },
        create: {
          genre_id: el.id,
          name: el.name,
          logo: "",
          game_id: gameId,
        }
      }))
    },
    multiplayer,
    cover: cover ?? "",
    thumbnail: thumbnail ?? "",
    update_at: new Date(),
  };

  try {
    const game = await prisma.games.upsert({
      where: { game_id: gameId },
      update: gameData as Prisma.GamesUpdateInput,
      create: gameData as Prisma.GamesCreateInput,
    });
    return game;
  } catch (error) {
    console.log(gameId, title, release_dates, publisher, platforms, genres, multiplayer, cover, thumbnail)
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
