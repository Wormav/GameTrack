import { User } from "@prisma/client"
import { Request, Response } from "express"
import { getOneGameInDb } from "../database/clients/games.client"
import { getTimeComplete } from "../queries/howlongtobeat"
import { createUserGames, deleteUserGames, gamesTimeInterface, getUserGames, updateCompletionTime } from "../database/clients/userGames.client"
import File from "../utils/file"
import { getCountAvatar, getUserWithId, updateUser } from "../database/clients/users.client"
import path from "path"
import mime from "mime";

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
      // handle error when game not found in howlongtobeat
      return res.status(444).json()
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

export async function updateUserAvatar(req: Request, res: Response) {
  const user = res.locals.user as User
  if (!req.file) {
    return res.status(400).json(
      { error: 'Missing parameters' }
    )
  }
  const tmpFilePath = req.file.path
  const f = new File(tmpFilePath)
  let finalName = await f.getFileNameFromData()
  if (!finalName) {
    return res.status(400).json(
      { error: 'Failed to get file' }
    )
  }
  finalName = `${finalName}${path.extname(tmpFilePath)}`
  const copyPath = await f.copyTo(finalName, File.avatarFolder)
  if (!copyPath) {
    return res.status(400).json(
      { error: 'Failed to copy file' }
    )
  }
  const updatedUser = await updateUser(user.id, { avatar: finalName });
  if (!updatedUser) {
    return res.status(400).json(
      { error: 'Failed to update user' }
    )
  }
  const avatarUsedBy = await getCountAvatar(finalName)
  if (avatarUsedBy === 0) {
    f.delete();
  }

  return res.sendStatus(200)
}

export async function getUserAvatar(req: Request, res: Response) {
  const user = res.locals.user as User
  const userId = user.id
  const fullUser = await getUserWithId(userId)
  if (!fullUser) {
    return res.status(400).json(
      { error: 'Failed to get user' }
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
  res.setHeader('Content-Type', contentType)
  res.setHeader('Content-Disposition', 'inline')
  fileStream.pipe(res)
}
