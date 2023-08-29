import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createUserListInDb(userId: number, listName: string, rowGameId?: number, backgroundColor = "#187B4F", icon = "joystick") {
  try {
    const userList = await prisma.userList.create({
      
      data: {
        user: { connect: { id: userId } },
        
        name: listName,
        backgroundColor: backgroundColor,
        icon: icon,
        games: {
          connect: {
            id: rowGameId
          }
        }
      }
    })
    return userList
  } catch (error) {
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
