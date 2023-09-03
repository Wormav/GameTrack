import { User } from "@prisma/client"
import { Request, Response } from "express"
import { getOneGameInDb } from "../database/clients/games.client"
import { getTimeComplete } from "../queries/howlongtobeat"
import { createUserGames, deleteUserGames, gamesTimeInterface, getUserGames, updateCompletionTime } from "../database/clients/userGames.client"
import File from "../utils/file"
import { IUpdateUser, deleteUser, getCountAvatar, getUserWithId, updateUser } from "../database/clients/users.client"
import path from "path"
import mime from "mime";
import bcrypt from 'bcrypt';
import { createJwtToken } from "../utils/auth"
import { createUserListInDb, deleteUserListInDb, getUserListsInDb, updateUserListInDb } from "../database/clients/userList.client"

interface UserGameTimeRequestBody extends Request {
    body: {
      time?: gamesTimeInterface,
      done?: boolean
    }
}

export async function updateUserGameTime(req: UserGameTimeRequestBody, res: Response ) {
  const user = res.locals.user as User
  const id = user.id
  const gameId = req.params.id
  let time = req.body.time
  const done = req.body.done
  if (done === undefined && (!time || !time.mainStory)) {
    return res.status(400).json(
      { error: 'Missing parameters' }
    )
  }
  const game = await getOneGameInDb(parseInt(gameId, 10))
  if (!game) {
    return res.status(404).json(
      { error: 'Game not found' }
    )
  }
  if (!time) {
    const gameName = game.title
    const howLongToBeatGame = await getTimeComplete(gameName)
    if (!howLongToBeatGame) {      
      await updateCompletionTime(id, parseInt(gameId, 10), time, done)
      return res.status(206).json('No time found')
    }
    
    time = {
      mainStory: howLongToBeatGame.gameplayMain,
      mainExtra: howLongToBeatGame.gameplayMainExtra,
      completionist: howLongToBeatGame.gameplayCompletionist
    }
  }
  
  await updateCompletionTime(id, parseInt(gameId, 10), time, done)
  
  return res.status(200).json("ok");
}

export async function getAllUserGames(req: Request, res: Response) {
  const user = res.locals.user as User
  const id = user.id
  const result = await getUserGames(id)
  if (!result) {
    return res.status(400).json({ error: 'Failed get userGames' })
  }

  return res.status(200).json(result)
}

interface IRequestBody {
  gameId: number
}

export async function addGameInUserGames(req: Request, res: Response) {
  const requestBody: IRequestBody = req.body as IRequestBody;
  const gameId: number = requestBody.gameId;

  if (!gameId) return res.status(400).json(
    { error: 'Missing parameters' }
  )
  const user = res.locals.user as User
  const id = user.id
  const result = await createUserGames(id, gameId);

  if (!result) {
    return res.status(400).json({ error: 'Failed to add game to user' });
  }

  return res.status(200).json(result);
}

export async function deleteGameInUserGames(req: Request, res: Response) {
  const user = res.locals.user as User
  const id = user.id
  const gameId = req.query.gameId

  if (!gameId) return res.status(400).json(
    { error: 'Missing parameters' }
  )

  const result = await deleteUserGames(id, parseInt(gameId as string));
  if (!result) {
    return res.status(400).json({ error: 'Failed to delete game from user' });
  }
  return res.status(200).json(result);
}

export async function getUserAvatar(req: Request, res: Response) {
  
  const filename = req.query.filename
  const user = res.locals.user as User
  const userId = user.id
  const fullUser = await getUserWithId(userId)

  if (!fullUser) {
    return res.status(400).json(
      { error: 'Failed to get user' }
    )
  }

  if (filename !== fullUser.avatar) {
    return res.status(400).json(
      { error: 'Failed to get avatar' }
    )
  }
  const avatar = File.getStorageFilePath(File.avatarFolder, fullUser.avatar)
  const contentType = mime.getType(avatar)
  if (!contentType) {
    return res.status(400).json(
      { error: 'Failed to get avatar' }
    )
  }

  const fileStream = File.getFileStream(avatar)
  if (!fileStream) {
    return res.status(400).json(
      { error: 'Failed to get avatar' }
    )
  }
  fileStream.on('error', (error) => {
    console.error(`error during file stream for user [${userId}|${user.username}]`, error)
    return res.status(400).json(
      { error: 'Failed to get avatar' }
    )
  })
  res.setHeader('Content-Type', contentType)
  res.setHeader('Content-Disposition', 'inline')
  fileStream.pipe(res)

}

interface UpdateUserBody {
  pseudo?: string,
  password?: string,

}

