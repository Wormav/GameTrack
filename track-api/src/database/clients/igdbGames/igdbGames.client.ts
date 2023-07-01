import { PrismaClient } from '@prisma/client'
import { IGame, IGenre, IInvolvedCompanies, IPlatforms, IReleaseDate } from './igdbGames.interface';

export const prisma = new PrismaClient()

export async function addGame({
  gameId, title, description, release_dates, involvedCompanies, platforms, genres, multiplayer, cover, thumbnail
}: IGame) {
  if (!title)
    return;
  const data = {
    game_id: gameId,
    title,
    description: description ?? "",
    genre: {
      create: (genres ?? []).map((el: IGenre) => ({
        genre_id: el.id,
        name: el.name,
        logo: "",
      }))
    },
    platform: {
      create: (platforms ?? []).map((el: IPlatforms) => {
        return {
          genre_id: el.id,
          name: el.name,
          logo: "",
        }
      })
    },
    release_date: {
      create: (release_dates ?? []).map((el: IReleaseDate) => ({
        date: el.date ? new Date(el.date) : null,

      }))
    },
    update_at: new Date(Date.now()),
    publisher: {
      create: (involvedCompanies ?? []).map((el: IInvolvedCompanies) => {
        return {
          company_id: el.company.id,
          name: el.company.name,

        }
      })
    },
    thumbnail: thumbnail ?? "",
    cover: cover ?? "",
    multiplayer
  }
  try {
    const game = await prisma.games.upsert({
      where: { game_id: gameId },
      update: data,
      create: {
        game_id: gameId,
        title,
        description: description ?? "",
        genre: {
          create: (genres ?? []).map((el: IGenre) => ({
            genre_id: el.id,
            name: el.name,
            logo: "",
          }))
        },
        platform: {
          create: (platforms ?? []).map((el: IPlatforms) => {
            return {
              genre_id: el.id,
              name: el.name,
              logo: "",
            }
          })
        },
        release_date: {
          create: (release_dates ?? []).map((el: IReleaseDate) => ({
            date: el.date ? new Date(el.date) : null,

          }))
        },
        update_at: new Date(Date.now()),
        publisher: {
          create: (involvedCompanies ?? []).map((el: IInvolvedCompanies) => {
            return {
              company_id: el.company.id,
              name: el.company.name,

            }
          })
        },
        thumbnail: thumbnail ?? "",
        cover: cover ?? "",
        multiplayer
      },
    })
    return game
  } catch (error) {
    console.error(error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}
