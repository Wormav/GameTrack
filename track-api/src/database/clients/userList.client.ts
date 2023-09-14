import { Prisma, PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createUserListInDb(userId: number, listName: string, rowGameId?: number, backgroundColor = "#187B4F", icon = "joystick") {
  try {
    await prisma.userList.create({  
      data: {
        name: listName,
        backgroundColor: backgroundColor,
        icon: icon,
        user: {
          connect: {
            id: userId
          },
        },
        games: {
          connect: rowGameId ? {
            id: rowGameId
          } : undefined
        } 
      }
    })
    return {'error': null}
  } catch (error) {
    if ((error as Prisma.PrismaClientKnownRequestError).code === "P2002") {
      return ({ 'error': 'List name already exists' })
    }
    console.error("createUserList error", error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

export async function deleteUserListInDb(userId: number, listName: string) {
  try {
    const userList = await prisma.userList.delete({
      where: {
        
        user_id_name: {
          user_id: userId,
          name: listName
        }
      }
    })
    return userList
  } catch (error) {
    console.error("deleteUserList error", error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

export async function updateUserListInDb(userId: number, listName: string, add: boolean, gameId?: number, newListName?: string, backgroundColor?: string, icon?: string) {
  
  try {
    await prisma.userList.update({
      where: {
        
        user_id_name: {
          user_id: userId,
          name: listName
        }
      },
      data: {
        name: newListName ?? undefined,
        backgroundColor: backgroundColor ?? undefined,
        icon: icon ?? undefined,
        games: {
          connect: add && gameId ? {
            id: gameId
          } : undefined,
          disconnect: !add && gameId ? {
            id: gameId
          } : undefined
        }
      }
    })
    return {'error': null};

  } catch (error) {
    if ((error as Prisma.PrismaClientKnownRequestError).code === "P2002") {
      return ({'error': 'List name already exists'})
    }
    console.log("updateUserList error", error)
    return null
  } finally {
    await prisma.$disconnect()
  }
}

export async function getUserListsInDb(userId: number) {
  try {
    const userLists = await prisma.userList.findMany(
      {
        where: {
          user_id: userId
        },
        include: {
          games: true
        }
      }
    )
    return userLists
  } catch (error) {
    console.error("getUserLists error", error)
    return null
  }
  finally {
    await prisma.$disconnect()
  }

}
