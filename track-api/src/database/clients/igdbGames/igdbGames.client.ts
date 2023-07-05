import { PrismaClient , Prisma} from '@prisma/client';
import { IGame, IGenre, IInvolvedCompanies, IPlatforms, IReleaseDate } from './igdbGames.interface';

export const prisma = new PrismaClient();

export async function addGame({
  gameId, title, description, release_dates, involvedCompanies, platforms, genres, multiplayer, cover, thumbnail
}: IGame) {
  if (!title) {
    return null;
  }

  const gameData: Prisma.GamesCreateInput = {
    game_id: gameId,
    title,
    description: description ?? "",
    release_date: {
      create: release_dates?.map((el: IReleaseDate) => ({
        date: el.date ? new Date(el.date) : null,
        game_id: gameId,
      })),
    },
    publisher: {
      create: involvedCompanies?.map((el: IInvolvedCompanies) => ({
        company_id: el.company.id,
        name: el.company.name,
        game_id: gameId,
      })),
    },
    platform: {
      create: platforms?.map((el: IPlatforms) => ({
        genre_id: el.id,
        name: el.name,
        logo: "",
        game_id: gameId,
      })),
    },
    genre: {
      create: genres?.map((el: IGenre) => ({
        genre_id: el.id,
        name: el.name,
        logo: "",
        game_id: gameId,
      })),
    },
    multiplayer,
    cover: cover ?? "",
    thumbnail: thumbnail ?? "",
    update_at: new Date(),
  };

  try {
    const game = await prisma.games.upsert({
      where: { game_id: gameId },
      update: gameData,
      create: gameData,
    });
    return game;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}
