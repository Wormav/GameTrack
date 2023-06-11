import { PrismaClient } from '@prisma/client'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

export const prisma = new PrismaClient()


interface ErrorMessagesInterface {
  code: string;
  message: string;
}
function handlePrismaError(error: PrismaClientKnownRequestError, error_messages: ErrorMessagesInterface[] = []){
  /**
   * return string error depending ofthe code error of PrismaClientKnownRequestError
   * params:
   * error: Prisma request error
   * error_messages: array of error messages return depending of error code of Prisma
   */

  const errorCode = error.code

  const error_message = error_messages.find((value)=> value.code === errorCode)
  return error_message?.message ?? "Une erreur est survenue..."
}

interface createUserInterface {
    email: string;
    username: string;
    password: string;
    is_active?: boolean;
    picture?: string;
    created_at?: Date;
    updated_at?: Date;
}

export async function addUserInDb({
    email,
    username,
    password,
    is_active = true,
    picture = '',
    created_at = new Date(),
    updated_at = new Date(),
}: createUserInterface) {
  try {
    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: password,
        is_active: is_active,
        picture: picture,
        created_at: created_at,
        updated_at: updated_at,
      },
    })
    return { status: true, user: user, error: '' }
  } catch (error) {
    return ({
      status: false,
      user: null,
      error: handlePrismaError(
        error as PrismaClientKnownRequestError,
        [{code: 'P2002', message: "Email ou Pseudo déjà enregistré"}]
        )
      })
  } finally {
    await prisma.$disconnect()
  }
}

export async function deleteUserInDb(pseudo: string){
  try {
    const res = await prisma.user.delete({ where: { username: pseudo } })
    return true
  } catch (error) {
    return false
  } finally {
    await prisma.$disconnect()
  }
}


export async function getUserWithEmail(email:string){
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      }
    })
    return user
  } catch (error) {
    return null
  } finally {
    await prisma.$disconnect()
  }
}

export async function getUserWithId(id:number){
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      }
    })
    return user
  } catch (error) {
    return null
  } finally {
    await prisma.$disconnect()
  }
}