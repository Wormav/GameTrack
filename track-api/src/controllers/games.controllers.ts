import { Request, Response } from "express";
import {  createUserGames, deleteUserGames, getGamesInDb, getOneGameInDb, getUserGames } from "../database/clients/games.client";
import { User } from "@prisma/client";


export async function getGames(req: Request, res: Response) {
  const gameName  = req.query.gameName
  const offset = req.query.offset
  if (!gameName || !offset) return res.status(400).json(
    { error: 'Missing parameters' }
  )
  const result = await getGamesInDb(gameName as string, parseInt(offset as string))
  if(!result) return res.status(400).json()

  return res.status(200).json(result)
}

export async function getOneGame(req: Request, res: Response){
  const id: number = parseInt(req.params.id)
  const result = await getOneGameInDb(id)
  if(!result) return res.status(400).json()

  return res.status(200).json(result)
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
