import { Request, Response } from "express";
import { getGamesInDb, getOneGameInDb } from "../database/clients/games.client";


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
