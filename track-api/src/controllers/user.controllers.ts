import { User } from "@prisma/client"
import { Request, Response } from "express"
import { getOneGameInDb } from "../database/clients/games.client"
import { getTimeComplete } from "../queries/howlongtobeat"
import { createUserGames, deleteUserGames, gamesTimeInterface, getUserGames, updateCompletionTime } from "../database/clients/userGames.client"

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
  console.log(time, done)
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

