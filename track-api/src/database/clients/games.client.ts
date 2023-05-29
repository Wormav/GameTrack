import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

export async function getGamesInDb(gameName: string, offset: number) {
  try {
    const res = await prisma.games.findMany({
      where: {
        title: {
          mode: "insensitive",
          contains: gameName
        }
      },
      include: {
        release_date: true,
        platform: true,
        genre: true,
        publisher: true
      },
      take: 10,
      skip: offset
    });
    return res;
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}


export async function getOneGameInDb(id: number){
  try {
    const res = await prisma.games.findUnique({
      where:{
        id: id
      },
      include: {
        release_date : true,
        platform : true, 
        genre : true,
        publisher: true
      }
    });
    return res 
  } catch (error) {
    console.error(error);
    return null;
  } finally {
    await prisma.$disconnect();
  }
}