export async function updateUserProfile(req: Request, res: Response) {
  const user = res.locals.user as User
  const id = user.id
  const newAvatar = req.file
  const { pseudo, password } = req.body as UpdateUserBody;
  if (!pseudo && !password && !newAvatar) {
    return res.status(400).json(
      { error: 'Missing parameters' }
    )
  }
  const data: IUpdateUser = {
    password: password ? await bcrypt.hash(password, 10) : undefined,
    username: pseudo,
  }

  if (newAvatar) {
    const tmpFilePath = newAvatar.path
    const f = new File(tmpFilePath)
    let finalName = await f.getFileNameFromData()
    if (!finalName) {
      return res.status(400).json(
        { error: 'Failed to get file' }
      )
    }
    finalName = `${finalName}${path.extname(tmpFilePath)}`
    const copyPath = await f.copyTo(finalName, File.avatarFolder, true)
    if (!copyPath) {
      return res.status(400).json(
        { error: 'Failed to copy file' }
      )
    }
    data.avatar = finalName
  }
  
  const updatedUser = await updateUser(id, data);
  if (!updatedUser) {
    return res.status(400).json(
      { error: 'Failed to update user' }
    )
  }
  const avatarUsedBy = await getCountAvatar(user.avatar)
  if (avatarUsedBy === 0) {
    const oldAvatarPath = File.getStorageFilePath(File.avatarFolder, user.avatar)
    const f = new File(oldAvatarPath)
    f.delete()
  }

  const token = createJwtToken(updatedUser)
  res.cookie("jwt", token, { httpOnly: true, secure: true });
  return res.status(200).json({avatar: updatedUser.avatar});
}

export async function deleteUserProfile(req: Request, res: Response) {
  const user = res.locals.user as User
  const id = user.id
  
  try {
    const userDeleted = await deleteUser(id)
    if (!userDeleted) {
      return res.status(400).json(
        { error: 'Failed to delete user' }
      )
    }
    const avatarUsedBy = await getCountAvatar(user.avatar)
    if (avatarUsedBy === 0) {
      const oldAvatarPath = File.getStorageFilePath(File.avatarFolder, user.avatar)
      const f = new File(oldAvatarPath)
      f.delete()
    }
  } catch (error) {
    console.error("deleteUserProfile error", error)
    return res.status(400).json(
      { error: 'Failed to delete user' }
    )
  }
  res.clearCookie("jwt");
  return res.sendStatus(200);
}

interface CreateUserListBody {
  listName: string
  gameId?: number,
  backgroundColor?: string,
  icon?: string
}

export async function createUserList(req: Request, res: Response) {

  const user = res.locals.user as User
  const id = user.id

  const { listName, gameId, backgroundColor, icon } = req.body as CreateUserListBody;

  if (!listName) {
    return res.status(400).json(
      { error: 'Missing parameters' }
    )
  }
  console.log("createUserList", id, listName, gameId)
  const gameList = await createUserListInDb(id, listName, gameId, backgroundColor, icon)
  if (!gameList) {
    return res.status(400).json(
      { error: 'Failed to create list' }
    )
  }
  if (gameList.error) {
    return res.status(400).json(
      { error: gameList.error }
    )
  }
  return res.sendStatus(200);
}


export async function deleteUserList(req: Request, res: Response)  {
  const user = res.locals.user as User
  const id = user.id
  const listName = req.params.ListName
  if (!listName) {
    return res.status(400).json(
      { error: 'Missing parameters' }
    )
  }


  const deletedList = await deleteUserListInDb(id, listName)
  if (!deletedList) {
    return res.status(400).json(
      { error: 'Failed to delete list' }
    )
  }
  return res.sendStatus(200);
}

interface UpdateUserListBody {
  newListName?: string,
  gameId?: number,
  backgroundColor?: string,
  icon?: string,
  add: boolean
}

export async function updateUserList(req: Request, res: Response) {
  const user = res.locals.user as User
  const id = user.id
  const listName = req.params.listName
  const { gameId, backgroundColor, icon, add, newListName } = req.body as UpdateUserListBody
  console.log("updateUserList", id, listName, newListName, gameId, backgroundColor, icon, add)
  if (add === undefined && !gameId && !backgroundColor && !icon && newListName && !listName) {
    return res.status(400).json(
      { error: 'Missing parameters' }
    )
  }
  const updatedUserList = await  updateUserListInDb(id, listName, add,  gameId, newListName, backgroundColor, icon)
  if (!updatedUserList) {
    return res.status(400).json(
      { error: 'Failed to update list' }
    )
  }
  if (updatedUserList.error) {
    return res.status(400).json(
      { error: updatedUserList.error }
    )
  }
  return res.sendStatus(200);
}

export async function getUserLists(req: Request, res: Response) {
  const user = res.locals.user as User
  const id = user.id
  const lists = await getUserListsInDb(id)
  if (!lists) {
    return res.status(400).json(
      { error: 'Failed to get lists' }
    )
  }
  return res.status(200).json(lists)
}
